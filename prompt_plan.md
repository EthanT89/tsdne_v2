# This Story Does Not Exist - Detailed Development Blueprint

Below is a comprehensive, step-by-step blueprint for building the "This Story Does Not Exist" project. The blueprint starts with a high-level plan, breaks it down into iterative chunks, then refines those chunks into small, safe, and testable steps. Finally, a series of prompts for a code-generation LLM is provided—each prompt builds on previous work and wires new code together, ensuring there is no orphaned functionality.

---

## 1. Project Overview

### Concept
- **Immersive AI-Powered Text Adventure:** Every decision influences a dynamically generated narrative.
- **Unique Playthroughs:** The narrative evolves with each user action.
- **Future-Proof Design:** Initially uses a reaction-based classic fantasy framework with plans to transition to a fully continuous, adaptive narrative.
- **Modular UI:** Allows for flexible extension and dynamic narrative management.

### Initial Phase
- Start with a classic fantasy adventure that is fully reaction-based.
- Architect the system to support future transitions to adaptive, continuous narratives.

---

## 2. System Architecture

### 2.1. Frontend

**Framework & Tools:**  
- React/Next.js with TypeScript  
- Tailwind CSS for styling

**Key Components:**
- **Narrative Display Area:** Full-screen text area to show the AI-generated narrative.
- **Side Panels:** Display player stats (e.g., Health, Hunger, Thirst) and text-based inventory; includes a toggle for immersion.
- **Input Area:** Text input for user commands with dynamic, context-sensitive auto-suggestions.
- **Processing Feedback:** Narrative-themed animations (e.g., quill writing, swirling mist) and ambient audio.
- **Settings Panel:** Accessibility options, re-accessible tutorial, and a structured customization bio (dropdowns for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, Pacing/Difficulty).

### 2.2. Backend

**Framework & Tools:**  
- Node.js with NestJS (TypeScript)  
- PostgreSQL as the primary database  
- Deployed on AWS with Kubernetes (and Docker as needed)

**Core Responsibilities:**
- Process user input and trigger AI processing each turn.
- Store narrative state, game events, player stats, and inventory.
- Handle save/load functionality (autosave and manual save slots).
- Sync detailed memory (with significance scores) between client and server.
- Manage user authentication (email/password) and customization bio.

### 2.3. Data Handling & Memory Management

**Narrative State Memory:**  
- An evolving JSON object that tracks narrative events, character states, and world changes.

**Significance Scoring (0–100):**
- **70–100:** Full detail stored on the client; immediate server sync.
- **50–70:** Stored on the server with client standby.
- **30–50:** Fully recorded for narrative reference.
- **10–30:** Stored in summarized form.
- **0–10:** Often omitted unless flagged as significant.

**Dynamic Summarization:**  
- Automatically triggered when state memory reaches a threshold, summarizing older, lower-significance events while preserving crucial details.

---

## 3. Game Flow & User Experience

### Turn-Based Processing
- **User Input:** Each command triggers a turn.
- **AI Processing:** The AI returns narrative text and a structured JSON block (includes narrative summary, event type, significance score, and NPC/inventory/world changes).

### Input/Output Cycle
- **Input:** User enters a command (with auto-suggestions).
- **Processing:** While waiting for the AI response, a narrative-themed animation and ambient audio play.
- **Error Handling:** If the AI returns malformed JSON, the system silently reprompts until a retry threshold is reached; afterward, a narrative-friendly fallback is shown.
- **Output:** Narrative text is displayed and side panels update with player stats/inventory.

### Save/Load Functionality
- **Manual Save Slots:** Three slots for storing game state.
- **Autosave:** Triggered on major events or every five turns, with an indicator to show progress.

---

## 4. World-Building & Customization

### Initial World Setup
- **Prompt Input:** At game start, the player provides a short prompt (e.g., "Tokyo 1050", "Magical World").
- **World Generation:** Behind-the-scenes creation of detailed world history, culture, and logic; only immediate details are revealed.

### Customization Bio
- **Structured Dropdowns:** Options for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, and Pacing/Difficulty.
- **Future Support:** Allow free-text input for additional customization.

### Tutorial & Onboarding
- A skippable tutorial is shown at the start and can be revisited via the settings panel.

---

## 5. NPC Tier System

### NPC Categorization
- **Tier 1:** Background characters (minimal detail).
- **Tier 2:** Significant characters (unique, consistent personality with a brief backstory).
- **Tier 3:** Critical characters (detailed, evolving personalities; possibly linked closely to the player).

### Dynamic Tier Adjustments
- NPCs change tiers based on interaction frequency, narrative prominence, and player decisions.

---

## 6. Backend Monitoring & Error Handling

### AI Output Validation
- Validate JSON structure from AI responses.
- Silent reprompt until valid JSON; after max retries, display a narrative-themed fallback message.

### Backend Errors
- Gracefully handle errors with immersive messages that match the narrative tone.

### Admin & Analytics Dashboard
- **Metrics:** Response times, error rates, token usage, active users, and engagement.
- **Alerting:** Integrate with Sentry, Datadog, or similar tools for alerts via email/SMS.
- **Interface:** A web-based dashboard integrated with the admin panel.

---

## 7. Testing & Quality Assurance

### Frontend Testing
- **Unit & Integration Tests:** Use Jest and React Testing Library.
- **End-to-End Testing:** Use Cypress for full workflow testing.

### Backend Testing
- **Unit & Integration Tests:** Use Jest within the NestJS framework.
- **Performance Testing:** Validate that response times remain under 10 seconds in typical scenarios.

### Analytics Testing
- Verify that key metrics (session duration, turn count, token usage, etc.) are accurately captured and displayed.

---

## 8. User Authentication & Onboarding

### User Authentication
- **Account Creation:** Email/password-based signup/login.
- **Customization Bio:** Collected during account creation via structured dropdowns.
- **Profile Management:** Allow users to update their customization bio and view saved data.

### Onboarding
- A narrative tutorial is shown at the start and accessible via the settings panel.

---

## 9. Future Enhancements
- Transition to a fully continuous, adaptive narrative.
- Explore dynamic ambient audio cues that adapt to narrative context.
- Expand social sharing and milestone tracking features.
- Further refine AI integration and significance scoring for enhanced narrative consistency.
- Explore advanced AI context management to handle increasingly large narrative memory.

---

# Iterative Development Breakdown

## High-Level Chunks

1. **Project Setup & Scaffolding**
   - Initialize Next.js (frontend) and NestJS (backend) projects.
   - Configure TypeScript and Tailwind CSS for the frontend.
   - Set up PostgreSQL and basic folder structure for the backend.
   - Create scripts to run both projects concurrently and add minimal tests to ensure startup.

2. **Basic Frontend UI Components**
   - Create static UI components: Narrative Display, Input Area, and Side Panels.
   - Wire components together in a main layout.
   - Add placeholders for processing animations and ambient audio.
   - Write unit tests for component rendering.

3. **Backend API & Core Functionality**
   - Implement a NestJS controller with a POST endpoint `/process-turn`.
   - Define narrative state JSON schema.
   - Create a stubbed AI processing function returning narrative text and structured JSON.
   - Implement basic event significance scoring and error handling.
   - Write unit tests for API responses.

4. **Frontend-Backend Integration**
   - Modify the Input Area to send commands to the backend.
   - Update the Narrative Display with API responses.
   - Integrate state management (React Context or Redux) for narrative state, stats, and inventory.
   - Write integration tests for the full I/O cycle.

5. **User Authentication & Customization**
   - Develop signup/login screens on the frontend.
   - Implement authentication endpoints (using JWT or session-based auth) on the backend.
   - Create a customization bio form on the frontend and store the data on the backend.
   - Write tests for authentication and form validation.

6. **Save/Load Functionality & Memory Management**
   - Develop backend endpoints for manual save slots and autosave.
   - Extend the narrative state JSON for memory management (event significance and summarization).
   - Create frontend UI elements for triggering save/load actions and progress indicators.
   - Write tests to ensure save/load operations function correctly.

7. **Final Integration & Monitoring**
   - Wire all modules together into a cohesive system.
   - Implement robust error handling with narrative-themed fallback messages.
   - Integrate logging and monitoring (e.g., Sentry, Datadog) on the backend.
   - Develop an admin/analytics dashboard.
   - Write comprehensive end-to-end tests for overall functionality.

---

## Detailed Iterative Steps

### Project Setup & Scaffolding
1. Create a Next.js project with TypeScript.
2. Install and configure Tailwind CSS.
3. Initialize a NestJS project with TypeScript.
4. Set up PostgreSQL connection in NestJS.
5. Establish a common folder structure and concurrent run scripts.
6. Add basic tests to verify that both projects start correctly.

### Basic Frontend UI Components
1. Develop a static `NarrativeDisplay` component.
2. Build an `InputArea` component with a text field and placeholder for auto-suggestions.
3. Create simple `SidePanel` components for player stats and inventory.
4. Add placeholders for processing animations and ambient audio.
5. Integrate these components into a main layout.
6. Write unit tests to verify that each component renders as expected.

### Backend API & Core Functionality
1. Create a NestJS controller with a POST endpoint (`/process-turn`).
2. Define the narrative state JSON schema.
3. Implement a stub AI processing function returning narrative text and a JSON block (narrative summary, event type, significance score).
4. Add event significance scoring logic.
5. Implement error handling with retry logic.
6. Write unit tests for the controller and stub function.

### Frontend-Backend Integration
1. Update the `InputArea` to call the `/process-turn` endpoint on command submission.
2. Update the `NarrativeDisplay` to render the API response.
3. Integrate a state management solution (React Context/Redux) to handle narrative state and update side panels.
4. Write integration tests to verify the complete flow from input to narrative update.
5. Ensure proper loading and error states are displayed.

### User Authentication & Customization
1. Build signup and login pages on the frontend.
2. Create NestJS endpoints for user signup and login; integrate JWT/session-based authentication.
3. Implement a customization bio form on the frontend with dropdowns for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, and Pacing/Difficulty.
4. Wire the customization bio form to send data to and store it on the backend.
5. Write tests to verify authentication endpoints and form validations.

### Save/Load Functionality & Memory Management
1. Develop backend endpoints for manual save slots (minimum 3) and autosave logic.
2. Extend the narrative state JSON to support event significance and dynamic summarization.
3. Create frontend UI elements for save/load actions with progress indicators.
4. Wire the save/load actions so that narrative state is updated and displayed.
5. Write tests to confirm save/load functionality.

### Final Integration & Monitoring
1. Wire all components together to form a cohesive, integrated system.
2. Implement robust error handling on every API call with narrative-themed fallback messages.
3. Integrate logging and monitoring tools (Sentry, Datadog) on the backend.
4. Develop an admin dashboard to display key metrics (response times, error rates, token usage, active user counts).
5. Write comprehensive end-to-end tests covering all functionalities—from user input to narrative processing, state updates, authentication, and save/load.

---

# Series of Detailed Prompts for a Code-Generation LLM

Below are separate prompt sections in markdown code blocks. Each prompt builds on previous work and ends by wiring new code into the overall system.

### **Prompt 1: Project Scaffolding**
```text
Prompt:
"Initialize a monorepo for 'This Story Does Not Exist' that contains two projects: a Next.js project for the frontend and a NestJS project for the backend. Configure TypeScript for both projects. In the Next.js project, install and configure Tailwind CSS with a minimal configuration file. In the NestJS project, set up a PostgreSQL connection using environment variables and create a basic folder structure. Add npm scripts to run both projects concurrently. Finally, include basic test files in both projects that verify the projects start correctly."

Prompt 2: Basic Frontend UI Components
Prompt:
"Develop the core frontend UI components using Next.js, React, and TypeScript. Create a 'NarrativeDisplay' component that fills the screen and displays static narrative text. Build an 'InputArea' component that contains a text input field with placeholder text (to later support auto-suggestions). Also, create simple 'SidePanel' components to display player stats and inventory. Wire these components together into a main layout page. Finally, write unit tests using Jest and React Testing Library to ensure each component renders correctly."

Prompt 3: Backend API for Turn Processing
Prompt:
"Implement a NestJS controller with a POST endpoint at '/process-turn'. This endpoint should accept user input (a command) and return a stubbed AI response including narrative text and a structured JSON block (with fields for narrative summary, event type, and significance score). Define the narrative state JSON schema and incorporate basic error handling (including a retry mechanism for malformed responses). Write unit tests for this controller to verify that valid input returns the expected stubbed response."

Prompt 4: Frontend-Backend Integration
Prompt:
"Integrate the frontend and backend by modifying the 'InputArea' component so that when the user submits a command, it calls the '/process-turn' API endpoint. Update the 'NarrativeDisplay' component to show the returned narrative text, and ensure the side panels update with any provided stats or inventory changes. Implement state management using React Context or Redux to maintain narrative state across components. Write integration tests to verify that the full flow—from user input through API response to UI update—works as expected."

Prompt 5: Advanced UI Features & State Management
Prompt:
"Enhance the frontend by adding processing feedback: implement a narrative-themed animation and ambient audio cues while waiting for the API response. Improve the 'InputArea' component to display context-sensitive auto-suggestions (static suggestions are acceptable initially). Enhance state management using React Context or Redux to maintain narrative state, player stats, and inventory across components. Write tests to verify that the processing animations, audio cues, and state updates function correctly when API responses are processed."

Prompt 6: User Authentication & Customization Bio
Prompt:
"Implement user authentication and customization features. On the backend, create NestJS endpoints for user signup and login using email and password, and integrate JWT (or session-based) authentication. On the frontend, develop signup and login pages, along with a customization bio form that uses dropdowns for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, and Pacing/Difficulty. Ensure that the customization bio data is sent to and stored by the backend. Write tests for the authentication endpoints and validate the frontend form."


Prompt 7: Save/Load Functionality and Memory Management
Prompt:
"Develop save and load functionality for the game state. In the backend, create endpoints to handle manual save slots (at least three) and implement an autosave mechanism that triggers on major narrative events or every five turns. Enhance the narrative state JSON structure to support memory management, including event significance scoring and dynamic summarization of older events. On the frontend, add UI elements that allow users to trigger save and load actions and display progress indicators. Write tests to verify that save/load operations correctly store and retrieve the narrative state."

Prompt 8: Final Integration, Error Handling, and Monitoring
Prompt:
"Wire all components together to form a cohesive system. Ensure that every API call is wrapped with robust error handling that displays narrative-themed fallback messages if failures occur. Integrate logging and monitoring tools (such as Sentry or Datadog) on the backend to capture error metrics and performance data. Develop an admin dashboard that displays key metrics like response times, error rates, token usage, and active user counts. Write comprehensive end-to-end tests to validate the complete flow—from user input, through narrative processing, to state updates, authentication, and save/load functionality."


4. Conclusion
This iterative blueprint starts with a high-level plan, breaks it into manageable chunks, refines each chunk into detailed, small steps, and then provides a series of clear, test-driven prompts for a code-generation LLM. Each prompt builds on previous work and ensures there’s no orphaned or unintegrated code, prioritizing best practices, incremental progress, and early testing throughout the project.