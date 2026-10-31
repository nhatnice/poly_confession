# Poly Confession (Lavenes Confession)

> An interactive, anonymous confession and greeting card platform designed for student communities, featuring confession feeds, custom greeting card builders, emotional reactions, dark mode support, and community marketplace modules.
>
> 🗓️ **Timeline**: Originally released in **2019** • Security audited & modernized in **2026**.

![Poly Confession Demo](./demo.png)

---

## 🌟 Key Features

- **Anonymous Confession Feed**: Students can submit and view confessions anonymously with custom background cards or attached media.
- **Interactive Greeting & "Lì Xì" Cards**: Seasonal greeting card builder (e.g., Teachers' Day greetings, Lunar New Year lucky money / "Lì Xì" cards) with customizable templates.
- **Rich Reactions & Comments**: Built-in multi-emotion reactions (Like, Love, Sad, Angry, Funny) and nested comment threads.
- **Dark Mode Support**: Seamless toggle between light and dark visual themes with local preference caching and system media preference detection.
- **Responsive Layout**: Designed for mobile, tablet, and desktop viewports with responsive navigation and modal image viewers.
- **Ultra-Fast Code Quality**: Configured with **Oxlint** and **Oxfmt** for instant linting and formatting.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Sass/SCSS, Materialize UI styles, custom CSS motion effects
- **State & Data Fetching**: Axios, React Hooks
- **Icons & UI Utilities**: `@react-icons/all-files`, `react-icons`, `react-toastify`, `autosize`
- **Build System**: `react-app-rewired` with `react-scripts`

### Backend

- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Database & ODM**: MongoDB via Mongoose
- **Real-time Engine**: Socket.IO
- **File Uploads**: Multer
- **Template Engine**: EJS

### Tooling

- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (Rust-powered JS/JSX linter)
- **Formatter**: [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (Rust-powered code formatter)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18 or higher (tested up to v26 with legacy crypto flag)
- **npm** or **pnpm**
- **MongoDB**: Local or Atlas instance (for the Express server)

### 1. Installation

Clone the repository and install frontend dependencies:

```bash
git clone git@github.com:nhatnice/poly_confession.git
cd poly_confession

# Install dependencies (use legacy-peer-deps due to React 18 peer resolution)
npm install --legacy-peer-deps
```

### 2. Development (Frontend)

To run the frontend development server:

```bash
# For Node.js 17+:
export NODE_OPTIONS=--openssl-legacy-provider
export SKIP_PREFLIGHT_CHECK=true

npm start
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### 3. Production Build

To build the optimized static bundle:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
export SKIP_PREFLIGHT_CHECK=true

npm run build
```

The production output will be generated inside the `build/` folder. You can serve it locally using any static HTTP server (e.g., `npx serve -s build`).

### 4. Running with Docker (Recommended)

To build and run both Frontend, Backend, and MongoDB with a single command:

```bash
docker compose up --build
```

The application will be accessible at [http://localhost:8002](http://localhost:8002).

Or to build and run only the standalone Docker container:

```bash
# Build unified image (frontend static build + express server)
docker build -t poly-confession .

# Run container (connecting to an external MongoDB or container network)
docker run -p 8002:8002 -e MONGODB_URI="mongodb://host.docker.internal:27017/poly_confession" poly-confession
```

### 5. Running the Backend Server Locally

```bash
cd server
cp .env.example .env
npm install
npm start
```

_Note: Configure your MongoDB connection string in `.env` before starting the backend._

---

## 📋 Available Scripts

Inside the `poly_confession` directory:

| Script              | Command                   | Description                                       |
| ------------------- | ------------------------- | ------------------------------------------------- |
| `npm start`         | `react-app-rewired start` | Starts the React development server               |
| `npm run build`     | `react-app-rewired build` | Creates an optimized production build in `build/` |
| `npm run lint`      | `oxlint`                  | Runs Oxlint across the project with custom rules  |
| `npm run lint:fix`  | `oxlint --fix`            | Automatically fixes autofixable Oxlint issues     |
| `npm run fmt`       | `oxfmt`                   | Formats all code according to `.oxfmtrc.json`     |
| `npm run fmt:check` | `oxfmt --check`           | Checks formatting without modifying files         |

---

## 🔍 Code Quality & Linter Configuration

The project utilizes `.oxlintrc.json` and `.oxfmtrc.json` enforcing strict engineering rules:

- **Max Lines per File**: Strict `eslint/max-lines` capped at **300 lines** to prevent God components.
- **Max Lines per Function**: `eslint/max-lines-per-function` capped at **80 lines** to avoid monolithic functions.
- **Single Class per File**: `eslint/max-classes-per-file` restricted to **1** class.
- **Functional Components Preferred**: `react/prefer-function-component` enforced as `error` to deprecate legacy class components.
- **Static Class Prevention**: `unicorn/no-static-only-class` enforced as `error` (classes with only static methods should be plain objects/modules).

---

## 📂 Project Structure

```text
poly_confession/
├── .oxfmtrc.json            # Oxfmt formatting rules
├── .oxlintrc.json           # Oxlint rules (max-lines, function components, etc.)
├── config-overrides.js      # CRA Webpack overrides (module aliases)
├── demo.png                 # Application UI screenshot
├── package.json             # Frontend dependencies & npm scripts
├── public/                  # Static assets, splash screens, favicon
├── server/                  # Backend Express server & MongoDB schemas
│   ├── index.js             # Express API endpoints & socket handlers
│   └── modules/             # Mongoose database models
└── src/
    ├── App.js               # Root application router & theme initialization
    ├── api/                 # API client wrapper
    ├── components/          # Reusable UI components
    │   ├── Forms/           # Confession and greeting card forms
    │   ├── Header/          # Application headers & banners
    │   ├── Navigation_Bar/  # Top navigation & theme toggler
    │   └── Posts/           # Confession cards, reaction box, modal
    ├── functions/           # Utility functions & API helpers
    ├── orios/               # Internal backend SDK / helper modules
    ├── styles/              # SCSS style sheets and design assets
    └── views/               # Route views (Feed, Home, Market, Lixi)
```

---

## 🔒 Security Audit & Hardening (Audited in 2026)

> [!NOTE]
> This project was originally released in **2019** and underwent a security and codebase audit in **2026**.

During the security inspection of the legacy 2019 codebase, several critical items were flagged and remediated:

1. ✅ **Committed SSL Private Keys Removed**: Deleted unencrypted private keys and certificate files (`privkey.pem`, `server.pem`) from `cert.hungvuongconfess.tk/` and `server/cert.hungvuongconfess.tk/`. Updated `.gitignore` to prevent any `.pem`, `.key`, or `.crt` files from being committed.
2. ✅ **Hardcoded Database Credentials Removed**: Migrated MongoDB connection strings in `server/index.js` to environment variables (`process.env.MONGODB_URI` / `process.env.MONGO_URI`) with `.env.example` templates.
3. ✅ **Internal Server Paths Cleared**: Removed hardcoded absolute paths (`/etc/letsencrypt/...` and local disk paths) from server code and workspace configurations.
4. ✅ **Containerization & Production Deployment**: Added multi-stage `Dockerfile` and `docker-compose.yml` that builds the React frontend and serves both API and static assets from Express behind HTTP with optional TLS injection.
5. ⚠️ **Database Backup User PII Notice**: `server/backup/backup_confession.json` contains legacy confession submissions with client IP addresses and User-Agent fingerprints. Ensure backups are excluded via `.gitignore` and kept in secure off-site storage.
6. ⚠️ **Third-Party Client IP Tracking**: `src/functions/API.jsx` previously queried Cloudflare's `/cdn-cgi/trace` on client machines. Client IP resolution should be handled strictly server-side if required, or omitted for user anonymity.
7. ⚠️ **Admin Deletion Route**: `server/index.js` deletion endpoint (`/laven_api/v1/delete_confess/nhatsdevil/:id`) should be upgraded with JWT or session authentication prior to open public deployment.
