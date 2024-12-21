"use client";
import Hero from "./_components/hero";
import Navbar from "./_components/Navbar";

export default function Home() {

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Trips", href: "/trips/all" }


  ];

  return (
    <div>

      <Navbar links={navLinks} />
      <Hero />
    
    </div>
  );
}

