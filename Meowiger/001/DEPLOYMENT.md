# 🚀 BreedVision Deployment Guide

Complete guide for deploying BreedVision to various platforms.

## 🌐 Deployment Options

### 1. Vercel (Recommended for Frontend)
Best for React applications with serverless functions.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables in Vercel dashboard
# DATABASE_URL, SESSION_SECRET, etc.
```

### 2. Railway (Recommended for Full-Stack)
Perfect for full-stack applications with database.

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3. Heroku (Alternative)
Traditional platform with good database support.

```bash
# Install Heroku CLI
# Create Heroku app
heroku create breedvision-app

# Set environment variables
heroku config:set DATABASE_URL=your_database_url
heroku config:set SESSION_SECRET=your_secret

# Deploy
git push heroku main
```

## 🗃️ Database Setup

### Neon PostgreSQL (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to environment variables

### Supabase (Alternative)
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Get database URL from settings
4. Configure environment variables

## ⚙️ Environment Configuration

### Production Environment Variables
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Server
NODE_ENV=production
PORT=3001

# Security
SESSION_SECRET=your-super-secure-random-string

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads

# Optional: AI Service
AI_MODEL_API_KEY=your-ai-service-key
AI_MODEL_ENDPOINT=https://your-ai-service.com/api
```

### Frontend Environment (Vite)
```bash
# API Configuration
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_VERSION=1.0.0
```

## 🏗️ Build Process

### Development Build
```bash
# Install dependencies
npm install

# Run development servers
npm run dev
```

### Production Build
```bash
# Type checking
npm run check

# Build client and server
npm run build

# Start production server
npm start
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "start"]
```

## 🔧 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run check
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## 🌍 Domain Configuration

### Custom Domain Setup
1. **Purchase domain** from registrar (Namecheap, GoDaddy, etc.)
2. **Configure DNS** records:
   ```
   Type: CNAME
   Name: www
   Value: your-deployment-url.vercel.app
   
   Type: A
   Name: @
   Value: deployment-ip-address
   ```
3. **SSL Certificate** (usually automatic on platforms)

### Subdomain Options
- `app.breedvision.com` - Main application
- `api.breedvision.com` - API endpoints
- `docs.breedvision.com` - Documentation

## 📊 Monitoring & Analytics

### Error Tracking
```bash
# Add Sentry for error monitoring
npm install @sentry/react @sentry/node

# Configure in main.tsx and server/index.ts
```

### Performance Monitoring
- **Google Analytics** for user tracking
- **Lighthouse CI** for performance monitoring
- **Uptime monitoring** with Pingdom or UptimeRobot

### Database Monitoring
- Monitor connection pool usage
- Track query performance
- Set up alerts for slow queries

## 🔐 Security Checklist

### Pre-deployment Security
- [ ] Environment variables secured
- [ ] API rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] HTTPS enforced
- [ ] Session security configured
- [ ] File upload restrictions

### Production Security
- [ ] Regular dependency updates
- [ ] Security headers implemented
- [ ] Database access restricted
- [ ] Error messages don't expose sensitive data
- [ ] Logs don't contain sensitive information

## 🚦 Health Checks

### API Health Endpoint
```typescript
// Add to server/index.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### Database Health Check
```typescript
app.get('/health/db', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.json({ database: 'connected' });
  } catch (error) {
    res.status(503).json({ database: 'disconnected' });
  }
});
```

## 📱 Mobile Optimization

### PWA Configuration
- Service worker for offline functionality
- Web app manifest for installation
- Push notifications setup
- Background sync capabilities

### Performance Optimization
- Image compression and lazy loading
- Code splitting for faster initial load
- Caching strategies for API responses
- Bundle size optimization

## 🔄 Backup Strategy

### Database Backups
- Automated daily backups
- Point-in-time recovery setup
- Backup restoration testing
- Cross-region backup storage

### Code Backups
- Git repository mirroring
- Regular dependency audits
- Version tagging for releases
- Rollback procedures documented

## 📈 Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Multiple server instances
- Database connection pooling
- Session store externalization

### Vertical Scaling
- Server resource monitoring
- Database performance optimization
- CDN for static assets
- Caching layer implementation

---

## 🆘 Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version compatibility
2. **Database connection**: Verify environment variables
3. **CORS errors**: Update allowed origins
4. **File upload issues**: Check file size limits

### Debug Commands
```bash
# Check environment variables
npm run env:check

# Database connection test
npm run db:test

# Build with verbose output
npm run build -- --verbose
```

---

*This deployment guide covers production-ready deployment strategies. Choose the platform that best fits your needs and budget.*