// Checks that the server can reach the database in server/.env and explains problems in plain words.
// It never prints the connection string or password.
//
// Usage (from /server):  npm run db:check
import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI?.trim();

const fail = (title, hints) => {
  console.error(`\nX ${title}`);
  for (const h of hints) console.error(`  - ${h}`);
  process.exit(1);
};

if (!uri) fail("MONGO_URI is empty in server/.env", ["Paste your Atlas connection string after MONGO_URI= (see docs/ATLAS.md)."]);
if (!/^mongodb(\+srv)?:\/\//.test(uri)) fail("MONGO_URI doesn't look like a MongoDB connection string", ['It should start with "mongodb+srv://".']);
if (/<(password|db_password|username|user)>/.test(uri)) fail("MONGO_URI still contains a placeholder", ["Replace <db_password> with your database user's password."]);
if (/:<[^@]*>@/.test(uri)) fail("The password in MONGO_URI is wrapped in < > brackets", ["Atlas's example shows <db_password> with brackets. Remove the brackets as well as the placeholder text: ...:YOURPASSWORD@..."]);

// The database name is the path after the host list. (Multi-host "mongodb://a,b,c/db" strings are valid, but
// are not valid URLs, so match it with a pattern instead of new URL().)
const dbName = uri.match(/^mongodb(?:\+srv)?:\/\/[^/]+\/([^?]*)/)?.[1] ?? "";
if (!dbName) console.warn('! The connection string has no database name, so MongoDB would use its default one ("test").\n  Add /gardener-guide right before the "?"  e.g. ...mongodb.net/gardener-guide?retryWrites=true');

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 });
  const db = mongoose.connection.db;
  await db.admin().ping();
  const collections = await db.listCollections().toArray();
  console.log(`OK Connected to ${mongoose.connection.host}, database "${mongoose.connection.name}" (${collections.length} collections)`);
  if (collections.length) console.log("  collections:", collections.map((c) => c.name).sort().join(", "));
  await mongoose.disconnect();
} catch (err) {
  const text = `${err.name} ${err.code ?? ""} ${err.message}`;
  if (/auth|bad auth|18\b|SCRAM/i.test(text)) {
    fail("Atlas rejected the username or password", ["Check the database user in Atlas > Database Access.", "Re-type the password in MONGO_URI; special characters must be URL-encoded."]);
  } else if (/ENOTFOUND|querySrv|ECONNREFUSED.*dns/i.test(text)) {
    fail("Couldn't find the cluster address", ["Check the cluster host in MONGO_URI for typos.", "Check your internet connection."]);
  } else if (/ServerSelection|timed out|ETIMEDOUT|whitelist|not allowed/i.test(text)) {
    fail("Couldn't reach Atlas (timed out)", ["Most likely your IP address isn't allowed: Atlas > Network Access > Add IP Address > Add Current IP Address.", "On some networks (college Wi-Fi) port 27017 is blocked; try a phone hotspot to confirm."]);
  } else {
    fail("Couldn't connect", [err.message.split("\n")[0].slice(0, 200)]);
  }
}
