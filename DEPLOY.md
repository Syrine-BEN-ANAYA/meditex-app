

# Deployment – Muscat Meditex

## 1. Prerequisites
- Node.js 24+
- pnpm 10+
- PostgreSQL (or a cloud service like Neon)
- Accounts on Vercel (frontend) and Render / Railway (backend)

## 2. Environment Variables
Create a `.env` file at the root of the repository (or set the variables directly on your hosting platforms) with the following content:

```env
# Backend
DATABASE_URL=postgresql://user:pass@host:5432/db
ADMIN_PASSWORD=admin1234
SESSION_SECRET=a-long-secret-key
NODE_ENV=production

# Frontend
VITE_API_URL=https://api.meditex.com
```

> **Important**:  
> - Replace the values with your own (database URL, strong passwords, etc.).  
> - The `.env` file **must never be committed** to Git (it is ignored by `.gitignore`).  
> - A template file `.env.example` is provided for reference.

---

## 3. Deploy the Backend (Render or Railway)

### On Render
1. Create a new **Web Service** and connect your GitHub repository.
2. Set:
   - **Root Directory**: `.` (the root of the monorepo)
   - **Build Command**:
     ```bash
     pnpm install --frozen-lockfile && pnpm --filter @workspace/backend build
     ```
   - **Start Command**:
     ```bash
     pnpm --filter @workspace/backend start
     ```
3. Add the environment variables (from the `.env` file) in the Render dashboard.

### On Railway
1. Create a new project from your GitHub repository.
2. In the project settings, set:
   - **Build Command**:
     ```bash
     pnpm install --frozen-lockfile && pnpm --filter @workspace/backend build
     ```
   - **Start Command**:
     ```bash
     pnpm --filter @workspace/backend start
     ```
3. Add the environment variables in the Railway dashboard.

---

## 4. Deploy the Frontend (Vercel)

1. Import your repository into Vercel.
2. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `artifacts/frontend`
   - **Build Command**: (leave as default, Vercel will use `pnpm run build`)
   - **Output Directory**: `dist/public`
3. Add the environment variable `VITE_API_URL` with the URL of your deployed backend (e.g. `https://meditex-backend.onrender.com`).
4. Deploy.

---

## 5. Database Setup

### Create a PostgreSQL database
- Use a cloud provider like [Neon](https://neon.tech) or [Supabase](https://supabase.com) (free tier available).
- Copy the connection string (it looks like `postgresql://user:pass@host:5432/db?sslmode=require`) and use it as `DATABASE_URL` in the backend environment.

### Apply the database schema
From the root of the project, run:
```bash
pnpm --filter @workspace/db push
```
This will create all required tables (`site_content`, `collections_content`, `products_content`).

---

## 6. Admin Access
- The admin panel is available at `/admin` on the frontend URL.
- Use the password defined in `ADMIN_PASSWORD` to log in.

---

## 7. File Uploads
Uploaded images are stored in `artifacts/backend/public/uploads/` on the server.  
In production, these files may be lost on redeploy. For a robust solution, consider using a cloud storage service (e.g., Cloudinary, AWS S3).  
If you prefer to keep local uploads, ensure the `uploads` directory is persisted (Render/Railway offer persistent disk options).

---

## 8. Troubleshooting

### `MODULE_NOT_FOUND` during backend start
- Make sure `pnpm install` runs from the root (the monorepo structure is preserved).
- If the error persists, try adding a `.npmrc` file at the root with:
  ```
  node-linker=hoisted
  ```
- Then rebuild and redeploy.

### Database connection errors
- Verify the `DATABASE_URL` is correct and the database is reachable from the hosting platform.
- Check that the database has been provisioned (tables created via `push`).

### Admin login fails
- Ensure `ADMIN_PASSWORD` is set correctly and that `SESSION_SECRET` is a long, random string.
- Sessions are stored in memory by default – on server restart, sessions are cleared. For production, consider using a session store like `connect-pg-simple`.

---

## 9. Updating the Live Site
- Any change pushed to the main branch will trigger a redeployment on Vercel (frontend) and Render/Railway (backend) if they are connected to that branch.
- After modifying the database schema, remember to run `pnpm --filter @workspace/db push` again.

---

For further assistance, refer to the main `README.md` or contact the development team.
```

