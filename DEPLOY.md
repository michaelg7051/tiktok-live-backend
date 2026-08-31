
# DEPLOY YOUR TIKTOK LIVE CLONE

## Railway (Permanent Free URL)
1. Push backend folder to GitHub
2. railway.app -> New Project -> Deploy from GitHub
3. Generate Domain in Settings
4. Copy URL like https://xxx.up.railway.app

## Render (Alternative)
1. render.com -> New Web Service
2. Build: npm install | Start: node server.js

## Instant Test - Ngrok
npm install -g ngrok
npm start (in backend folder)
ngrok http 3001 -> copy https URL

## Frontend
Deploy the HTML artifact to Vercel (drag & drop index.html)
Share frontend + backend URL to friends
