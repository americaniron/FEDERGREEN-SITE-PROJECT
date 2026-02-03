<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1XqUzgZ_APwQo-cbHzxJvykKebZE4GRVY

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Cloudflare Pages

This app is configured to deploy to Cloudflare Workers Pages with proper SPA routing support.

### Build Configuration

The project includes:
- `public/_redirects` - Routes all requests to index.html for client-side routing
- `public/_headers` - Security headers for the deployed site
- Vite configuration that copies these files to the `dist/` folder during build

### Deployment Steps

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   - Connect your repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set build output directory: `dist`
   - Deploy!

The site will automatically handle client-side routing and apply security headers.
