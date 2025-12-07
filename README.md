# ProjectXXX - Cattle Breed Recognition System

A full-stack web application for recognizing and providing information about cattle breeds using AI-powered image recognition.

## Features

- 🤖 AI-powered cattle breed recognition using Roboflow
- 📱 Responsive React frontend with Vite
- 🚀 Express backend with serverless API routes (Vercel compatible)
- 🎨 Beautiful UI with Tailwind CSS and Shadcn UI components
- 🌐 Multi-language support (English & Hindi)
- 🌙 Dark/Light theme support

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **Deployment**: Vercel (serverless functions)
- **Database**: (configured for PostgreSQL via Drizzle ORM)
- **Image Recognition**: Roboflow API

## Local Development

### Prerequisites

- Node.js >= 16
- npm or yarn
- Environment variables (see `.env.example`)

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/ProjectXXX.git
cd ProjectXXX/001
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file from `.env.example`
```bash
cp .env.example .env
```

4. Add your Roboflow API key to `.env`:
```
ROBOFLOW_API_KEY=your_actual_api_key
SESSION_SECRET=your_secure_session_secret
```

5. Start development server
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:3001

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (Vite + esbuild)
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes (Drizzle ORM)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities
│   │   └── index.css      # Global styles
│   └── index.html         # Entry HTML
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   └── utils/            # Utilities (database, etc.)
├── api/                  # Vercel serverless functions
│   ├── predict.ts        # Breed prediction endpoint
│   └── breed.ts          # Breed information endpoint
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── vercel.json           # Vercel deployment configuration
```

## API Endpoints

### Predict Breed
- **POST** `/api/predict`
- Body: `{ image: "base64_image_string", filename: "optional_filename" }`
- Returns: Breed prediction with confidence and bounding box

### Get Breed Info
- **GET** `/api/breed/:breedName`
- Returns: Detailed information about the specified breed

## Environment Variables

Required environment variables (see `.env.example`):

- `ROBOFLOW_API_KEY` - Your Roboflow API key for breed recognition
- `SESSION_SECRET` - Secret key for session management
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (development only)

## Deployment to Vercel

1. Push your code to GitHub
```bash
git push origin main
```

2. Go to [Vercel](https://vercel.com) and import your GitHub repository

3. Add environment variables in Vercel project settings:
   - `ROBOFLOW_API_KEY`
   - `SESSION_SECRET`

4. Deploy! Vercel will automatically build and deploy your changes

## Vercel-Specific Features

- Serverless API routes in `/api` directory
- Automatic builds and deployments on push
- Environment variables management
- Automatic HTTPS
- Edge caching for static assets

## Troubleshooting

### npm run dev not working
- Ensure Node.js version >= 16
- Delete `node_modules` and run `npm install`
- Check that ports 5173 (Vite) and 3001 (Express) are not in use

### Build errors
- Run `npm run check` to identify TypeScript issues
- Clear Vite cache: `rm -rf .vite` (or `rmdir /s .vite` on Windows)
- Ensure all environment variables are set in `.env`

### API errors on production
- Check Vercel logs: Dashboard → Deployments → Function logs
- Verify environment variables are set in Vercel project settings
- Check that database credentials are correct (if using database)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

Created with ❤️ for cattle breed recognition
