// tsdne_v2/frontend/src/components/MainLayout.tsx
"use client"; // If you’re using Next.js App Router, this ensures client-side rendering

import React, { useState } from "react";

/**
 * MainLayout Props:
 * - children: ReactNode displayed in the central narrative area.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [panelsOpen, setPanelsOpen] = useState(true);

  return (
    <div className="relative flex min-h-screen">
      {/* Left Side Panel */}
      {panelsOpen && (
        <aside className="hidden lg:block w-64 p-4">
          <h2 className="font-bold mb-2">Player Stats</h2>
          <ul className="space-y-1">
            <li>Health: 100</li>
            <li>Hunger: 50</li>
            <li>Thirst: 40</li>
          </ul>
        </aside>
      )}

      {/* Narrative Display (center) */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto p-4">{children}</div>
        {/* Input Area at bottom */}
        <div className="border-t border-gray-300 p-4">
          <input
            type="text"
            placeholder="Enter a command..."
            className="w-full p-2 border rounded"
          />
        </div>
      </main>

      {/* Right Side Panel */}
      {panelsOpen && (
        <aside className="hidden lg:block w-64 bg-gray-200 p-4">
          <h2 className="font-bold mb-2">Inventory</h2>
          <ul className="space-y-1">
            <li>Short Sword</li>
            <li>Wooden Shield</li>
            <li>Healing Potion</li>
          </ul>
        </aside>
      )}

      {/* Toggle Button (top-right corner) */}
      <button
        onClick={() => setPanelsOpen((prev) => !prev)}
        className="absolute top-4 right-4 px-3 py-1 rounded bg-gray-300 text-sm hover:bg-gray-400"
      >
        {panelsOpen ? "Close Panels" : "Open Panels"}
      </button>
    </div>
  );
}
