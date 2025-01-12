"use client";
import { useState, FormEvent, useEffect, useRef } from "react";
import MapPicker from "../../components/map/page"; // Adjust path if necessary
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import upload from "../../../../../server/config/multerConfig"; // Adjust path if necessary

interface Coordinates {
  lat: number;
  lng: number;
}

interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  type: "house" | "apartment" | "office" | "land";
  price: string;
  location: {
    type: string;
    coordinates: [number, number]; // Longitude, Latitude
  };
  pictures: FileList | null;
  description: string;
  phone: string; // Initialize phone number
}

const countryCodes = [
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "India" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  // Add more as needed
];

const AddPropertyPage = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    type: "house",
    price: "",
    location: {
      type: "",
      coordinates: [0, 0], // Longitude, Latitude
    },
    pictures: null,
    description: "",
    phone: "", // Initialize phone number
  });
  
  const [selectedLocation, setSelectedLocation] = useState<Coordinates>({ lat: 0, lng: 0 });
  const [countryCode, setCountryCode] = useState("");
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleLocationSelect = (coordinates: Coordinates) => {
    setSelectedLocation(coordinates);
    setFormData({
      ...formData,
      location: {
        type: "Point",
        coordinates: [coordinates.lat, coordinates.lng], // Longitude, Latitude
      },
    });
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      pictures: e.target.files,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("postalCode", formData.postalCode);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("phone", countryCode + formData.phone);

    const locationData = {
      type: "Point",
      coordinates: [selectedLocation.lng, selectedLocation.lat], // Longitude, Latitude
    };

    formDataToSend.append("location", JSON.stringify(locationData)); // Append as JSON

    if (formData.pictures) {
      Array.from(formData.pictures).forEach((file) => {
        formDataToSend.append("pictures", file);
      });
    }

    try {
      const currentUser = localStorage.getItem("userDetails");
      const userId = currentUser ? JSON.parse(currentUser)?.id : "";
      if (!userId) {
        alert("Log In before adding a post");
      }
      formDataToSend.append("userID", userId);
      console.log(formDataToSend);

      const response = await fetch("http://localhost:8800/api/post/addPost", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Property added successfully!");
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          country: "",
          postalCode: "",
          type: "house",
          price: "",
          location: {
            type: "",
            coordinates: [0, 0], // Longitude, Latitude
          },
          pictures: null,
          description: "",
          phone: "", // Initialize phone number
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("An error occurred while submitting the property.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex items-center justify-center w-[100vw]">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 bg-white rounded-lg shadow-xl border border-gray-200 p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Add New Property
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="md:flex gap-x-4 w-full">
            {/* Property Name */}
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">Property Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter property name"
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter address"
                required
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="flex flex-col w-full">
            <label htmlFor="location"               className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >Coordinates- `${selectedLocation.lat} ${selectedLocation.lng}`</label>
            
          </div>

          {/* Map Picker */}
          <div className="h-[40vh] md:w-full lg:w-full bg-white rounded-lg shadow-xl border border-gray-200 p-2 space-y-6">
            <MapPicker  onLocationSelect={handleLocationSelect} />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter city"
              required
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter state"
              required
            />
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter country"
              required
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter postal code"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Phone Number</label>
            <div className="flex items-center">
              {/* Country Code Dropdown */}
              <select
                name="countryCode"
                value={countryCode}
                onChange={handleCountryCodeChange}
                className="p-4 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select>

              {/* Phone Number Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 p-4 rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Property Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="office">Office</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-2 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={4}
              placeholder="Enter a description of the property"
              required
            ></textarea>
          </div>

          {/* Pictures */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Upload Pictures</label>
            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleFileChange}
              className="mt-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {formData.pictures && (
              <div className="mt-2 text-gray-600">
                {Array.from(formData.pictures).map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
