'use client'
import MapSearch from "@/app/components/mapSearch/page";
import PropertyCard from "@/app/components/propertycard/page";
import { Property } from "@/app/models/page";
import React, { useEffect, useState } from "react";

const PostPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from the API
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center text-lg font-semibold text-gray-700">No posts available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Banner */}
      <div className="bg-blue-100 p-4 text-center text-lg font-semibold text-gray-700">
        <span>Annual rates dropped! Stay 12 months and enjoy furnished living at the price of unfurnished.</span>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Property Cards Section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">Furnished short-term apartments for rent in Atlanta</h2>
            </div>
            <div className="flex space-x-4 items-center">
              <select className="px-4 py-2 border rounded-md text-sm">
                <option>Sort by Availability</option>
                <option>Sort by Price</option>
              </select>
            </div>
          </div>

          {/* Property Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="group hover:scale-105 transition-all duration-300">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="h-full  bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <MapSearch />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
