"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <section className="flex flex-col items-center justify-center max-w-6xl mx-auto px-6 py-20">
      <div
        className={`max-w-4xl text-center mb-10 transition-transform duration-700 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="md:text-[7vh] text-[4vh] font-extrabold mb-4 mt-18 leading-tight">
          "One Thought is All it Takes 😉"
        </h1>
        <p className="md:text-lg text-sm text-gray-900 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Write, share powerful stories across categories.<br></br> Discover inspiration and showcase your voice with ease.
        </p>
        <SignedIn>
          <button
            className="bg-blue-600 text-white font-bold py-3 px-10 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </SignedIn>
        <SignedOut>
          <button
            className="bg-gray-400 cursor-not-allowed text-white font-bold py-3 px-10 rounded-full shadow-lg"
            disabled
          >
            Sign In to Get Started
          </button>
        </SignedOut>
      </div>

      <div
        className={`w-full max-w-5xl rounded-lg overflow-hidden transition-transform duration-700 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } shadow-3xl dark:shadow-[0_0_40px_rgba(255,255,255,0.2)]`}
      >
        <video
          className="w-full h-auto object-cover rounded-lg border-4 border-blue-600"
          autoPlay
          loop
          muted
          playsInline
          draggable={false}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
