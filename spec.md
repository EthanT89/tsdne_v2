# This Story Does Not Exist - Developer Specification

## 1. Project Overview

### Concept
An immersive, AI-powered text adventure where every decision influences a dynamically generated, continuous narrative. No two playthroughs are identical. The user is the main protagonist in a world that evolves based on their actions, with AI-driven storytelling, memory-based continuity, and a flexible, modular UI. The ultimate goal is to support virtually endless narrative possibilities while maintaining logical, coherent story progression.

### Initial Phase
- Use a somewhat predefined, classic fantasy adventure framework (for testing) that is fully reaction-based.
- Architect the system to allow a future transition to a fully continuous, adaptive narrative.

---

## 2. System Architecture

### 2.1. Frontend

#### Framework & Tools
- **React/Next.js** with TypeScript
- **Tailwind CSS** for styling

#### Key Components
- **Narrative Display Area:**  
  - A full-screen text area displaying the AI-generated narrative.
  
- **Side Panels:**  
  - Display immediate player stats (Health, Hunger, Thirst) and a text-based inventory.
  - Include a toggle button to collapse/expand these panels for full immersion.

- **Input Area:**  
  - A text input field for user commands featuring dynamically generated, context-sensitive auto-suggestions.

- **Processing Feedback:**  
  - A narrative-themed processing animation (e.g., a default quill-writing or swirling mist animation).
  - A consistent ambient audio cue plays during processing.

- **Settings Panel:**  
  - Options for dark/light themes, adjustable font sizes, and other accessibility features.
  - Access to a skippable tutorial that can also be revisited.
  - A structured customization bio using dropdowns for:
    - World Setting
    - Narrative Tone
    - Gameplay Style
    - Themes/Genres
    - Pacing/Difficulty

### 2.2. Backend

#### Framework & Tools
- **Node.js** with **NestJS** (TypeScript)
- **PostgreSQL** as the primary database
- Deployed on **AWS** with container orchestration using **Kubernetes** (Docker as needed)

#### Core Responsibilities
- Process user input and trigger AI processing each turn.
- Store narrative state, game events, player stats, and inventory.
- Handle save/load functionality (including autosave and 3 manual save slots).
- Sync detailed memory (with significance scores) between client and server.
- Manage user authentication (email/password) and customization bio.

### 2.3. Data Handling & Memory Management

#### Narrative State Memory
- Maintain an evolving JSON object that tracks:
  - Narrative events
  - Character states
  - World changes

#### Significance Scoring (0–100)
- **70–100 (High Priority):**
  - Full details stored on the client; immediate server sync triggered.
- **50–70 (Moderate-High):**
  - Events are committed to memory on the server and remain on standby on the client.
- **30–50 (Moderate):**
  - Fully recorded for future narrative reference.
- **10–30 (Low):**
  - Stored in a compact, summarized form.
- **0–10 (Very Low):**
  - Often omitted unless later flagged as significant.

#### Dynamic Summarization
- Triggered automatically when state memory reaches a defined threshold (by turn count or data size).
- Older, lower-significance events are summarized, preserving crucial details (especially from events scoring above 70).

---

## 3. Game Flow & User Experience

### Turn-Based Processing
- **User Input:**  
  - Every command entered by the user triggers a turn.
  
- **AI Processing:**  
  - The AI processes the input and outputs both a narrative text and a structured JSON block containing event data:
    - Narrative summary
    - Event type
    - Significance score
    - Updates on NPC/inventory/world changes

### Input/Output Cycle
- **Input:**  
  - Users type commands (with auto-suggestions).
  
- **Processing:**  
  - A narrative-themed animation and ambient audio cue are shown during AI processing.
  - If the AI's JSON output is malformed, the system silently reprompts until a retry threshold is reached.
  - After maximum retries, a narrative-friendly fallback message is displayed (e.g., “The narrator seems to be taking a brief pause…”).

- **Output:**  
  - The narrative text is rendered in the main output area.
  - Side panels update to reflect current player stats and inventory.

### Save/Load Functionality
- **Manual Saves:**  
  - The game provides 3 manual save slots for storing the current state.
  
- **Autosave:**  
  - Triggered automatically on major events or every 5 turns (guideline).
  - A “progress saved” indicator appears in the bottom-right corner of the output box.

---

## 4. World-Building & Customization

### Initial World Setup
- **Brief Prompt Input:**  
  - At game start, players enter a short prompt (e.g., “Tokyo 1050”, “Magical World”).
  - For real-world settings, the AI adheres to historical/logical realism; for fictional settings, creative discretion is applied.
- **Behind-the-Scenes World Generation:**  
  - Detailed world history, culture, and logic are generated, with only necessary immediate details revealed to the player.

### Customization Bio (Structured via Dropdowns)
- **Sections Include:**
  - World Setting (Real-world with time or fictional)
  - Narrative Tone (e.g., gritty, whimsical, dark)
  - Gameplay Style (e.g., exploration, combat-focused, narrative-driven)
  - Themes and Genres (e.g., fantasy, sci-fi, mystery)
  - Pacing and Difficulty (e.g., slow-building vs. fast-paced; easy vs. challenging)
- **Future Enhancement:**  
  - Support free-text input for each section.

### Tutorial & Onboarding
- A brief, skippable tutorial is shown in the narrative output at the start.
- The tutorial is accessible later via the settings panel.

---

## 5. NPC Tier System

### NPC Categorization
- **Tier 1 (Background Characters):**  
  - Minimal details (e.g., “A playful young boy playing on the street”).
  
- **Tier 2 (Significant Characters):**  
  - Have a unique, consistent personality with a brief backstory.
  
- **Tier 3 (Critical Characters):**  
  - Feature detailed, evolving personalities; may develop close relationships with the player.

### Dynamic Tier Adjustments
- NPCs may move between tiers based on:
  - Frequency of interactions
  - Narrative prominence
  - Impact of player decisions

---

## 6. Backend Monitoring & Error Handling

### Error Handling Strategies

#### AI Output Validation
- Verify the JSON structure for each AI response.
- If malformed, initiate silent reprompting until a valid output is produced.
- After reaching a maximum number of retries, display a narrative-friendly fallback message (e.g., “The narrator seems to be taking a brief pause…”).

#### Backend Errors
- Handle backend errors gracefully with narrative-themed messages that maintain immersion.

### Admin & Analytics Dashboard
- **Metrics to Track:**
  - Response times per turn
  - Error rates
  - Token usage (total and per session)
  - Active users and tokens per session average
  - User activity and engagement metrics
- **Alerting:**
  - Integrate with monitoring tools (e.g., Sentry, Datadog).
  - Send critical alerts primarily via email; use SMS as a backup.
- **Interface:**
  - Web-based dashboard integrated with the admin panel for real-time monitoring.

---

## 7. Testing & Quality Assurance

### Frontend Testing
- **Unit & Integration Tests:**  
  - Utilize Jest with React Testing Library.
- **End-to-End Testing:**  
  - Implement Cypress for full workflow tests.

### Backend Testing
- **Unit & Integration Tests:**  
  - Use Jest within the NestJS framework.
- **Performance Testing:**  
  - Ensure turn response times remain under 10 seconds (with allowances during initial world generation).

### Analytics Testing
- Verify that metrics (session duration, turns, token usage, error occurrences, etc.) are accurately captured and displayed on the dashboard.

---

## 8. User Authentication & Onboarding

### User Authentication
- **Account Creation:**  
  - Email/password-based signup and login.
- **Customization Bio:**  
  - Collected during account creation using structured dropdowns.
- **Profile Management:**  
  - Allow users to update their customization bio and view their saved game data.

### Onboarding
- A brief narrative tutorial is displayed at the start.
- The tutorial can be revisited via the settings panel.

---

## 9. Future Enhancements
- Transition to a fully continuous, adaptive narrative supporting virtually endless possibilities.
- Explore dynamic ambient audio cues that adjust based on narrative context.
- Expand social sharing and milestone tracking features.
- Further refine AI integration and significance scoring to improve narrative consistency and depth.
- Develop advanced AI context management to handle larger narrative memory efficiently.

