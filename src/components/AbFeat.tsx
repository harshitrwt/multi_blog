"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";  // Import useState and useEffect

export function AboutFeaturesSection() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <div
        className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 transition-transform duration-700 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 leading-tight">
            About BlogNest
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
            BlogNest empowers you to express yourself effortlessly. Write, share, and discover powerful stories that inspire and connect. Our platform fosters creativity and community with an intuitive interface designed for storytellers of all levels.
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
          className={`flex-1 max-w-md md:max-w-md rounded-lg overflow-hidden rotate-12 hover:rotate-0 shadow-lg shadow-white hover:shadow-blue-600 transition-transform duration-700 ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <img
            src="https://assets-cdn.wellhub.com/images/mep-cms/legacy_estee_janssens_hf5xg_X_Bfx5_Y_unsplash_scaled_e0b4a18d18.jpg?w=1024&q=70"
            alt="Blogging Inspiration"
            className="object rounded-xl cursor-pointer border-4 border-blue-600 shadow-3xl shadow-white dark:shadow-white"
          />
        </div>
      </div>

      <div
        className={`text-center max-w-4xl mx-auto space-y-12 transition-transform duration-700 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-12">
          Features
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 border-1">
          {[
            {
              title: "Easy Writing",
              description: "Seamlessly create and publish posts with our intuitive editor.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: "Powerful Sharing",
              description: "Share your stories across multiple categories and reach a wider audience.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: "Inspiration Hub",
              description: "Discover amazing content to spark your creativity every day.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: "User Profiles",
              description: "Manage your identity and connect with fellow bloggers easily.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: "Custom Categories",
              description: "Organize your posts with flexible categories tailored to your needs.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
            {
              title: "Responsive Design",
              description: "Enjoy a seamless experience on desktop, tablet, and mobile devices.",
              icon: <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            },
          ].map(({ title, description, icon }) => (
            <Card
              key={title}
              className={`p-6 rounded-xl shadow-lg cursor-pointer dark:border-1 dark:border-black shadow-gray-300 hover:shadow-blue-600 transition-transform duration-700 ease-out ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center mb-4 space-x-4">
                {icon}
                <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{title}</h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div
        className={`relative bg-blue-600 dark:bg-blue-500 py-16 mt-20 rounded-xl text-center overflow-hidden transition-transform duration-700 ease-out ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <span
          aria-hidden="true"
          className="absolute top-6 left-10 text-[6rem] md:text-[8rem] opacity-20 select-none pointer-events-none transform rotate-12"
        >
          😎
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-8 right-16 text-[7rem] md:text-[9rem] opacity-15 select-none pointer-events-none transform rotate-45"
        >
          📝
        </span>
        <span
          aria-hidden="true"
          className="absolute top-34 right-96 text-[5rem] md:text-[7rem] opacity-20 select-none pointer-events-none transform -rotate-45"
        >
          😁
        </span>

        <h2 className="relative text-white text-4xl font-extrabold mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Share Your Story with the World?
        </h2>
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
    </section>
  );
}
