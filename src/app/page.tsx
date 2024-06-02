'use client'
import GamePage from "./gamePage";

export default function Home() {
  console.log("Home Page");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <GamePage />
    </main>
  );
}
