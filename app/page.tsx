"use client";
import Navbar from "./_components/Navbar";

export default function Home() {

  const navLinks = [
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "About", href: "/about" }

  ];


  return (
    <div>

      <Navbar links={navLinks} />
    
    </div>
  );
}

