import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleGetStarted = () => {

    if (sessionStorage.getItem("authToken") !== null) {

      router.push("/trips");
    } else {

    router.push("/login")
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-800 text-white">
      <img
        src="/hero.jpg"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
      />

      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Welcome to TripTip!</h1>
        <p className="mt-4 text-lg md:text-2xl">Plan your next trip now:</p>
        <div className="mt-6 space-x-4">
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 text-lg font-medium text-white bg-cyan-900 bg-opacity-40 border border-white rounded hover:bg-opacity-60"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
