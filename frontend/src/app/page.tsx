// tsdne_v2/frontend/src/app/page.tsx
import MainLayout from "@/components/MainLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to Your AI Adventure</h1>
      <p className="mb-2">
        This is the Narrative Display Area. Every action you take will update
        this story. Feel free to explore, fight, or do whatever you like!
      </p>
      <p>
        Use the toggle button (top-right) to hide or show the side panels for a
        more immersive experience.
      </p>
    </MainLayout>
  );
};

export default Home;
