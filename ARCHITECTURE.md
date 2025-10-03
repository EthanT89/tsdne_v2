# System Architecture - "This Story Does Not Exist"

This document provides a visual representation of the system architecture, showing how components interact.

---

## High-Level System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  Next.js Frontend (Port 3000)               │ │
│  │                                                              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │ │
│  │  │   Display    │  │     Input    │  │   Side Panels    │ │ │
│  │  │   Narrative  │  │     Area     │  │  Stats/Inventory │ │ │
│  │  │   Text       │  │   Commands   │  │                  │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘ │ │
│  │         │                  │                   │            │ │
│  │         └──────────────────┼───────────────────┘            │ │
│  │                            │                                │ │
│  │                 ┌──────────▼──────────┐                    │ │
│  │                 │   React Context     │                    │ │
│  │                 │   (State Manager)   │                    │ │
│  │                 │                     │                    │ │
│  │                 │ • Narrative State   │                    │ │
│  │                 │ • Player Stats      │                    │ │
│  │                 │ • Inventory         │                    │ │
│  │                 │ • Loading State     │                    │ │
│  │                 └──────────┬──────────┘                    │ │
│  │                            │                                │ │
│  │                 ┌──────────▼──────────┐                    │ │
│  │                 │    API Client       │                    │ │
│  │                 │  (fetch wrapper)    │                    │ │
│  │                 └──────────┬──────────┘                    │ │
│  └────────────────────────────┼───────────────────────────────┘ │
│                                │                                 │
└────────────────────────────────┼─────────────────────────────────┘
                                 │
                              HTTPS
                         (POST /api/*)
                                 │
┌────────────────────────────────▼─────────────────────────────────┐
│                     SERVER (Port 3001)                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │               NestJS Backend Application                    │ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │              API Controllers                          │  │ │
│  │  │                                                        │  │ │
│  │  │  • POST /api/process-turn   (Turn processing)        │  │ │
│  │  │  • POST /api/auth/signup    (User registration)      │  │ │
│  │  │  • POST /api/auth/login     (User login)             │  │ │
│  │  │  • GET  /api/saves          (List saves)             │  │ │
│  │  │  • POST /api/saves          (Create save)            │  │ │
│  │  │  • GET  /api/saves/:id      (Load save)              │  │ │
│  │  └───────────────────┬──────────────────────────────────┘  │ │
│  │                      │                                      │ │
│  │  ┌───────────────────▼──────────────────────────────────┐  │ │
│  │  │              Service Layer                            │  │ │
│  │  │                                                        │  │ │
│  │  │  • NarrativeService    (Process turns, AI calls)     │  │ │
│  │  │  • AuthService         (JWT, password hashing)       │  │ │
│  │  │  • GameStateService    (Save/load management)        │  │ │
│  │  │  • MemoryService       (Context management)          │  │ │
│  │  └───────────────────┬──────────────────────────────────┘  │ │
│  │                      │                                      │ │
│  │  ┌───────────────────▼──────────────────────────────────┐  │ │
│  │  │              Data Layer (TypeORM)                     │  │ │
│  │  │                                                        │  │ │
│  │  │  • User Repository                                    │  │ │
│  │  │  • GameState Repository                               │  │ │
│  │  │  • NarrativeEvent Repository                          │  │ │
│  │  └───────────────────┬──────────────────────────────────┘  │ │
│  │                      │                                      │ │
│  └──────────────────────┼──────────────────────────────────────┘ │
│                         │                                        │
└─────────────────────────┼────────────────────────────────────────┘
                          │
                    SQL Queries
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                    PostgreSQL Database                            │
│                                                                   │
│  Tables:                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐        │
│  │   users     │  │  game_states │  │ narrative_events│        │
│  ├─────────────┤  ├──────────────┤  ├─────────────────┤        │
│  │ id          │  │ id           │  │ id              │        │
│  │ email       │  │ user_id      │  │ game_state_id   │        │
│  │ password    │  │ narrative    │  │ event_type      │        │
│  │ created_at  │  │ player_stats │  │ significance    │        │
│  │ ...         │  │ inventory    │  │ timestamp       │        │
│  └─────────────┘  │ created_at   │  │ ...             │        │
│                   │ ...          │  └─────────────────┘        │
│                   └──────────────┘                              │
└───────────────────────────────────────────────────────────────────┘

                          │
                    (Future)
                          │
┌─────────────────────────▼────────────────────────────────────────┐
│                 External AI Service (Phase 9)                     │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │  OpenAI API      │  │  Anthropic API   │                     │
│  │  (GPT-4, etc.)   │  │  (Claude, etc.)  │                     │
│  └──────────────────┘  └──────────────────┘                     │
└───────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: User Turn Processing

```
┌─────────────┐
│    User     │
│ Types cmd   │
└──────┬──────┘
       │
       │ 1. Submit command
       ▼
┌──────────────────┐
│   InputArea      │
│   Component      │
└──────┬───────────┘
       │
       │ 2. Dispatch to Context
       ▼
┌──────────────────┐
│  React Context   │
│  (State Manager) │
└──────┬───────────┘
       │
       │ 3. Call API client
       ▼
┌──────────────────┐
│   API Client     │
│  POST /process   │
└──────┬───────────┘
       │
       │ 4. HTTP POST
       ▼
┌──────────────────────┐
│  Backend Controller  │
│  /api/process-turn   │
└──────┬───────────────┘
       │
       │ 5. Call service
       ▼
┌──────────────────────┐
│  NarrativeService    │
│  • Validate input    │
│  • Call AI (stub)    │
│  • Score event       │
│  • Update stats      │
└──────┬───────────────┘
       │
       │ 6. Save to DB (optional)
       ▼
┌──────────────────────┐
│  PostgreSQL DB       │
│  Save narrative      │
└──────┬───────────────┘
       │
       │ 7. Return response
       ▼
┌──────────────────────┐
│  Backend Controller  │
│  Return JSON:        │
│  {                   │
│    narrative: "..."  │
│    stats: {...}      │
│    inventory: [...]  │
│  }                   │
└──────┬───────────────┘
       │
       │ 8. HTTP Response
       ▼
┌──────────────────────┐
│    API Client        │
│  Parse response      │
└──────┬───────────────┘
       │
       │ 9. Update Context
       ▼
┌──────────────────────┐
│   React Context      │
│  Update state:       │
│  • narrative         │
│  • stats             │
│  • inventory         │
└──────┬───────────────┘
       │
       │ 10. Trigger re-render
       ▼
┌──────────────────────┐
│  UI Components       │
│  • NarrativeDisplay  │
│  • SidePanels        │
│  All update!         │
└──────────────────────┘
       │
       │ 11. User sees result
       ▼
┌──────────────────────┐
│       User           │
│  Sees new narrative  │
│  Types next command  │
└──────────────────────┘
```

---

## Component Hierarchy (Frontend)

```
App
│
├─ RootLayout (layout.tsx)
│  │
│  └─ Home Page (page.tsx)
│     │
│     └─ MainLayout
│        │
│        ├─ NarrativeDisplay
│        │  └─ Shows story text
│        │
│        ├─ InputArea
│        │  ├─ Text input
│        │  └─ Submit button
│        │
│        ├─ LeftSidePanel
│        │  └─ PlayerStats
│        │     ├─ Health
│        │     ├─ Hunger
│        │     └─ Thirst
│        │
│        ├─ RightSidePanel
│        │  └─ Inventory
│        │     └─ Item list
│        │
│        └─ ToggleButton
│           └─ Show/hide panels

Context Providers (wrap App):
│
├─ GameStateContext
│  ├─ narrative: string[]
│  ├─ playerStats: { health, hunger, thirst }
│  ├─ inventory: string[]
│  ├─ isLoading: boolean
│  └─ error: string | null
│
└─ AuthContext (future)
   ├─ user: User | null
   ├─ isAuthenticated: boolean
   └─ login/logout functions
```

---

## Backend Module Structure (NestJS)

```
AppModule (app.module.ts)
│
├─ TypeOrmModule (database)
│  └─ Entities:
│     ├─ User
│     ├─ GameState
│     └─ NarrativeEvent
│
├─ AuthModule (future - Phase 6)
│  ├─ AuthController
│  ├─ AuthService
│  ├─ JwtStrategy
│  └─ Guards
│
├─ NarrativeModule (Phase 3)
│  ├─ NarrativeController
│  │  └─ POST /process-turn
│  │
│  └─ NarrativeService
│     ├─ processTurn()
│     ├─ callAI() [stub]
│     └─ scoreEvent()
│
├─ GameStateModule (Phase 7)
│  ├─ GameStateController
│  │  ├─ GET  /saves
│  │  ├─ POST /saves
│  │  └─ GET  /saves/:id
│  │
│  └─ GameStateService
│     ├─ save()
│     ├─ load()
│     └─ list()
│
└─ UserModule (Phase 6)
   ├─ UserController
   │  └─ User CRUD
   │
   └─ UserService
      ├─ create()
      ├─ findByEmail()
      └─ update()
```

---

## State Management (React Context)

```
GameStateContext
│
├─ State
│  ├─ narrative: string[]
│  │  └─ Array of narrative paragraphs
│  │
│  ├─ playerStats: {
│  │     health: number,
│  │     hunger: number,
│  │     thirst: number
│  │   }
│  │
│  ├─ inventory: string[]
│  │  └─ Array of item names
│  │
│  ├─ isLoading: boolean
│  │  └─ True during API calls
│  │
│  └─ error: string | null
│     └─ Error message if any
│
└─ Actions (via dispatch)
   ├─ processCommand(command: string)
   │  └─ Calls API, updates state
   │
   ├─ setLoading(boolean)
   │  └─ Set loading state
   │
   ├─ setError(string)
   │  └─ Set error message
   │
   └─ reset()
      └─ Reset to initial state
```

---

## Database Schema

```sql
-- Users table (Phase 6)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Game states table (Phase 7)
CREATE TABLE game_states (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    slot_number INTEGER NOT NULL, -- 1, 2, 3, or 0 for autosave
    narrative TEXT NOT NULL,
    player_stats JSONB NOT NULL,
    inventory JSONB NOT NULL,
    world_state JSONB,
    turn_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, slot_number)
);

-- Narrative events table (Phase 7)
CREATE TABLE narrative_events (
    id SERIAL PRIMARY KEY,
    game_state_id INTEGER REFERENCES game_states(id),
    event_type VARCHAR(50) NOT NULL,
    significance_score INTEGER NOT NULL,
    event_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_game_states_user_id ON game_states(user_id);
CREATE INDEX idx_narrative_events_game_state ON narrative_events(game_state_id);
CREATE INDEX idx_narrative_events_significance ON narrative_events(significance_score DESC);
```

---

## API Endpoints

### Current (Phase 0-1)
```
GET  /                    "Hello World from the backend!"
```

### Planned MVP (Phase 3-4)
```
POST /api/process-turn
  Request:  { command: string }
  Response: {
    narrative: string,
    playerStats: { health, hunger, thirst },
    inventory: string[],
    eventType: string,
    significanceScore: number
  }
```

### Future Features (Phase 6-7)
```
# Authentication
POST /api/auth/signup
  Request:  { email, password, displayName }
  Response: { token, user }

POST /api/auth/login
  Request:  { email, password }
  Response: { token, user }

# Save/Load
GET  /api/saves
  Response: { saves: [{ id, slotNumber, updatedAt, turnCount }] }

POST /api/saves
  Request:  { slotNumber, gameState }
  Response: { save: { id, ... } }

GET  /api/saves/:id
  Response: { save: { gameState, ... } }

DELETE /api/saves/:id
  Response: { success: boolean }
```

---

## Current vs. Target Architecture

### Current State (15% Complete)
```
✅ Frontend scaffolding (Next.js + React + TypeScript)
✅ Backend scaffolding (NestJS + TypeScript)
✅ Basic UI components (combined in MainLayout)
✅ Database connection (PostgreSQL + TypeORM)
✅ Test infrastructure (Jest)
❌ No API endpoints (except hello world)
❌ No state management
❌ No frontend-backend integration
❌ No database entities
```

### Target MVP State (Phase 4 Complete)
```
✅ Frontend scaffolding
✅ Backend scaffolding
✅ Separated UI components
✅ React Context for state
✅ /process-turn API endpoint
✅ Stub AI processing
✅ Frontend-backend integration
✅ Database entities (basic)
✅ Turn-based gameplay working
❌ No authentication
❌ No save/load
❌ No real AI
```

### Target Full State (Phase 8 Complete)
```
✅ All MVP features
✅ User authentication (JWT)
✅ Save/load system (multiple slots)
✅ Memory management
✅ Settings and customization
✅ Processing animations
✅ Error handling
✅ Logging and monitoring
❌ No real AI (still using stub)
```

### Target Complete State (Phase 9 Complete)
```
✅ All full features
✅ Real AI integration (OpenAI/Anthropic)
✅ Advanced prompt engineering
✅ Context-aware suggestions
✅ Dynamic narrative generation
✅ Production deployment
✅ Complete!
```

---

## Technology Stack Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                         FRONTEND                               │
├───────────────────────────────────────────────────────────────┤
│  Framework:   Next.js 15                                      │
│  Library:     React 19                                        │
│  Language:    TypeScript 5                                    │
│  Styling:     Tailwind CSS 3                                  │
│  Testing:     Jest 29 + React Testing Library                │
│  State Mgmt:  React Context API                               │
└───────────────────────────────────────────────────────────────┘
                              │
                           HTTPS
                              │
┌───────────────────────────────────────────────────────────────┐
│                         BACKEND                                │
├───────────────────────────────────────────────────────────────┤
│  Framework:   NestJS 11                                       │
│  Language:    TypeScript 5                                    │
│  ORM:         TypeORM 0.3                                     │
│  Testing:     Jest 29 + Supertest                             │
│  Auth:        JWT (future)                                    │
└───────────────────────────────────────────────────────────────┘
                              │
                             SQL
                              │
┌───────────────────────────────────────────────────────────────┐
│                        DATABASE                                │
├───────────────────────────────────────────────────────────────┤
│  Database:    PostgreSQL 14+                                  │
│  Access:      TypeORM repositories                            │
└───────────────────────────────────────────────────────────────┘
```

---

## Development Tools & Infrastructure

```
Version Control:     Git + GitHub
Package Manager:     npm with workspaces
Monorepo:           Root-level workspace
Concurrent Exec:    concurrently package

Linting:            ESLint
Code Style:         Prettier (backend)
Testing:            Jest (unit) + Supertest (e2e)

Development:        npm run start (both)
                   npm run start:frontend
                   npm run start:backend

Building:           npm run build (both)
Testing:            npm test (in each workspace)
```

---

**Last Updated:** January 2025  
**Document Version:** 1.0  
**Status:** Reflects planned architecture (not all implemented yet)
