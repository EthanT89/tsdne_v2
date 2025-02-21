// tsdne_v2/frontend/src/__tests__/MainLayout.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extra matchers
import MainLayout from "../components/MainLayout";

describe("MainLayout", () => {
  it("renders children in the narrative display area", () => {
    render(
      <MainLayout>
        <div>Test Narrative Content</div>
      </MainLayout>
    );
    expect(screen.getByText("Test Narrative Content")).toBeInTheDocument();
  });

  it("shows side panels by default", () => {
    render(
      <MainLayout>
        <div>Test Narrative Content</div>
      </MainLayout>
    );
    expect(screen.getByText("Player Stats")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
  });

  it("toggles side panels when the button is clicked", () => {
    render(
      <MainLayout>
        <div>Test Narrative Content</div>
      </MainLayout>
    );
    // The button should say 'Close Panels' initially
    const toggleButton = screen.getByRole("button", { name: /Close Panels/i });
    expect(toggleButton).toBeInTheDocument();

    // Click the button to hide the panels
    fireEvent.click(toggleButton);
    expect(screen.queryByText("Player Stats")).not.toBeInTheDocument();
    expect(screen.queryByText("Inventory")).not.toBeInTheDocument();

    // Now the button should say 'Open Panels'
    expect(screen.getByRole("button", { name: /Open Panels/i })).toBeInTheDocument();
  });
});
