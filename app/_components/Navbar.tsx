import React, { useState } from "react";
import { INavbarProps } from "../_types/INavbarProps";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({ links }: INavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full flex justify-between items-center py-4 px-8 sm:px-16 bg-cyan-900 shadow-md">
     
      <div className="flex items-center">
        <Link href="/">
         
            <Image
              src="/triptip-logo.png"
              alt="TripTip Logo"
              width={120} 
              height={40} 
            />
        </Link>
      </div>

      <nav className="hidden sm:flex gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="text-gray-300 hover:text-cyan-600"
          >
            {link.label}
          </a>
        ))}
      </nav>


      
    </header>
  );
};

export default Navbar;
