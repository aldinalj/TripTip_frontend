"use client";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";

export default function Home() {

  const navLinks = [
    { label: "Trips", href: "/trips" },
    { label: "Budgets", href: "/budgets" },
    { label: "Spendings", href: "/spendings" },
    { label: "Lists", href: "/lists" },
    { label: "Activities", href: "/trips" }

  ];

  return (
    <div>

      <Navbar links={navLinks} />
      <Hero />
    
    </div>
  );
}

