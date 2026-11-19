# Connect MongoDB Atlas (free) to Gardener Guide

About 10 minutes. You will end up with a free cloud database that your local server **and** your deployed server can use.

## 1. Create the cluster
1. Go to <https://www.mongodb.com/cloud/atlas/register> and sign up (Google sign-in is fine). No payment card is needed for the free tier.
2. Choose **Create a deployment** (or "Build a Database") -> **M0 Free**.
3. **Provider:** AWS. **Region:** pick **Singapore (ap-southeast-1)** if you are in India (it is close, and it matches the free Render region we will use for the API). Name the cluster anything, e.g. `gardener`.
4. Click **Create**.

## 2. Create a database user
(Atlas > **Database Access** > **Add New Database User**, or the setup wizard shows it.)
1. Authentication: **Password**. Username: `gardener-app`.
2. Click **Autogenerate Secure Password** and **copy it somewhere safe right now** (you can't view it again).
   - Tip: if you type your own password, use only letters and digits. Symbols like `@ : / ? #` break the connection string unless URL-encoded.
3. Role: **Read and write to any database** (or "Only read and write to a specific database" -> `gardener-guide`).
4. **Add User.**

## 3. Allow network access
Atlas > **Network Access** > **Add IP Address**.
- For development: **Add Current IP Address**.
- For the deployed API: **Allow Access From Anywhere** (`0.0.0.0/0`). Free hosting like Render has no fixed IP address, so this is required. The database is still protected by the password and encrypted connections. Never reuse that password anywhere else.

## 4. Copy the connection string
Atlas > **Database** > your cluster > **Connect** > **Drivers** > **Node.js**. You'll see something like:

```
mongodb+srv://gardener-app:<db_password>@gardener.abc12.mongodb.net/?retryWrites=true&w=majority
```

Change it in two ways:
1. Replace `<db_password>` with your real password (no `< >` brackets).
2. Add the database name `gardener-guide` between `.net/` and `?`:

```
mongodb+srv://gardener-app:YOURPASSWORD@gardener.abc12.mongodb.net/gardener-guide?retryWrites=true&w=majority
```

## 5. Put it in `server/.env`
Open `server/.env` (it already exists and is git-ignored) and paste the string after `MONGO_URI=`:

```
MONGO_URI=mongodb+srv://gardener-app:YOURPASSWORD@gardener.abc12.mongodb.net/gardener-guide?retryWrites=true&w=majority
```

> **Never** paste the connection string into a chat, an issue, a screenshot, or a commit. It contains your password. `.env` is already in `.gitignore`.

## 6. Check it and load the data
From the `server/` folder:

```bash
npm run db:check    # should print: OK Connected to ... database "gardener-guide"
npm run seed        # loads plants, guides, methods, DIY projects and the disease knowledge base
```

If `db:check` fails it tells you why in plain words. The usual causes: IP not allowed (step 3), a typo in the password, or the password's special characters.

## 7. Run the app against Atlas
```bash
cd server && npm run dev      # terminal 1
cd client && npm run dev      # terminal 2  ->  http://localhost:5173
```

You can browse the collections in Atlas > **Database** > **Browse Collections**.
