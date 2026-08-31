
# TikTok Live Clone - COMPLETE DEPLOY WALKTHROUGH

You said yes, so let's get you a public URL like a real TikTok live.

## What you'll have at the end:
- Frontend: https://your-name-tiktok-live.vercel.app (anyone can open)
- Backend: https://your-backend.up.railway.app (handles real-time chat/gifts)
- Share link: https://your-name-tiktok-live.vercel.app?backend=https://your-backend.up.railway.app
  -> Anyone who opens this JOINs your live instantly.

---

### PART 1: Backend (2 minutes)

**1. Download these 4 files I made for you:**
   - server.js
   - package.json
   - Dockerfile
   - railway.json

   Put them in a folder called `tiktok-live-backend` on your Desktop.

**2. Create GitHub repo:**
   - Go to https://github.com/new
   - Repository name: `tiktok-live-backend`
   - Public
   - DON'T check "Add README"
   - Click Create repository

**3. Push (Open Terminal / Command Prompt):**
   ```bash
   cd Desktop/tiktok-live-backend
   git init
   git add .
   git commit -m "tiktok live backend"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/tiktok-live-backend.git
   git push -u origin main
   ```
   Replace YOUR_GITHUB_USERNAME with your actual username.

**4. Deploy to Railway (free):**
   - Go to https://railway.app
   - Sign in with GitHub
   - Click "New Project" -> "Deploy from GitHub repo"
   - Select `tiktok-live-backend`
   - Railway will detect Node.js and deploy (takes ~30 sec, you'll see logs)
   - Click the deployed service box
   - Go to Settings tab -> Domains section -> Click "Generate Domain"
   - COPY that URL. Example: `https://tiktok-live-backend-production-a1b2.up.railway.app`

   THAT IS YOUR PUBLIC BACKEND URL. Save it.

   Test it: Open that URL in browser, you should see:
   {"status":"TikTok Live Clone Backend Running"...}

---

### PART 2: Frontend (1 minute)

**1. Download the final clone HTML:**
   The preview you have: right-click -> Save As -> `index.html`

**2. Deploy to Vercel:**
   - Go to https://vercel.com -> Sign in with GitHub
   - Click "Add New..." -> "Project" -> Click "Browse" (or drag & drop folder)
   - Create a folder `tiktok-live-frontend` with that `index.html` inside
   - Drag that folder onto Vercel
   - Deploy
   - You get: `https://tiktok-live-frontend-xyz.vercel.app`

**Alternative even faster: No GitHub needed**
   - Go to https://app.netlify.com/drop
   - Drag your `index.html` file onto the page
   - Instant public URL

---

### PART 3: GO LIVE (30 seconds)

**1. Create your magic link:**
   Take your frontend URL + ?backend= + your backend URL

   Example:
   ```
   https://your-tiktok-live.vercel.app?backend=https://tiktok-live-backend-production-a1b2.up.railway.app
   ```

**2. Open it:**
   - Open that full link on your laptop/phone
   - It auto-connects to real-time backend (no gear menu needed!)
   - Tap camera icon top-right -> Allow camera/mic
   - You are LIVE

**3. Invite friends:**
   - Tap Share button in app (bottom bar)
   - It copies the magic link
   - Send via WhatsApp / Instagram / text
   - They open it -> they see YOUR camera live -> they can chat, send gifts, spam hearts
   - You hear TTS: "Mike sent Universe!"

---

### Troubleshooting

- Railway deploy fails? Check logs -> usually missing package.json. Make sure all 4 files are pushed.
- Camera not working? Must use HTTPS (Railway + Vercel are HTTPS, so it works. Localhost won't work on phone without HTTPS, that's why we deploy).
- Friends can't connect? Make sure they use the FULL link with ?backend=...

### Costs
- Railway free tier: 500 hours/month (enough for 24/7 live for 20 days, then sleeps - just redeploy)
- Vercel/Netlify: Free forever for this
- Total: $0

### Next upgrades I can build for you:
- Save recordings of lives
- Gift monetization with Stripe
- User accounts / login
- Filters like TikTok (face filters)

Tell me when you've got your Railway URL and I'll test it with you!
