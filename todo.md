# TODO Checklist for "This Story Does Not Exist" Project

This checklist covers all key tasks for building the project. Each item represents a step or a group of related tasks. Check items off as you complete them to ensure thorough progress.

**Last Updated:** January 2025  
**Current Phase:** Immediate Fixes & Core Backend API  
**Overall Completion:** ~15%

---

## 0. Immediate Fixes (PRIORITY 1)
- [ ] **Frontend Build Fix**
  - [ ] Remove or replace Google Fonts dependency causing build failure
  - [ ] Verify frontend builds successfully
- [ ] **Backend Test Fix**
  - [ ] Update test expectation in app.controller.spec.ts to match actual output
  - [ ] Verify backend tests pass
- [ ] **Frontend Test Fix**
  - [ ] Fix jest.setup.js to use CommonJS syntax
  - [ ] Verify frontend tests run successfully

---

## 1. Project Setup & Scaffolding
- [x] **Monorepo Setup**
  - [x] Create a monorepo structure for both frontend and backend projects.
  - [x] Set up common configuration files and shared scripts.
- [x] **Frontend Setup (Next.js)**
  - [x] Initialize a Next.js project with TypeScript.
  - [x] Install and configure Tailwind CSS (create minimal configuration file).
  - [x] Establish a basic folder structure.
- [x] **Backend Setup (NestJS)**
  - [x] Initialize a NestJS project with TypeScript.
  - [x] Set up PostgreSQL connection using environment variables.
  - [x] Establish a basic folder structure.
- [x] **Concurrent Running**
  - [x] Add npm scripts to run both projects concurrently.
- [x] **Basic Testing**
  - [x] Write simple test files for both projects to verify they start correctly.

---

## 2. Basic Frontend UI Components
- [x] **Layout Integration**
  - [x] Wire components together into a main layout page (currently in single MainLayout component).
- [ ] **Component Separation** (Next Step)
  - [ ] Extract `NarrativeDisplay` component from MainLayout that fills the screen and displays narrative text.
  - [ ] Extract `InputArea` component from MainLayout with a text input field and placeholder for auto-suggestions.
  - [ ] Extract `SidePanel` components from MainLayout for displaying player stats (Health, Hunger, Thirst) and inventory.
- [ ] **Placeholders**
  - [ ] Add placeholders for processing animations and ambient audio.
- [x] **Unit Testing**
  - [x] Write basic unit tests for MainLayout component (needs fixes to run).
  - [ ] Add tests for individual components after separation.

---

## 3. Backend API & Core Functionality
- [ ] **API Endpoint**
  - [ ] Implement a NestJS controller with a POST endpoint `/process-turn`.
  - [ ] Define the API contract for accepting user commands.
- [ ] **Narrative State Schema**
  - [ ] Define the narrative state JSON schema (including narrative summary, event type, significance score, etc.).
- [ ] **Stubbed AI Processing**
  - [ ] Create a stub AI processing function that returns narrative text and a structured JSON block.
- [ ] **Event Significance**
  - [ ] Implement basic logic for event significance scoring.
- [ ] **Error Handling**
  - [ ] Add error handling (including retry mechanism for malformed responses).
- [ ] **Unit Testing**
  - [ ] Write unit tests for the controller and stub function to validate expected responses.

---

## 4. Frontend-Backend Integration
- [ ] **Input to API Connection**
  - [ ] Modify the `InputArea` component to send user commands to the `/process-turn` endpoint.
- [ ] **Display API Response**
  - [ ] Update the `NarrativeDisplay` component to render narrative text from the API response.
- [ ] **State Management**
  - [ ] Integrate a state management solution (React Context or Redux) to handle narrative state, player stats, and inventory.
- [ ] **Side Panels Update**
  - [ ] Ensure side panels update with stats and inventory from API responses.
- [ ] **Integration Testing**
  - [ ] Write integration tests to verify the complete flow from user input to UI update.

---

## 5. Advanced UI Features & State Management
- [ ] **Processing Feedback**
  - [ ] Implement narrative-themed animations to display while waiting for API responses.
  - [ ] Add ambient audio cues during processing.
- [ ] **Enhanced InputArea**
  - [ ] Improve the `InputArea` component to display context-sensitive auto-suggestions (static suggestions acceptable initially).
- [ ] **Advanced State Management**
  - [ ] Enhance state management for better tracking of narrative state, player stats, and inventory.
- [ ] **Testing UI Enhancements**
  - [ ] Write tests to confirm animations, audio cues, and state updates function as expected.

---

## 6. User Authentication & Customization
- [ ] **Authentication Endpoints (Backend)**
  - [ ] Create NestJS endpoints for user signup and login (using email/password).
  - [ ] Integrate JWT (or session-based) authentication.
- [ ] **Authentication UI (Frontend)**
  - [ ] Develop signup and login pages.
- [ ] **Customization Bio**
  - [ ] Implement a customization bio form with dropdowns for World Setting, Narrative Tone, Gameplay Style, Themes/Genres, and Pacing/Difficulty.
  - [ ] Wire the form to send data to and store it on the backend.
- [ ] **Authentication & Form Testing**
  - [ ] Write tests for authentication endpoints.
  - [ ] Validate frontend form validations with tests.

---

## 7. Save/Load Functionality & Memory Management
- [ ] **Save/Load Endpoints (Backend)**
  - [ ] Create endpoints for manual save slots (at least three).
  - [ ] Implement an autosave mechanism that triggers on major narrative events or every five turns.
- [ ] **Extend Narrative State**
  - [ ] Enhance the narrative state JSON structure to support memory management (event significance and dynamic summarization).
- [ ] **UI for Save/Load**
  - [ ] Create frontend UI elements to trigger save and load actions.
  - [ ] Add progress indicators for save/load operations.
- [ ] **Save/Load Testing**
  - [ ] Write tests to verify that save/load operations correctly store and retrieve the narrative state.

---

## 8. Final Integration, Error Handling & Monitoring
- [ ] **Full System Integration**
  - [ ] Wire all modules together to form a cohesive, integrated system.
- [ ] **Robust Error Handling**
  - [ ] Implement comprehensive error handling on every API call with narrative-themed fallback messages.
- [ ] **Logging & Monitoring**
  - [ ] Integrate logging and monitoring tools (e.g., Sentry or Datadog) on the backend.
- [ ] **Admin Dashboard**
  - [ ] Develop an admin/analytics dashboard to display key metrics (response times, error rates, token usage, active user counts).
- [ ] **End-to-End Testing**
  - [ ] Write comprehensive end-to-end tests covering the full user journey from input to narrative processing, state updates, authentication, and save/load.

---

## 9. Additional Tasks
- [ ] **Documentation**
  - [ ] Document code and project setup instructions.
  - [ ] Create developer and user documentation.
- [ ] **Code Reviews & Refactoring**
  - [ ] Schedule regular code reviews.
  - [ ] Refactor code as needed for clarity and maintainability.
- [ ] **Deployment**
  - [ ] Prepare deployment scripts for AWS/Kubernetes.
  - [ ] Verify deployment and perform final integration testing.
- [ ] **Future Enhancements Planning**
  - [ ] Plan additional features such as advanced AI integration, continuous adaptive narrative, dynamic ambient audio, and social sharing functionalities.

---

# End of Checklist

Use this `todo.md` as a running checklist to track your progress through the development phases. Check off each item as you complete it to ensure that all tasks are covered thoroughly.
