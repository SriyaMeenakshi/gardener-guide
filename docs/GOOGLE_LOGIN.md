# Turn on "Continue with Google"

The code is already in the app. It stays hidden until you give the server a **Google Client ID**. Takes about 10 minutes.

**Good to know:** a Client ID is a *public* identifier (it is visible in your website's network traffic), so unlike passwords it is safe to share or paste in a chat. You do **not** need a "client secret" for this sign-in method.

## 1. Create the Client ID
1. Open <https://console.cloud.google.com> and sign in with the Google account you want to own this.
2. Top bar > project picker > **New project**. Name it `gardener-guide` > **Create**, then make sure it is selected.
3. Open the menu > **APIs & Services** (or **Google Auth Platform**) > set up the **consent screen**:
   - App name: `Gardener Guide`. Support email and developer contact: your email.
   - Audience / user type: **External**.
   - The default scopes (`openid`, `email`, `profile`) are all you need. Don't add others.
4. **Credentials** > **Create credentials** > **OAuth client ID**:
   - Application type: **Web application**. Name: `Gardener Guide web`.
   - **Authorized JavaScript origins** > **Add URI**, once per address that will show the login page:
     - `http://localhost:5173`
     - `https://gardener-guide-2hqt.vercel.app`  *(and any other address you serve the site from)*
   - Leave **Authorized redirect URIs** empty: this sign-in method does not use them.
   - **Create**.
5. Copy the **Client ID**. It looks like `1234567890-abcdefg.apps.googleusercontent.com`.

Each origin must match exactly: `https://`, no trailing slash, no path. Changes can take a few minutes to apply.

### Who can sign in?
In **Testing** status, only Google accounts you add under **Audience > Test users** can sign in (up to 100). For a demo with other people, click **Publish app** to move it to **In production**. With only the basic `openid/email/profile` scopes Google normally doesn't require a review, but the console will tell you if anything is needed.

## 2. Give it to the server
**Locally:** in `server/.env` set

```
GOOGLE_CLIENT_ID=1234567890-abcdefg.apps.googleusercontent.com
```

and restart the server. **Deployed:** Render > your service > **Environment** > add `GOOGLE_CLIENT_ID` with the same value > save (Render redeploys).

No change to the website's settings is needed: it asks the server whether Google sign-in is available (`GET /api/auth/providers`), so the button appears by itself.

## 3. Try it
Open `/login` or `/register`. You should see an "or" divider and Google's **Continue with Google** button. Signing in creates your account on first use and logs you straight back in afterwards.

## If something goes wrong
| What you see | Likely cause |
|---|---|
| No Google button | `GOOGLE_CLIENT_ID` isn't set on the server (open `/api/auth/providers`: it should show your client id, not `null`), or an ad blocker is blocking Google's script |
| "Error 400: origin_mismatch" | The address in your browser isn't listed under Authorized JavaScript origins (check `https`, port and trailing slash) |
| "Access blocked: this app has not completed verification" / "not authorized" | The app is in Testing and your account isn't a test user: add it, or publish the app |
| "An account with this email already exists. Please log in with your email and password." | That email already has a password account. This is deliberate, see below |
| "Google sign-in failed" | The sign-in expired or was tampered with; try again. If it persists, the server's `GOOGLE_CLIENT_ID` doesn't match the one in the browser |

## How it works (and why it is safe)
1. Google shows its own sign-in popup. Your app never sees a Google password.
2. Google gives the browser a **signed ID token**. The browser sends it to `POST /api/auth/google`.
3. The server checks the token itself with Google's official library: the **signature** (against Google's public keys), that it was **issued for this app**, that it hasn't **expired**, and that the email is **verified**. Nothing the browser claims is trusted without that check.
4. The server finds the account by Google's permanent user id (or creates it), and returns the same login token the password sign-in returns.

**Why an existing password account is not merged automatically:** this app doesn't verify email addresses when you register with a password. If Google sign-in silently merged by email, anyone could register someone else's email first and later share that person's account. So the server refuses and asks the person to log in with their password. (A future "connect Google" button inside a logged-in account would be the safe way to link both.)

Google-only accounts have no password; password login for them just fails with the usual generic error.
