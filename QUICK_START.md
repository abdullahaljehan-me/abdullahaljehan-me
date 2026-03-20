# Quick Start Guide - 10 Minutes to Live

Get your portfolio live in less than 10 minutes.

## Step 1: Get Web3Forms Key (3 minutes)

1. Go to https://web3forms.com
2. Click "Sign up"
3. Enter your email and create account
4. Copy your Access Key (it's in your dashboard)

**Update your code with this key:**

In `main.js`, find this line (around line 13):
```javascript
WEB3FORMS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY'
```
Replace with your actual key.

In `contact.html`, find this line (around line 99):
```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">
```
Replace with your actual key.

## Step 2: Update Images (2 minutes)

Replace two image files:

1. **Profile Photo**: Replace `assets/profile.jpg` with your photo
   - Recommended size: 400×400px
   - Format: JPG, PNG, or WebP

2. **Social Image**: Replace `assets/og-image.jpg`
   - Recommended size: 1200×630px
   - Format: JPG, PNG, or WebP

## Step 3: Push to GitHub (3 minutes)

1. Create a GitHub repository named: `abdullahaljehan-me.github.io`

2. In your local project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/abdullahaljehan-me.github.io.git
   git push -u origin main
   ```

3. In GitHub repo settings:
   - Go to **Settings** → **Pages**
   - Select **main** branch as source
   - Click **Save**

## Step 4: Your Site is Live! (30 seconds)

Visit: `https://abdullahaljehan-me.github.io`

## Testing (2 minutes)

- [ ] All pages load
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Mobile menu works
- [ ] Images display

## Troubleshooting

### Contact form not working?
- Did you add your Web3Forms key to BOTH files?
- Check browser console (F12) for errors

### GitHub repos not showing?
- Wait a few minutes for GitHub API to respond
- Check you have public repositories

### Images not showing?
- Did you actually replace the image files?
- Check file names are exactly `profile.jpg` and `og-image.jpg`

## Done! 🎉

Your portfolio is now live. Share your URL: `https://abdullahaljehan-me.github.io`

---

**Need more help?** See `DEPLOYMENT.md` for detailed instructions.

**Want to customize?** See `BUILD_SUMMARY.md` for all available options.
