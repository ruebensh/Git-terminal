import React from 'react';
import { Hero } from '../components/Hero';
import { Navbar } from '../components/Navbar';

export function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
    </div>
  );
}
