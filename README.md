# Violin Repertoire & Studies Reference

A comprehensive searchable reference app for violin repertoire, études, technical exercises, treatises, and pedagogical resources. 161 entries covering the complete violin pedagogical canon.

## Features

- **Full-text search** with accent-insensitive matching (finds Ševčík when you type "sevcik")
- **Category filters**: Beginner Methods, Traditional Schools, Technical Exercises, Études, Treatises, Online Resources, Repertoire, Concerti, Chamber Music, Orchestral Excerpts, Showpieces
- **Difficulty range slider** (1–10 scale)
- **Sort** by category, composer, or difficulty
- **Expandable editions** with IMSLP links for free public-domain scores
- **Collapsible header** for maximum reading space

## Quick Start (Web)

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build Android APK

### Option A: GitHub Actions (Recommended)

1. Push this repository to GitHub
2. **Important**: Run `npm install` locally first and commit the generated `package-lock.json`
3. The workflow at `.github/workflows/build-apk.yml` runs automatically on push to `main`
4. Download the APK from the workflow's **Artifacts** section
5. To create a release with APKs attached, push a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

### Option B: Local Build

```bash
# Prerequisites: Node.js 20+, JDK 17, Android SDK

npm install
npm run build

# First time only — scaffolds the android/ directory
npx cap init "Violin Reference" com.violin.reference --web-dir dist
npx cap add android

# Sync web build into the native project
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug

# APK location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Signing a Release APK

The GitHub Actions workflow produces an **unsigned** release APK. To install on a device or publish to the Play Store, you need to sign it:

```bash
# Generate a keystore (one time)
keytool -genkey -v -keystore violin-release.keystore \
  -alias violin -keyalg RSA -keysize 2048 -validity 10000

# Sign the APK
apksigner sign --ks violin-release.keystore \
  --out app-release-signed.apk \
  android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## Project Structure

```
violin-app/
├── .github/workflows/
│   └── build-apk.yml        # GitHub Actions CI/CD
├── src/
│   ├── App.jsx               # Main app (all 161 entries + UI)
│   └── main.jsx              # React entry point
├── public/                    # Static assets
├── index.html                 # HTML shell
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite bundler config
├── capacitor.config.ts        # Capacitor (native wrapper) config
└── README.md
```

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Capacitor 6** — Native wrapper for Android
- **GitHub Actions** — CI/CD for APK builds

## Content

161 entries across 12 categories:

| Category | Count | Description |
|----------|-------|-------------|
| Technical Exercises | 32 | Flesch, Ševčík, Dounis, Fischer, Schradieck, etc. |
| Études & Caprices | 27 | Kreutzer through Paganini and beyond |
| Treatises | 19 | Geminiani to Simon Fischer |
| Traditional Schools | 13 | Baillot, Spohr, Bériot, Alard, etc. |
| Solo Repertoire | 13 | Bach S&P through Enescu |
| Concerti | 12 | Bach through Shostakovich |
| Beginner Methods | 11 | Suzuki, Doflein, Sassmannshaus, etc. |
| Repertoire Collections | 10 | Solos for Young Violinists, Probespiel, etc. |
| Online Resources | 9 | Tonebase, IMSLP, masterclass videos |
| Showpieces | 5 | Sarasate, Ravel, Kreisler, etc. |
| Orchestral Excerpts | 5 | Don Juan, Heldenleben, etc. |
| Chamber Music | 5 | Bartók Duos through Ravel Trio |

## License

Content is reference/educational material. Code is MIT.
