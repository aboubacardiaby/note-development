# NoteDevelopment - AI-Powered Meeting Notes

An intelligent note-taking application that transforms raw meeting notes into professionally formatted documents using Claude AI. Perfect for development meetings, technical discussions, general meetings, and doctor-patient consultations.

## Features

- **Real-time Note Taking** - Rich text editor with auto-save functionality
- **Meeting Types** - Organize notes by Development, Technical, General, or Doctor-Patient interactions
- **AI Transformation** - Convert raw notes into structured documents using Claude AI
- **Multiple Templates** - Pre-built templates for different document types
- **Document Export** - Export transformed documents as PDF, DOCX, Markdown, or HTML
- **Search & Filter** - Easily find notes by content or meeting type

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- TipTap (rich text editor)
- TailwindCSS (styling)
- React Query (server state management)
- React Router (navigation)

### Backend
- Node.js + Express with TypeScript
- PostgreSQL (database)
- Prisma ORM
- Claude API (AI transformation)
- PDFKit & docx (document export)

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL 15+ (or Docker)
- Anthropic API key (for Claude AI)

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd notedevelopment
```

### 2. Set up PostgreSQL

**Option A: Using Docker (Recommended)**

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432.

**Option B: Local PostgreSQL**

Install PostgreSQL and create a database:

```sql
CREATE DATABASE notedevelopment;
CREATE USER noteuser WITH PASSWORD 'notepassword';
GRANT ALL PRIVILEGES ON DATABASE notedevelopment TO noteuser;
```

### 3. Configure Backend

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Edit .env and add your Anthropic API key
# DATABASE_URL="postgresql://noteuser:notepassword@localhost:5432/notedevelopment"
# ANTHROPIC_API_KEY="sk-ant-your-api-key-here"

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with default templates
npm run prisma:seed
```

### 4. Configure Frontend

```bash
cd ../frontend

# Copy environment variables
cp .env.example .env

# Edit .env if needed (default API URL is http://localhost:3000)

# Install dependencies
npm install
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:3000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

### Production Build

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## Usage

### Creating a Note

1. Navigate to http://localhost:5173
2. Click "New Note"
3. Select a meeting type (Development, Technical, General, or Doctor-Patient)
4. Start typing your notes
5. Notes are auto-saved every 2 seconds

### Transforming Notes with AI

1. Open a note
2. Click "Transform with AI"
3. Select a template that matches your meeting type
4. Click "Transform Note"
5. Watch as Claude AI structures your notes in real-time
6. Export the transformed document in your preferred format

### Available Templates

- **Technical Documentation** - For technical meetings
- **Doctor Prescription** - For doctor-patient consultations
- **Development Sprint Notes** - For agile sprint meetings
- **General Meeting Minutes** - For general meetings

## Project Structure

```
notedevelopment/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   └── config/          # Configuration files
│   └── prisma/              # Database schema & migrations
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API clients
│   │   └── types/           # TypeScript types
│
└── shared/                  # Shared TypeScript types
    └── types/               # Common type definitions
```

## API Endpoints

### Notes
- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes (with optional filters)
- `GET /api/notes/:id` - Get a single note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

### Templates
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create a custom template
- `PUT /api/templates/:id` - Update a template
- `DELETE /api/templates/:id` - Delete a template

### AI Transformation
- `POST /api/ai/transform` - Transform note (non-streaming)
- `POST /api/ai/transform/stream` - Transform note (streaming)

### Export
- `GET /api/export/documents` - Get all generated documents
- `GET /api/export/documents/:id/download?format=pdf` - Export document

## Database Schema

### Note
- Stores raw meeting notes
- Fields: id, title, content, meetingType, timestamps

### Template
- Defines AI transformation templates
- Fields: id, name, promptTemplate, outputFormat, fields, category

### Document
- Stores AI-generated documents
- Fields: id, title, content, noteId, templateId, aiModel, tokensUsed

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/notedevelopment"
ANTHROPIC_API_KEY="sk-ant-your-api-key"
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)

```env
VITE_API_URL="http://localhost:3000"
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps  # if using Docker

# Test database connection
cd backend
npx prisma studio
```

### API Key Issues

Make sure your Anthropic API key is valid and has sufficient credits:
- Visit https://console.anthropic.com/
- Check your API key and usage limits

### Port Conflicts

If ports 3000 or 5173 are already in use:

```bash
# Backend: Change PORT in backend/.env
# Frontend: Change port in frontend/vite.config.ts
```

## Development

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Database Management

```bash
# Open Prisma Studio (visual database editor)
cd backend
npm run prisma:studio

# Create a new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset
```

## Future Enhancements

- User authentication and multi-user support
- Real-time collaboration
- Version history for notes
- File attachments (images, PDFs)
- Template marketplace
- Mobile apps
- Offline support (PWA)
- Voice-to-text note taking

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section

---

Built with Claude AI | Made for productive note-taking
