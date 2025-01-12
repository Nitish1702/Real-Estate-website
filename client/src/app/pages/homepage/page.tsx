"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InfoCard from "../../components/infocard/page";
import {
  FaBuilding,
  FaDollarSign,
  FaGlobe,
  FaHandshake,
  FaKey,
  FaSmile,
} from "react-icons/fa";
import Carousel from "@/app/components/carousel/page";
import PropertyCard from "@/app/components/propertycard/page";
import LoginPage from "../loginpage/page";
import { Property } from "@/app/models/page";

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/post/getPost"); // Adjust the endpoint as per your API
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="relative w-screen overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="h-screen w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="grid h-screen place-items-center">
          <div className="bg-white rounded-lg shadow-lg p-8 z-10 max-w-md text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome to RentalSpace
            </h1>
            <p className="text-gray-600 mb-6">
              Discover amazing features and benefits.
            </p>
            <Link href="loginpage">
              <div className="bg-blue-600 text-white py-2 px-6 rounded-md shadow hover:bg-blue-500 transition duration-300">
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Why RentalSpace for Business Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why RentalSpace?
          </h2>
          <p className="text-gray-600">
            Empower your business with solutions that combine cost-efficiency,
            flexibility, and unparalleled service.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<FaDollarSign className="text-blue-600 text-2xl" />}
              title="Cost Savings"
              description="Save 30–50% compared to premium hotels while enjoying luxurious accommodations for your team."
            />
            <InfoCard
              icon={<FaHandshake className="text-blue-600 text-2xl" />}
              title="Dedicated Support"
              description="Access a dedicated account manager to handle all your corporate housing needs seamlessly."
            />
            <InfoCard
              icon={<FaBuilding className="text-blue-600 text-2xl" />}
              title="Tailored Solutions"
              description="Customized housing options designed to meet your unique business requirements and preferences."
            />
            <InfoCard
              icon={<FaGlobe className="text-blue-600 text-2xl" />}
              title="Global Reach"
              description="Expand your business operations with accommodations in multiple cities worldwide."
            />
            <InfoCard
              icon={<FaKey className="text-blue-600 text-2xl" />}
              title="Convenience & Flexibility"
              description="Stay flexible with short-term and long-term stays, offering unmatched ease for your workforce."
            />
            <InfoCard
              icon={<FaSmile className="text-blue-600 text-2xl" />}
              title="Employee Satisfaction"
              description="Enhance employee comfort and productivity with fully furnished, well-equipped apartments."
            />
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="relative h-screen">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/real-estate-india.mp4"
          autoPlay
          muted
          loop
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-3xl w-full text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              What You Get
            </h2>
            <div className="h-full">
              <Carousel />
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="h-screen bg-gray-100">
        <h2 className="text-center text-4xl font-bold text-gray-800 py-10">
          Why RentalSpace for Business
        </h2>
        <div className="h-full relative">
          <div className="w-full h-full">
            <Carousel />
          </div>
        </div>
      </section>

      {/* Corporate Apartments Section */}
      <section className="py-20 bg-gray-50 scroll-smooth">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-10">
          Meticulously Furnished Corporate Apartments
        </h2>
        <div className="flex gap-6 overflow-x-auto px-4">
          {properties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-5xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} RentalSpace. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
