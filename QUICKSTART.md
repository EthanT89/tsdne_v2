# Quick Start Guide - "This Story Does Not Exist"

This guide helps you quickly understand the project status and get started.

## 📊 Project at a Glance

**Status:** Early Development (MVP Phase)  
**Completion:** ~15% of planned features  
**Goal:** AI-powered text adventure with dynamic narrative generation

## 🎯 What Works Right Now

✅ **Project Structure**
- Monorepo with frontend (Next.js) and backend (NestJS)
- Basic UI with narrative display, side panels, input area
- PostgreSQL database connected
- Test infrastructure in place

❌ **What Doesn't Work Yet**
- Frontend build fails (Google Fonts issue - fix in progress)
- Some tests need updating
- No API endpoints for gameplay
- No AI integration
- No user authentication
- No save/load system

## 🚀 Getting Started (Quick)

```bash
# Clone and install
git clone https://github.com/EthanT89/tsdne_v2.git
cd tsdne_v2
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Setup database
createdb tsdne_db

# Configure backend (create backend/.env)
cp backend/.env.example backend/.env
# Edit backend/.env with your database password

# Run (after fixes are complete)
npm start
```

## 📚 Key Documents

| Document | Purpose | Start Here If... |
|----------|---------|------------------|
| **[README.md](./README.md)** | Setup & overview | You want to install and run the project |
| **[PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)** | Detailed analysis & roadmap | You want to understand current state and plan |
| **[spec.md](./spec.md)** | Feature specifications | You want to know what features are planned |
| **[todo.md](./todo.md)** | Task checklist | You want to see what needs to be done |
| **[prompt_plan.md](./prompt_plan.md)** | Development blueprint | You want detailed implementation guidance |

## 🎯 Next Steps (Priority Order)

### Immediate (1-2 hours)
1. ⚠️ Fix frontend build (remove Google Fonts)
2. ⚠️ Fix backend test expectations
3. ⚠️ Fix frontend test configuration

### Phase 1: MVP Backend (4-6 hours)
1. Define narrative state schema (TypeScript interface)
2. Create `/process-turn` API endpoint
3. Build stub AI that returns fake narrative responses
4. Add unit tests

### Phase 2: Component Separation (3-4 hours)
1. Extract NarrativeDisplay component
2. Extract InputArea component
3. Extract SidePanel components
4. Add component tests

### Phase 3: Integration (4-6 hours)
1. Connect frontend input to backend API
2. Add React Context for state management
3. Update UI on API responses
4. Integration tests

### Phase 4: Polish (3-4 hours)
1. Add loading animations
2. Improve styling and UX
3. Add command suggestions
4. Settings panel

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │   Display   │  │ Input Area   │  │   Panels  │  │
│  │  Narrative  │  │  Commands    │  │Stats/Inv  │  │
│  └─────────────┘  └──────────────┘  └───────────┘  │
│         │                 │                │         │
│         └─────────────────┼────────────────┘         │
│                           │                          │
│                      React Context                   │
│                      (State Mgmt)                    │
│                           │                          │
└───────────────────────────┼──────────────────────────┘
                            │
                         HTTPS
                            │
┌───────────────────────────┼──────────────────────────┐
│                    Backend (NestJS)                   │
│  ┌──────────────────┐           ┌─────────────────┐ │
│  │  /process-turn   │           │  Future APIs    │ │
│  │  POST endpoint   │           │  /auth /save    │ │
│  └────────┬─────────┘           └─────────────────┘ │
│           │                                           │
│    ┌──────▼────────┐                                │
│    │ AI Processing │  (Stub for now)                │
│    │   Function    │                                │
│    └──────┬────────┘                                │
│           │                                           │
│    ┌──────▼────────┐                                │
│    │  PostgreSQL   │                                │
│    │   Database    │                                │
│    └───────────────┘                                │
└──────────────────────────────────────────────────────┘
```

## 🔧 Tech Stack Quick Reference

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | Next.js | 15.1.7 |
| Frontend Library | React | 19.0.0 |
| Frontend Language | TypeScript | 5.x |
| Frontend Styling | Tailwind CSS | 3.4.17 |
| Backend Framework | NestJS | 11.0.1 |
| Backend Language | TypeScript | 5.7.3 |
| Database | PostgreSQL | 14+ |
| ORM | TypeORM | 0.3.20 |
| Testing | Jest | 29.7.0 |

## 💡 Development Tips

### Running the project
```bash
# Both at once
npm start

# Separately
npm run start:frontend  # Port 3000
npm run start:backend   # Port 3001
```

### Testing
```bash
cd frontend && npm test  # Frontend tests
cd backend && npm test   # Backend tests
```

### Building
```bash
npm run build           # Both
npm run build:frontend  # Frontend only
npm run build:backend   # Backend only
```

## 🐛 Known Issues

1. **Frontend build fails** - Google Fonts dependency blocked
2. **Backend test fails** - Wrong expected value in test
3. **Frontend tests won't run** - Jest config needs CommonJS syntax

**All fixes documented in PROJECT_ANALYSIS.md Section 1.3**

## 📈 Timeline Estimate

- **MVP (Playable game with stub AI):** 3-4 weeks part-time
- **Full features (auth, save/load):** 6-8 weeks part-time
- **AI Integration:** +2-4 weeks

See PROJECT_ANALYSIS.md Section 5 for detailed timeline.

## 🤝 Contributing

This is a personal project by Ethan Thornberg, but:
- Bug reports welcome
- Feature suggestions welcome
- Code contributions welcome (after discussion)

## 📞 Need Help?

1. Check [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) for detailed info
2. Review [spec.md](./spec.md) for feature details
3. Look at [todo.md](./todo.md) for task breakdown
4. Check existing code for examples

---

**Last Updated:** January 2025  
**Current Branch:** Development  
**Next Milestone:** Fix immediate issues + Core API
