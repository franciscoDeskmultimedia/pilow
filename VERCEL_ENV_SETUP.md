# Vercel Environment Variables Setup

## ⚠️ Critical Configuration for Live Preview & Publishing

To fix the **403 Forbidden** errors and enable **Live Preview** on Vercel, you need to configure the following environment variables in your Vercel dashboard.

---

## 🔧 Required Environment Variables

Go to your Vercel project → **Settings** → **Environment Variables** and add:

### 1. **NEXT_PUBLIC_SERVER_URL** (Production, Preview, Development)

```
https://pilow.vercel.app
```

- **Type:** Plain Text
- **Environments:** Production, Preview, Development
- **Purpose:** Tells Payload CMS which domain to allow for CORS/CSRF

### 2. **NEXT_PUBLIC_APP_URL** (Production, Preview, Development)

```
https://pilow.vercel.app
```

- **Type:** Plain Text
- **Environments:** Production, Preview, Development
- **Purpose:** Used by frontend components for API calls

### 3. **NEXT_PUBLIC_DRAFT_SECRET** (Production, Preview, Development)

```
pilow-draft-secret
```

- **Type:** Plain Text (or use a more secure value)
- **Environments:** Production, Preview, Development
- **Purpose:** Required for Draft/Live Preview mode

### 4. **PAYLOAD_SECRET** (Already set via Vercel CLI)

```
pilow-secure-secret-key-change-me-in-production
```

- **Type:** Sensitive
- **Environments:** Production, Preview, Development
- **Purpose:** Encrypts Payload CMS sessions and JWT tokens
- **⚠️ Change this to a strong random value in production!**

### 5. **Database Variables** (Already set)

These should already be configured from your Neon integration:

- `POSTGRES_URL`
- `DATABASE_URL`
- All other Postgres-related variables

---

## 🚫 DO NOT Set These Variables

### ❌ VERCEL_OIDC_TOKEN

- **Never manually set this!**
- Vercel automatically provides this during builds
- It's an ephemeral token that changes with each deployment
- Setting it manually will cause authentication issues

---

## 📋 Step-by-Step Instructions

### Option 1: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your `pilow` project
3. Click **Settings** → **Environment Variables**
4. For each variable above:
   - Click **Add New**
   - Enter the **Key** (e.g., `NEXT_PUBLIC_SERVER_URL`)
   - Enter the **Value** (e.g., `https://pilow.vercel.app`)
   - Select all environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **Save**

### Option 2: Using Vercel CLI

```bash
# Navigate to your project
cd /Users/franciscocornejo/Desktop/Pilow

# Add environment variables
vercel env add NEXT_PUBLIC_SERVER_URL production
# Enter: https://pilow.vercel.app

vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://pilow.vercel.app

vercel env add NEXT_PUBLIC_DRAFT_SECRET production
# Enter: pilow-draft-secret

# Repeat for preview and development environments
```

---

## 🔄 After Adding Variables

1. **Redeploy your application:**

   ```bash
   git commit --allow-empty -m "Trigger redeployment"
   git push
   ```

   Or click **Redeploy** in Vercel dashboard

2. **Test the following:**
   - ✅ Publishing content (should not return 403)
   - ✅ Live Preview functionality
   - ✅ Creating/editing pages
   - ✅ Image uploads

---

## 🐛 Troubleshooting

### Still getting 403 errors?

1. Verify `NEXT_PUBLIC_SERVER_URL` exactly matches your Vercel URL
2. Check there are **no trailing slashes** in the URL
3. Ensure you selected **all environments** when adding variables
4. Clear your browser cache and try again

### Live Preview not working?

1. Ensure `NEXT_PUBLIC_DRAFT_SECRET` is set
2. Check that `X-Frame-Options` is NOT blocking iframes (already fixed in `next.config.ts`)
3. Verify CORS configuration in `payload.config.ts` includes your Vercel URL

### Database connection issues?

1. Ensure all Neon/Postgres variables are set
2. Check that `POSTGRES_URL` is not pooled for migrations
3. Verify database is accessible from Vercel's network

---

## 📝 Current Configuration

Your `.env.local` now has:

```bash
PAYLOAD_SECRET=pilow-secure-secret-key-change-me-in-production
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DRAFT_SECRET=pilow-draft-secret
```

**For Vercel, these should be:**

```bash
PAYLOAD_SECRET=<strong-random-secret>
NEXT_PUBLIC_SERVER_URL=https://pilow.vercel.app
NEXT_PUBLIC_APP_URL=https://pilow.vercel.app
NEXT_PUBLIC_DRAFT_SECRET=pilow-draft-secret
```

---

## ⚡ Quick Fix Checklist

- [x] Remove `VERCEL_OIDC_TOKEN` from `.env.local` ✅
- [ ] Add `NEXT_PUBLIC_SERVER_URL` to Vercel
- [ ] Add `NEXT_PUBLIC_APP_URL` to Vercel
- [ ] Add `NEXT_PUBLIC_DRAFT_SECRET` to Vercel
- [ ] Redeploy application
- [ ] Test publishing functionality
- [ ] Test live preview

---

**Note:** Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put sensitive credentials in these variables!
