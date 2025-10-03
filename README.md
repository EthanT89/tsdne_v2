# This Story Does Not Exist

Welcome to **This Story Does Not Exist**, where every choice you make writes a story only you can tell. You are both the reader and the written.

Hi, I'm Ethan Thornberg! I built this project because I believe storytelling should be as limitless as your imagination. This project is my way of combining AI and creativity to build something truly unique.

## Overview

This Story Does Not Exist is an AI-powered text adventure game that adapts dynamically to your choices. Every decision influences a continuously evolving narrative, ensuring that no two playthroughs are ever the same.

- **Immersive Narrative:** Dive into an adaptive storyline that responds to every decision you make.
- **Dynamic World-Building:** Begin by describing your world—be it a bustling city, a quiet forest, or something entirely new—and watch the AI generate a rich, detailed environment.
- **Interactive Gameplay:** Input your actions via text (with helpful auto-suggestions) and let the AI narrate the unfolding adventure.
- **Persistent Memories:** The game remembers your choices and adapts the story accordingly, using a detailed memory system that balances full detail with summarized context.
- **Classic Fantasy Adventure (Test Mode):** Our initial setup uses a classic fantasy adventure framework, paving the way for future endless narrative possibilities.

## Project Status

**Current Phase:** Early Development (MVP in progress)  
**Completion:** ~15%

See [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) for detailed analysis and roadmap.  
See [todo.md](./todo.md) for detailed task checklist.

### What's Working
- ✅ Project scaffolding (monorepo structure)
- ✅ Basic frontend UI with side panels and input area
- ✅ Backend API foundation with NestJS
- ✅ PostgreSQL database connection
- ✅ Basic test infrastructure

### What's Next
- 🔄 Fix immediate build/test issues
- 🔄 Implement core `/process-turn` API endpoint
- 🔄 Extract and modularize UI components
- 🔄 Connect frontend to backend API
- 🔄 Add state management

## Tech Stack

### Frontend
- **Framework:** Next.js 15 with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL with TypeORM
- **Testing:** Jest

### Development
- **Package Manager:** npm with workspaces
- **Monorepo:** Root-level workspace management
- **Concurrent Execution:** Run both frontend and backend simultaneously

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher
- PostgreSQL 14 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EthanT89/tsdne_v2.git
   cd tsdne_v2
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb tsdne_db

   # Or using psql
   psql -U postgres
   CREATE DATABASE tsdne_db;
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=tsdne_db
   PORT=3001
   ```

### Running the Application

#### Run both frontend and backend concurrently:
```bash
npm start
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

#### Run individually:

**Frontend only:**
```bash
npm run start:frontend
# Or:
cd frontend && npm run dev
```

**Backend only:**
```bash
npm run start:backend
# Or:
cd backend && npm run start:dev
```

### Building for Production

**Build both:**
```bash
npm run build
```

**Build individually:**
```bash
# Frontend
npm run build:frontend

# Backend
npm run build:backend
```

### Running Tests

**All tests:**
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

**Watch mode:**
```bash
# Frontend
cd frontend
npm test -- --watch

# Backend
cd backend
npm run test:watch
```

**Coverage:**
```bash
# Backend
cd backend
npm run test:cov
```

## Project Structure

```
tsdne_v2/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── page.tsx     # Home page
│   │   │   └── globals.css  # Global styles
│   │   ├── components/      # React components
│   │   │   └── MainLayout.tsx
│   │   └── __tests__/       # Component tests
│   ├── public/              # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── main.ts          # Application entry point
│   │   ├── app.module.ts    # Root module
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   ├── test/                # E2E tests
│   ├── package.json
│   └── tsconfig.json
│
├── spec.md                   # Detailed project specification
├── prompt_plan.md           # Development blueprint
├── todo.md                  # Task checklist
├── PROJECT_ANALYSIS.md      # Current state analysis & roadmap
├── package.json             # Root workspace configuration
└── README.md               # This file
```

## Development Workflow

1. **Start with Planning**
   - Review [spec.md](./spec.md) for feature specifications
   - Check [todo.md](./todo.md) for current tasks
   - See [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) for roadmap

2. **Make Changes**
   - Follow the phased approach in PROJECT_ANALYSIS.md
   - Write tests for new features
   - Test thoroughly before committing

3. **Test**
   - Run unit tests: `npm test`
   - Run linters: `npm run lint` (in respective directories)
   - Build to verify: `npm run build`

4. **Commit**
   - Use clear, descriptive commit messages
   - Reference issue numbers when applicable

## Key Features (Planned)

### Current Phase: MVP
- [x] Basic UI layout with narrative display, input, and side panels
- [ ] Turn-based interaction system
- [ ] Stub AI narrative generation
- [ ] Player stats tracking (Health, Hunger, Thirst)
- [ ] Basic inventory system
- [ ] State management

### Future Phases
- [ ] User authentication (email/password)
- [ ] Multiple save slots + autosave
- [ ] World customization (setting, tone, style)
- [ ] Context-aware command suggestions
- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] Memory management system
- [ ] Advanced narrative techniques
- [ ] Processing animations & ambient audio
- [ ] Admin dashboard & analytics

## Documentation

### 📖 Start Here
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick overview and getting started guide
- **[README.md](./README.md)** - This file: project overview and setup instructions

### 📊 Planning & Analysis
- **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** - Comprehensive current state analysis with detailed roadmap
- **[DEVELOPMENT_PHASES.md](./DEVELOPMENT_PHASES.md)** - Visual roadmap with phase-by-phase breakdown
- **[todo.md](./todo.md)** - Detailed task checklist with completion tracking

### 📐 Specifications & Design
- **[spec.md](./spec.md)** - Complete feature specifications and technical design
- **[prompt_plan.md](./prompt_plan.md)** - Detailed development blueprint with implementation prompts

## Contributing

This is currently a personal project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Share ideas for the narrative system

## Known Issues

See [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) Section 1.3 for current issues.

**Critical:**
1. Frontend build fails due to Google Fonts dependency (fix in progress)
2. Backend test expects different output (fix in progress)
3. Frontend test configuration needs update (fix in progress)

## License

UNLICENSED - Private project

## Contact

Created by Ethan Thornberg

---

**Note:** This project is in active development. Many features are planned but not yet implemented. See PROJECT_ANALYSIS.md for detailed status and roadmap.
