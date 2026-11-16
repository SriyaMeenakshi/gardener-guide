# Gardener Guide v2: Technical Project Plan (MERN + Plant Disease Detection)

## 1. Project summary
Gardener Guide v2 is a full-stack MERN web application. Users browse plant care knowledge, build a personal garden, get watering reminders, and upload a leaf photo to detect plant diseases and get treatment advice.

**Problem:** Home gardeners lack one place for reliable plant care info and can't easily identify why a plant is sick.
**Solution:** A searchable plant knowledge base + personal garden tracker + AI-assisted disease diagnosis.

## 2. Tech stack
| Layer | Technology | Why |
|---|---|---|
| Database | MongoDB Atlas + Mongoose | Flexible documents suit plant/care content |
| Backend | Node.js, Express | REST API, middleware |
| Frontend | React (Vite), React Router, Tailwind CSS | Reuses v1 components/styles |
| Auth | JWT (access token) + bcrypt | Stateless, standard |
| File upload | Multer -> Cloudinary | Leaf photos and plant images |
| Validation | Zod | Request validation |
| Scheduling | node-cron + Nodemailer | Watering reminders |
| Disease detection | See section 6 | Core differentiator |
| Testing | Jest + Supertest | API tests |
| Deployment | Vercel (client), Render (server), Atlas (DB) | Free tiers |

## 3. Architecture
```
React (Vite) --HTTPS/JSON--> Express API --Mongoose--> MongoDB Atlas
                                 |-- Cloudinary (images)
                                 |-- Nodemailer (reminders)
                                 '-- Disease detection service (section 6)
```
Folder structure:
```
gardener-guide/
├── client/src/{components,pages,hooks,api,context}
└── server/src/{models,routes,controllers,middleware,services,jobs,seed}
```

## 4. Database design (Mongoose models)
- **User**: name, email (unique), passwordHash, role (`user`|`admin`), createdAt
- **Plant**: name, slug (unique), category, images[], description, sunlight, water, soil, season, difficulty, careSteps[], commonProblems[{title, cause, fix}], videos[]
- **CareGuide**: title, slug, hero, sections[], commonMistakes[]
- **Method**: title, slug, description, pros[], cons[], steps[]
- **DIY**: title, materials[], steps[], image
- **MyPlant** (user's garden): user -> User, plant -> Plant, nickname, plantedOn, wateringEveryDays, lastWateredAt, notes
- **Diagnosis**: user -> User, imageUrl, predictedDisease, confidence, plantName, treatment, createdAt
- **Disease** (knowledge base): name, plantsAffected[], symptoms[], cause, treatment[], prevention[]

Index: `Plant.slug`, text index on `Plant.name/description` for search, `MyPlant.user`.

## 5. REST API
| Method | Route | Access |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | public |
| GET | `/api/auth/me` | user |
| GET | `/api/plants?category=&search=&sunlight=&difficulty=&page=` | public |
| GET | `/api/plants/:slug` | public |
| POST/PUT/DELETE | `/api/plants` (`/:id`) | admin |
| GET | `/api/care`, `/api/care/:slug` | public |
| GET | `/api/methods`, `/api/methods/:slug` | public |
| GET | `/api/diy` | public |
| GET/POST/PUT/DELETE | `/api/garden` (`/:id`) | user |
| POST | `/api/garden/:id/water` | user |
| POST | `/api/diagnose` (multipart image) | user |
| GET | `/api/diagnose/history` | user |
| GET | `/api/diseases`, `/api/diseases/:id` | public |

Middleware: `helmet`, `cors`, `express-rate-limit`, `auth` (verify JWT), `requireRole`, `validate(schema)`, central `errorHandler`.

## 6. Plant disease detection
**Flow:** user uploads a leaf photo -> client validates type/size (<=5 MB) -> `POST /api/diagnose` -> Multer receives it -> server uploads to Cloudinary -> detection service returns `{plant, disease, confidence}` -> server looks up the `Disease` collection for treatment -> saves a `Diagnosis` -> returns the result to React.

**Approach options (build A first, B as stretch):**

- **A. Hosted vision API (recommended first).** Call a plant-health API (for example Plant.id / Kindwise crop health) or a multimodal LLM from the Express server. The API key stays in `.env` on the server and is never exposed to the client. Fast to build and accurate. For the viva, be upfront that the model is third-party and that your work is the integration, validation, storage and treatment lookup.
- **B. Own model (stretch, best viva story).** Train a CNN on the PlantVillage dataset (Kaggle) with transfer learning (MobileNetV2) in Python/TensorFlow, export it, and serve it through a small FastAPI/Flask microservice that Express calls. Report accuracy and a confusion matrix. This shows real ML work, but adds deployment complexity.

Guard rails: show the confidence score, reject low-confidence results ("please retake the photo"), and always display a "not a substitute for an expert" note.

## 7. Frontend pages
Home, Plants list (search + filters), Plant detail (`/plants/:slug`), Care guides, Methods, DIY, Login/Register, My Garden (dashboard with next-watering due), Diagnose (upload + result + history), Admin (manage plants/diseases).
Reuse: `Navbar`, `Hero`, `PlantCard`, `CareCard`, `MethodCard`, `DIYCard`, `Footer`, `Quote` from v1. Replace ~24 hand-written pages with 3 dynamic templates.

## 8. Security checklist (viva favourite)
- Passwords hashed with bcrypt (salt rounds >= 10)
- JWT secret in env, short expiry, sent via `Authorization: Bearer` header
- Zod validation on every input; Mongoose schema validation
- File upload: type whitelist, size limit, server-side checks
- Rate limiting on auth and `/diagnose`
- CORS restricted to the client origin; `helmet`
- Ownership checks (a user can only edit their own garden entries)
- No secrets committed (`.env` in `.gitignore`, provide `.env.example`)

## 9. Timeline (about 6-7 weeks, adjust to your viva date)
| Week | Deliverable |
|---|---|
| 1 | Repo restructure (`client/`, `server/`), Express + Atlas connection, models, seed script from v1 content |
| 2 | Public API (plants/care/methods/diy) + tests; React app ported to Vite with dynamic pages |
| 3 | Search/filters, auth (register/login/JWT), protected routes |
| 4 | My Garden CRUD + watering reminders (cron + email) |
| 5 | Disease detection (option A), Cloudinary upload, diagnosis history, Disease KB |
| 6 | Admin panel, validation/security hardening, tests, UI polish |
| 7 | Deployment, README + API docs + screenshots, viva rehearsal. Option B (own model) if time allows |

## 10. Testing and deployment
- Jest + Supertest: auth, plants, garden ownership, diagnose validation
- Manual test checklist for the main user flows
- Deploy: Atlas (DB), Render (server, env vars), Vercel (client, `VITE_API_URL`)
- Keep v1 live until v2 is verified

## 11. Viva preparation
Be ready to explain:
1. The end-to-end flow of one request (React -> Express -> Mongo -> response)
2. Why MongoDB, and why these schema choices (embedded vs referenced)
3. How JWT auth and bcrypt work, and where the token is stored
4. How image upload and disease detection work, and the model's limits
5. What you would improve (mobile app, offline mode, more plants, multi-language)

Demo script (3-4 min): register -> browse/search plant -> add to My Garden -> mark watered -> upload diseased leaf -> view result and history -> show admin adding a plant.
