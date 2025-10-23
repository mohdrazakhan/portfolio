# Portfolio – Raza

A fast, modern, and responsive developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=061A23)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

>Project Link: www.mohdrazakhan.me
---

## Features
- Responsive, accessible UI with Tailwind CSS
- Smooth animations using Framer Motion
- Dark/Light theme toggle
- Projects, Skills, About, and Contact sections
- Clean, component-driven structure
- Blog with owner-only editor (Firebase Auth)
- Posts persisted in Firebase Firestore with draft/publish states

## Tech Stack
- React 19 + Vite 7
- Tailwind CSS 3
- Framer Motion 12
- Lucide Icons
- Firebase Auth (email/password)
- Firebase Firestore

## Quick Start

Prerequisites: Node.js 18+ and npm.

```bash
# 1) Clone the repository
git clone https://github.com/mohdrazakhan/portfolio.git
cd portfolio

# 2) Install dependencies
npm install

# 3) Start the dev server
npm run dev

# 4) Build for production
npm run build

# 5) Preview the production build (optional)
npm run preview
```

## Project Structure

```
├─ public/
│  ├─ favicon.ico
│  ├─ resume.pdf
│  └─ images/
├─ src/
│  ├─ assets/
│  │  ├─ icons/
│  │  └─ images/
│  ├─ components/
│  │  ├─ UI/
│  │  └─ ...section components
│  ├─ data/
│  │  ├─ config.js
│  │  ├─ projects.js
│  │  ├─ skills.js
│  │  └─ socials.js
│  ├─ hooks/
│  │  └─ useTheme.js
│  ├─ pages/
│  ├─ styles/
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ postcss.config.js
└─ vite.config.js
```

## Configuration
- Edit profile info, links, and content in:
  - `src/data/config.js`
  - `src/data/socials.js`
  - `src/data/skills.js`
  - `src/data/projects.js`
- Replace images in `src/assets/images/` and icons in `src/assets/icons/`.

Example project entry can be found in `src/data/projects.js`.

## Deployment

### GitHub Pages (static hosting)
Two easy options:

1) With GitHub Actions (recommended)
- Push to `main` on GitHub.
- In repo Settings → Pages, set Source: “Deploy from a branch” or use an Actions workflow for Vite.
- A typical Actions flow builds and publishes the `dist/` folder to `gh-pages`.

2) Manual publish to `gh-pages` branch
- Build locally, then publish the `dist/` directory to a `gh-pages` branch using your preferred tool.

Alternatively, deploy to Netlify or Vercel — both work great with Vite projects.

For SPA deep-links (e.g., `/projects/optirider` or `/blog/:id`) make sure rewrites are enabled:

- Vercel: see `vercel.json` in the repo.
- Netlify: see `public/_redirects` with `/*   /index.html   200`.

## Blog + Admin (Firebase)

The blog editor is visible only when you are logged in (email/password) via Firebase Auth. Posts are stored in Firestore and support draft/publish.

### 1) Environment variables
Create a `.env` file in the project root and add your Firebase credentials:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart the dev server after changing `.env`.

### 2) Firebase setup

- Enable Authentication → Sign-in method → Email/Password.
- Create your admin user in Firebase Authentication Users.
- Create a Firestore database in production mode.
- Enable Firebase Storage for project image uploads.

Recommended Firestore security rules (adjust as needed):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if resource.data.published == true;
      allow read, write: if request.auth != null; // owner-only in UI
    }
  }
}
```

Recommended Storage security rules:

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
    match /blog/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

With these rules, public visitors can read only published posts. Authenticated you (admin) can create, update, delete posts and see drafts.

### 3) Admin Panel Features

- **Projects Manager**: Add, edit, delete projects with:
  - Firebase Storage image upload (drag-and-drop or paste URL)
  - Live image preview
  - Team/contributor support
  - Tech stack tags
  - Project status (Completed, In Progress, Planning)
  - Featured project toggle
  - Live demo and repo links
  - Automatic statistics dashboard

- **Blog Manager**: Full-featured rich text editor with draft/publish states
- **Activities Manager**: Recent updates and timeline

### 4) One-time migration from localStorage

If you previously created posts locally (older version), the app will import them into Firestore automatically the first time an authenticated admin opens the Blog page (if Firestore is empty). A local flag prevents duplicate imports.

## Screenshots

<img alt="Portfolio preview 1" src="/public/images/preview/1.png" width="640" />
<img alt="Portfolio preview 2" src="/public/images/preview/2.png" width="640" />
<img alt="Portfolio preview 3" src="/public/images/preview/3.png" width="640" />
<img alt="Portfolio preview 4" src="/public/images/preview/4.png" width="640" />
<img alt="Portfolio preview 5" src="/public/images/preview/5.png" width="640" />


## License
This project is licensed under the ISC license.

---

Made with ❤️ using React, Vite, Tailwind CSS, and Framer Motion.
❤️ Mohd Raza Khan ❤️
