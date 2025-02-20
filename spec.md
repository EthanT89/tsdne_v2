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
  - Full-screen text area that displays the AI-generated narrative.
  
- **Side Panels:**  
  - Display immediate player stats (Health, Hunger, Thirst) and a text-based inventory.
  - Toggle button to collapse/expand for full immersion.

- **Input Area:**  
  - Text input field for user commands with dynamically generated, context-sensitive auto-suggestions.

- **Processing Feedback:**  
  - Narrative-themed processing animation (e.g., a default quill-writing or swirling mist animation) accompanied by a consistent ambient audio cue.

- **Settings Panel:**  
  - Accessibility options (dark/light themes, adjustable font sizes, etc.).
  - Re-accessible tutorial.
  - Structured customization bio (dropdowns for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, Pacing/Difficulty).

### 2.2. Backend

#### Framework & Tools
- **Node.js** with **NestJS** (TypeScript)
- **PostgreSQL** as the primary database
- Deployed on **AWS** with container orchestration using **Kubernetes** (and Docker as needed)

#### Core Responsibilities
- Process user input and trigger AI processing each turn.
- Store narrative state, game events, player stats, and inventory.
- Handle save/load functionality, including autosave and manual save slots.
- Sync detailed memory (with significance scores) between client and server.
- Manage user authentication (email/password) and customization bio.

### 2.3. Data Handling & Memory Management

#### Narrative State Memory
- Maintained as an evolving JSON object tracking:
  - Narrative events
  - Character states
  - World changes

#### Significance Scoring (0–100)
- **70–100 (High Priority):**
  - Full detail stored on the client and immediate server sync triggered.
- **50–70 (Moderate-High):**
  - Committed to memory on the server and kept on standby on the client.
- **30–50 (Moderate):**
  - Fully recorded for later narrative reference.
- **10–30 (Low):**
  - Stored in a compact, summarized form.
- **0–10 (Very Low):**
  - Often omitted unless later flagged as significant.

#### Dynamic Summarization
- Triggered automatically when state memory reaches a defined threshold (by turn count or data size).
- Older, lower-significance events are summarized, while preserving crucial details (especially from events above 70).

---

## 3. Game Flow & User Experience

### Turn-Based Processing
- **Each user input triggers a turn:**
  - AI processes the input.
  - Outputs narrative text plus a structured JSON block containing event data.
- **The JSON block includes:**
  - A narrative summary
  - Event type, significance score, NPC/inventory/world changes

### Input/Output Cycle
- **Input:**  
  - User types a command (with auto-suggestions).
  
- **Processing:**
  - A narrative-themed animation and ambient audio play while waiting for the AI response.
  - If the AI’s output JSON is malformed, the system silently reprompts until a retry threshold is reached.
  - On exceeding retries, a narrative-friendly fallback message is displayed (e.g., “The narrator seems to be taking a brief pause…”).
  
- **Output:**
  - Narrative text appears in the output area.
  - Side panels update with player stats and inventory.

### Save/Load Functionality
- **Manual Save Slots:**  
  - 3 slots available for the user to store the game state.
  
- **Autosave:**
  - Automatically triggered on major events or every 5 turns (as a guideline).
  - A “progress saved” indicator appears in the bottom-right corner of the output box.

---

## 4. World-Building & Customization

### Initial World Setup
- **Brief Prompt Input:**
  - At game start, the player provides a short prompt (e.g., “Tokyo 1050”, “Magical World”).
  - For real-world settings, the AI adheres to historical and logical realism; for fictional ones, it uses creative discretion.
- **Behind-the-Scenes World Generation:**
  - Detailed world history, culture, and logic are generated, while only necessary immediate details are revealed to the player.

### Customization Bio (Structured Sections via Dropdowns)
- **World Setting:**  
  - Real-world (with specified time) or fictional.
- **Narrative Tone:**  
  - Options such as gritty, whimsical, dark, etc.
- **Gameplay Style:**  
  - Exploration, combat-focused, narrative-driven.
- **Themes and Genres:**  
  - Fantasy, sci-fi, mystery, etc.
- **Pacing and Difficulty:**  
  - Slow-building vs. fast-paced; easy vs. challenging.
- **Future Support:**  
  - Allow free-text input for each section.

### Tutorial & Onboarding
- A brief, skippable tutorial is shown in the narrative output upon game start.
- The tutorial can be revisited later through the settings panel.

---

## 5. NPC Tier System

### NPC Categorization
- **Tier 1 (Background Characters):**
  - Minimal details, e.g., “A playful young boy playing on the street.”
- **Tier 2 (Significant Characters):**
  - Unique, consistent personality with a brief backstory.
- **Tier 3 (Critical Characters):**
  - Detailed, evolving personalities; may have close relationships with the player.

### Dynamic Tier Adjustments
- NPCs may change tiers based on:
  - Frequency of interaction
  - Narrative prominence
  - Impact of player decisions

---

## 6. Backend Monitoring & Error Handling

### Error Handling Strategies

#### AI Output Validation
- Check JSON structure for each AI response.
- Silent reprompting occurs in the background until a valid output is produced.
- After a maximum number of retries, a narrative-friendly fallback message is displayed.

#### Backend Errors
- Handle errors gracefully with immersive, narrative-themed messages that maintain the game’s tone.

### Admin & Analytics Dashboard
- **Metrics to Track:**
  - Response times per turn
  - Error rates
  - Token usage (total and per session)
  - Active users and tokens per session average
  - User activity and engagement metrics
- **Alerting:**
  - Integrate with tools like Sentry or Datadog.
  - Send critical alerts primarily via email; fallback to SMS if needed.
- **Interface:**
  - Web-based dashboard integrated with the admin panel.

---

## 7. Testing & Quality Assurance

### Frontend Testing
- **Unit & Integration Tests:**
  - Use Jest with React Testing Library.
- **End-to-End Testing:**
  - Use Cypress for full workflow tests.

### Backend Testing
- **Unit & Integration Tests:**
  - Use Jest within the NestJS framework.
- **Performance Testing:**
  - Validate that turn response times remain under 10 seconds in typical scenarios (with allowances for longer initial world generation).

### Analytics Testing
- Verify that metrics (session duration, turns, token usage, etc.) are accurately captured and displayed on the dashboard.

---

## 8. User Authentication & Onboarding

### User Authentication
- **Account Creation:**
  - Email/password-based signup/login.
- **Customization Bio:**
  - Collected during account creation using structured dropdowns.
- **Profile Management:**
  - Allow users to update their customization bio and view save data.

### Onboarding
- A brief narrative tutorial is displayed at the start and can be revisited via the settings panel.

---

## 9. Future Enhancements
- Transition to a fully continuous, adaptive narrative that supports virtually endless possibilities.
- Explore dynamic ambient audio cues that adjust based on narrative context.
- Expand social sharing and milestone tracking features.
- Further refine the AI integration and significance scoring to enhance narrative consistency and depth.
- Explore advanced AI context management to handle increasingly large narrative memory efficiently.
