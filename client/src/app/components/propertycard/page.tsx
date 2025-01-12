"use client";
import path from "path";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles

export interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    type: "house" | "apartment" | "office" | "land";
    price: number;
    pictures: { id: string }[]; // Adjusted to reflect the structure
    description: string;
    userId: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    createdAt: string;
    updatedAt: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed for mobile detection
    };

    window.addEventListener("resize", checkIfMobile);
    checkIfMobile(); // Check on initial render

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Check if the property is valid
  if (!property || !property.pictures || !Array.isArray(property.pictures)) {
    return (
      <div className="min-w-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
        <p className="p-4 text-gray-500">Property details are unavailable.</p>
      </div>
    );
  }

  // Carousel settings
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3, // Shows 3 items for large screens
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2, // Shows 2 items for tablets
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 1, // Shows 1 item for tablets
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1, // Shows 1 item for mobile
    },
  };

  return (
    <div className="min-w-[300px] bg-white rounded-lg shadow-lg overflow-hidden">
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5s ease"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["mobile", "tablet"]} // Remove arrows for mobile/tablet
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {property.pictures.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:8800/images/${image.id.split("/").pop()}`} // Extract filename
              alt={`Property Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </div>
        ))}
      </Carousel>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
        <p className="text-gray-600">{property.description}</p>
        <div className="text-gray-500 text-sm mt-2">
          <p>{`${property.address}, ${property.city}, ${property.state}, ${property.country}, ${property.postalCode}`}</p>
          <p className="font-semibold text-lg text-gray-800 mt-2">
            ${property.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">Type: {property.type}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
