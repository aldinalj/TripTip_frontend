import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isLoggedIn = !!sessionStorage.getItem("authToken");

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const links = [
    { label: "Trips", href: "/trips" },
    { label: "Budgets", href: "/budgets" },
    { label: "Spendings", href: "/spendings" },
    { label: "Lists", href: "/lists" },
    { label: "Activities", href: "/activities" },
    { label: "Currency", href: "/currency" },
    { label: "Weather", href: "/weather" },
  ];

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

      <div className="flex items-center gap-6">
        <nav className="hidden sm:flex gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-gray-300 hover:text-cyan-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block ml-6">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-cyan-900 text-white absolute top-16 left-0 right-0 p-4 z-50">
          <nav className="flex flex-col gap-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-cyan-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
