<div align="center">

#  Gardener Guide 📗

### Discover • Learn • Grow

*A full-stack gardening companion for home gardeners and nature enthusiasts: plant guides, a personal garden tracker, and a plant-health checker.*

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### 🌐 Live

**Website:** https://gardener-guide-2hqt.vercel.app/  ·  **API:** https://gardener-guide-api.onrender.com/api/health

*The API runs on a free tier that sleeps when idle: the first request after a quiet spell can take up to a minute.*

</div>

---

# 🌱 About the Project

**Gardener Guide** started as a static website I built over a summer holiday (version 1, Next.js). **Version 2** turns it into a full **MERN-stack application**: the content now lives in a database behind a REST API, visitors can create accounts and keep their own garden, and a plant-health checker looks at a leaf photo and suggests what might be wrong.

Whether you're growing a single Tulasi plant on your balcony or a whole home garden, it brings plant guides, care tips, DIY projects and gardening methods together in one place.

> Version 1 is preserved in this repository under the git tag [`v1-final`](https://github.com/SriyaMeenakshi/gardener-guide/tree/v1-final).

---

# ✨ Features

### 🌸 Plant guides
24 plants across indoor, flowering, medicinal, kitchen-garden and fruit categories. **Search** by name and **filter** by sunlight, water need and difficulty. Each plant has varieties, care requirements, common problems with fixes, and a tutorial video.

### 💧 Care guides · 🛠 DIY projects · 🌱 Gardening methods
Six care guides (watering, sunlight, soil, fertilizer, pruning, pest control), six DIY projects and six gardening methods, all served from the database through three reusable page templates.

### 🪴 My Garden *(login required)*
Save plants to your own garden, give them nicknames, set how often each needs water, and mark them watered. Plants are ordered by what needs water first, with clear "Water today / Overdue by 2 days" badges.

### 🩺 Plant Doctor *(login required)*
Upload a photo of a leaf and get a suggestion with symptoms, what to do and how to prevent it. It runs on **a model I trained myself** (see below), inside the server: no paid API, and the photo is analysed and then discarded. It is honest about its limits: it only knows 14 crops, says "not sure" when it isn't confident, and says so on the page.

### 🔐 Accounts
Register with email and password or **continue with Google**, and stay signed in across visits. Your garden and your check history are private to you. (Google sign-in appears once a Google Client ID is configured: see [docs/GOOGLE_LOGIN.md](docs/GOOGLE_LOGIN.md).)

---

# 🧠 The disease model

| | |
|---|---|
| Data | [PlantVillage](https://github.com/spMohanty/PlantVillage-Dataset): 54,305 leaf photos, 38 classes, 14 crops |
| Model | MobileNetV2 (frozen, ImageNet-pretrained) + a trained classifier head; 11 MB, runs in Node with ONNX Runtime |
| Result | **98.3 % accuracy** on 9,846 held-out photos (macro-F1 0.979), no leaf shared with training |
| Honest caveat | PlantVillage photos are lab shots. Real garden photos will score lower, and of this site's own plants only tomato is covered |

I found that even the dataset's official train/test split shares some leaves, and removed those images from the test set. Full method, per-class results, the confidence trade-off, the unsupported-plant probe and every limitation are in **[ml/README.md](ml/README.md)**.

---

# 🏗 Architecture

```
 Browser (React + Vite + Tailwind)            Vercel
        │   HTTPS / JSON (JWT in Authorization header)
        ▼
 Express REST API  ──►  MongoDB Atlas (Mongoose)         Render
   ├─ auth · garden · diagnose · content routes
   ├─ validation (zod) · rate limits · helmet · CORS
   └─ Plant Doctor ──► sharp (resize) ──► ONNX Runtime ──► MobileNetV2 + head
                              └─ advice comes from the Disease knowledge base in MongoDB
```

```text
gardener-guide
├── client/                React app (Vite, React Router, Tailwind)
│   └── src/ pages · components · context (auth) · api · lib
├── server/                Express API
│   ├── src/ models · controllers · routes · middleware · services/detector · seed
│   ├── models/            the exported ONNX model + labels
│   ├── scripts/           db:check, image optimiser, resize tuning
│   └── test/              58 automated tests
├── ml/                    reproducible training pipeline for the disease model
├── docs/                  Atlas + deployment guides, technical plan
└── render.yaml            Render blueprint for the API
```

## API overview

| Area | Endpoints |
|---|---|
| Content (public) | `GET /api/plants` (search, filters, pagination) · `/plants/:slug` · `/care` · `/care/:slug` · `/methods` · `/methods/:slug` · `/diy` |
| Auth | `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/google` · `GET /api/auth/providers` · `GET /api/auth/me` |
| My Garden 🔒 | `GET/POST /api/garden` · `PUT/DELETE /api/garden/:id` · `POST /api/garden/:id/water` |
| Plant Doctor 🔒 | `POST /api/diagnose` (multipart photo) · `GET /api/diagnose/history` · `GET /api/diagnose/info` · `DELETE /api/diagnose/:id` |

🔒 = needs a login. Every garden and history query is scoped to the signed-in user.

## Security highlights
- Passwords hashed with **bcrypt** (12 rounds); login errors never reveal whether an email exists.
- **Google sign-in** verifies Google's signed token on the server (signature, audience, expiry, verified email) and never auto-merges with an existing password account.
- **JWT** pinned to HS256; the user's role is always read from the database, never trusted from the token.
- Input validated with **zod**; query values are type-checked to block NoSQL operator injection.
- Photo uploads are checked by their **real bytes** (JPEG/PNG/WebP only), size-capped, kept in memory and never written to disk.
- **Rate limits** on login/registration and, per user, on photo checks; proxy-aware so limits are per visitor.
- `helmet` headers, a CORS allow-list, and no secrets in the repository (`.env` is git-ignored).

---

# 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Database | MongoDB Atlas, Mongoose 9 |
| Server | Node.js 22, Express 5, zod, jsonwebtoken, bcryptjs, google-auth-library, helmet, multer |
| Client | React 19, Vite, React Router 7, Tailwind CSS 4 |
| ML | PyTorch (training), ONNX Runtime + sharp (serving) |
| Testing | Node's built-in test runner against a real in-memory MongoDB |
| Hosting | Vercel (client), Render (API), MongoDB Atlas (database) |

---

# 🚀 Getting Started

**Prerequisites:** Node 20+, and a free [MongoDB Atlas](docs/ATLAS.md) database (or any MongoDB).

```bash
git clone https://github.com/SriyaMeenakshi/gardener-guide.git
cd gardener-guide

# 1. API
cd server
npm install
cp .env.example .env          # then fill in MONGO_URI and JWT_SECRET (see docs/ATLAS.md)
npm run db:check              # confirms the database connection
npm run seed                  # loads plants, guides, methods and the disease knowledge base
npm run dev                   # http://localhost:5000

# 2. Website (new terminal)
cd client
npm install
npm run dev                   # http://localhost:5173  (proxies /api to the server)
```

Run the tests with `cd server && npm test` (the first run downloads a small MongoDB test binary).

**Deploying:** [docs/ATLAS.md](docs/ATLAS.md) (database), [docs/DEPLOY.md](docs/DEPLOY.md) (Render + Vercel) and optionally [docs/GOOGLE_LOGIN.md](docs/GOOGLE_LOGIN.md).

### Adding a plant
1. Add an entry to [`server/src/seed/plants-more.js`](server/src/seed/plants-more.js) (copy an existing one: description, varieties, three care cards, common problems; `video` is optional).
2. Add its photo as `client/public/plants/<slug>.jpg` (landscape JPEG, at least 1200 px wide). Until the file exists the site shows a leaf placeholder, and the photo appears by itself once it does.
3. Run `cd server && npm run seed` to load it, and `npm run photos:check` to see which plants still need photos.

---

# 🌱 Why I Built This

Gardening has always been a special part of my life.

Growing up surrounded by plants taught me patience, curiosity, and appreciation for nature. I wanted to create something that combines those memories with my journey as a software developer.

**Inspired by a childhood spent in the garden**, Gardener Guide was created to help beginners discover the joy of growing plants while allowing me to strengthen my skills in modern web development.

More than just a coding project, this website represents continuous learning, consistency, and my passion for building meaningful applications.

---

# 🚧 Known Limitations

- The disease model knows **14 crops** (of this site's plants, only tomato) and was trained on lab photos, so real garden photos will score lower. It can be confidently wrong about plants it has never seen. Details in [ml/README.md](ml/README.md).
- The disease advice is general guidance and should be reviewed by someone who knows plant care.
- Watering status shows when you open My Garden; there are no reminder emails yet.
- If an email already has a password account, "Continue with Google" refuses and asks you to log in with the password (a "connect Google" button inside a logged-in account would be the safe way to link both).

# 🚀 Future Improvements

- 📧 Watering reminder emails
- 🧑‍💼 Admin page to add and edit plants without touching code
- 🌿 A "not a leaf / unknown plant" class and photos of real garden plants for the model
- 🗓 Seasonal planting calendar and weather-based tips
- 🌍 More plant guides and gardening methods

---

# 📄 License

This project is licensed under the **MIT License**. The PlantVillage dataset used to train the model has its own licence (see [ml/README.md](ml/README.md)).

---

# 👩‍💻 Author

## Sriya Meenakshi Chalamalasetty

**B.Tech CSE (AI & ML)**

Passionate about

🌱 Nature • 💻 Technology • 🎨 Design • 🌍 Open Source

**GitHub**

https://github.com/SriyaMeenakshi

**LinkedIn**

https://www.linkedin.com/in/sriya-meenakshi-chalamalasetty

---

<div align="center">

## 🌿

### *"To plant a garden is to believe in tomorrow."*

**— Audrey Hepburn**

---

### 🌼 Inspired by a childhood spent in the garden.

**Built with 💚 using MongoDB, Express, React and Node.js.**

⭐ If you enjoyed this project, consider giving it a star!

</div>
