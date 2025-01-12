'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UserInterface, Post, Transaction, Lodging } from "@/app/models/page";

const Dashboard = () => {
  const router = useRouter();

  // States for data
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [yourPosts, setYourPosts] = useState<Post[]>([]); // Separate state for user's posts
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentLodging, setCurrentLodging] = useState<Lodging | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isLoggedin'); // Check if user is logged in
    if (!isAuthenticated) {
      router.push('loginpage');  // Navigate to login page if not logged in
      return;
    } else {
      const userDetails = localStorage.getItem('userDetails');
      if (userDetails) {
        setUserData(JSON.parse(userDetails)); // Only parse if userDetails is not null
      }
    }

    // Fetch user data and other required info from the API
    const fetchData = async () => {
      try {
        // Fetch recently viewed posts
        const recentPostsRes = await axios.get('http://localhost:8800/api/posts/recent');  // Your API endpoint
        setRecentPosts(recentPostsRes.data);

        // Fetch user's posts
        const userPostsRes = await axios.get('http://localhost:8800/api/posts/user');  // Your API endpoint for user posts
        setYourPosts(userPostsRes.data);

        // Fetch current lodging details
        const lodgingRes = await axios.get('http://localhost:8800/api/lodging/current');  // Your API endpoint
        setCurrentLodging(lodgingRes.data);

        // Fetch transactions
        const transactionsRes = await axios.get('http://localhost:8800/api/transactions');  // Your API endpoint
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check cache before fetching
    const cachedRecentPosts = localStorage.getItem('recentPosts');
    if (cachedRecentPosts) {
      setRecentPosts(JSON.parse(cachedRecentPosts));
    }

    // Fetch data
    fetchData();
  }, [router]);

  // Cache recent posts if fetched
  useEffect(() => {
    if (recentPosts.length > 0) {
      localStorage.setItem('recentPosts', JSON.stringify(recentPosts));
    }
  }, [recentPosts]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-[100vw]">
      {/* Dashboard Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <a
            href="addpostpage"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create New Post
          </a>
        </div>

        {/* Main Content with 2 Columns */}
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Left Column (2/3 width) */}
          <div className="lg:w-2/3 space-y-6">
            {/* Profile Details */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Profile Details
              </h2>
              <div className="flex items-center space-x-4 mt-4">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={userData.profilePictureUrl || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
                <div>
                  <h3 className="text-lg font-semibold">{userData.name}</h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Recently Viewed
                </h2>
                <a
                  href="postspage"
                  className="px-4 py-2 inline text-blue-400 rounded-md"
                >
                  see more
                </a>
              </div>
              <ul className="mt-4 space-y-4">
                {recentPosts.length > 0 ? recentPosts.map((post, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{post.title}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                  </li>
                )) : <li>No Recently Viewed Posts</li>}
              </ul>
            </div>

            {/* Your Posts */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Posts
                </h2>
                <a
                  href="addpostpage"
                  className="px-4 py-2 inline text-blue-400 rounded-md"
                >
                  see more
                </a>
              </div>
              <ul className="mt-4 space-y-4">
                {yourPosts.length > 0 ? yourPosts.map((post, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{post.title}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </li>
                )) : <li>None Posts Uploaded</li>}
              </ul>
            </div>
          </div>

          {/* Right Column (1/3 width) */}
          <div className="lg:w-1/3 space-y-6">
            {/* Current Lodging */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Current Lodging
              </h2>
              <div className="mt-4">
                <p className="text-gray-600">Lodging Name: {currentLodging?.name || 'N/A'}</p>
                <p className="text-gray-600">Check-in Date: {currentLodging?.checkInDate || 'N/A'}</p>
                <p className="text-gray-600">Check-out Date: {currentLodging?.checkOutDate || 'N/A'}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800">
                  View Details
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Transactions
              </h2>
              <ul className="mt-4 space-y-4">
                {transactions.map((transaction, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{transaction.description}</span>
                    <span className={`text-${transaction.amount < 0 ? 'red' : 'green'}-600`}>
                      {transaction.amount < 0 ? '-' : '+'} ${Math.abs(transaction.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
