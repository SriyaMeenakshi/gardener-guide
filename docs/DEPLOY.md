# Deploy Gardener Guide (free)

Three pieces, all on free tiers:

| Piece | Where | Needs |
|---|---|---|
| Database | MongoDB Atlas | done: see [ATLAS.md](ATLAS.md) |
| API (Node + the disease model) | Render | your Atlas connection string |
| Website (React) | Vercel | the API's address |

Your current live site (v1) stays untouched: v2 gets its own new URLs. When you are happy with v2 you can point your
main domain at it.

## 0. Before you start
- Atlas > **Network Access** must include **`0.0.0.0/0`** (Allow access from anywhere). Render's free tier has no fixed IP.
- Your code is on GitHub (branch `v2`). Both Render and Vercel deploy straight from GitHub.

## 1. API on Render
1. Sign up at <https://render.com> with your GitHub account.
2. **New +** > **Blueprint** > pick the `gardener-guide` repository > choose branch **`v2`**.
   Render reads [`render.yaml`](../render.yaml): a free Node web service in Singapore, root directory `server`.
3. It will ask for two values (they're marked "sync: false" so they are never stored in git):
   - `MONGO_URI`: paste your Atlas connection string (the same one as in `server/.env`).
   - `CLIENT_ORIGIN`: type `http://localhost:5173` for now; you'll change it in step 3.
   (`JWT_SECRET` is generated for you; `DETECTOR_PROVIDER=local` is already set.)
4. **Apply**. The first build takes a few minutes (the model runtime is ~300 MB to install).
5. When it's live, open `https://<your-service>.onrender.com/api/health`. You should see `{"status":"ok"}`.
   Also try `/api/plants`: you should see your plants.

## 2. Website on Vercel
1. Sign up at <https://vercel.com> with GitHub.
2. **Add New...** > **Project** > import `gardener-guide`.
3. Set **Root Directory** to **`client`**. (Framework should auto-detect as Vite; build command `npm run build`, output `dist`.)
4. **Environment Variables:** add `VITE_API_URL` = `https://<your-service>.onrender.com/api` (no trailing slash).
5. **Deploy.** Then in the project's **Settings > Git**, set the **Production Branch** to `v2` (until you merge it to `main`).
6. Note the site address, e.g. `https://gardener-guide-xyz.vercel.app`.

## 3. Tell the API which website may call it
Render > your service > **Environment** > edit `CLIENT_ORIGIN` to the exact Vercel address
(`https://gardener-guide-xyz.vercel.app`, no trailing slash, no path). Several allowed sites can be comma-separated.
Render redeploys automatically.

## 4. Try it
Open the Vercel address: browse plants, sign up, add a plant to My Garden, and run a photo through Plant Doctor.

## Things to know about the free tiers
- **Render sleeps after ~15 minutes without traffic.** The first request afterwards takes 30-60 seconds to wake it
  (and the first photo check also loads the 11 MB model). Fine for a demo; open the site a minute before presenting.
- **Memory:** the API uses about 150 MB with the model loaded; the free tier allows 512 MB.
- **Atlas M0** has 512 MB of storage: plenty for this app.
- If sign-in or loading fails in the browser with a "CORS" message, `CLIENT_ORIGIN` doesn't match the website address exactly.
- If the website can't reach the API at all, check `VITE_API_URL` (it is baked in at build time, so changing it needs a Vercel redeploy).

## Updating later
Push to the `v2` branch: Render and Vercel redeploy automatically.
