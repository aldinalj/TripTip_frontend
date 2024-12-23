"use client";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Trips", href: "/trips" }


  ];

  return (
    <div>

      <Navbar links={navLinks} />
      <Hero />
    
    </div>
  );
}

