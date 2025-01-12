"use client";
// Types for Post
export interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  postType: "vacancy" | "comingSoon" | "required";
  createdAt: string;
  updatedAt: string;
  pictures: string[]; // URLs to the images
  additionalText?: string;
  userId: string; // Reference to the user who posted
  propertyId?: string; // Optional reference to the property associated with the post
}
export interface Property {
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
}
// Types for User
export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string; // Store encrypted password (Do not store plain text password)
  profilePictureUrl?: string; // Optional profile picture
  bio?: string; // Optional bio
  role: "admin" | "user"; // Role of the user, can be extended
  createdAt: string;
  updatedAt: string;
}

// Type for creating a new Post (without an ID, to be used during creation)
export interface NewPost {
  title: string;
  description: string;
  price: number;
  postType: "vacancy" | "comingSoon" | "required";
  pictures: File[]; // For file upload
  additionalText?: string;
  userId: string;
  propertyId?: string;
}

// Type for creating a new Property (without an ID, to be used during creation)
export interface NewProperty {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  type: "house" | "apartment" | "office" | "land";
  price: number;
  pictures: File[]; // For file upload
  description: string;
  userId: string;
}
export interface infoCard {
  icon: React.ReactNode; // Pass an icon component or SVG
  title: string;
  description: string;
}

export interface Transaction {
  id: string;
  userId: string; // Reference to the user who made the transaction
  amount: number; // Positive or negative value representing the transaction amount
  description: string; // A brief description of the transaction
  transactionDate: string; // Timestamp of when the transaction occurred
  type: "credit" | "debit"; // Whether it's a credit or debit transaction
  balanceAfterTransaction: number; // The balance remaining after the transaction
}
export interface Lodging {
  id: string;
  userId: string; // Reference to the user who booked the lodging
  name: string; // Name of the lodging place
  address: string; // Address of the lodging
  checkInDate: string; // Date of check-in
  checkOutDate: string; // Date of check-out
  pricePerNight: number; // Price per night of the lodging
  totalPrice: number; // Total price for the stay (calculated based on the number of nights)
  status: "booked" | "canceled" | "completed"; // Current status of the lodging
  propertyId?: string; // Optional reference to a property if needed
}
