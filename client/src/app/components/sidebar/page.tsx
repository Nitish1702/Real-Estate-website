"use client";
import {
  Calendar,
  Home,
  Inbox,
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import apiRequest from "@/app/lib/apiRequest";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "homepage",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "dashboardpage",
    icon: LayoutDashboardIcon,
  },
  {
    title: "See Posts",
    url: "postspage",
    icon: ListOrderedIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export const handleLogout = async () => {
  try {
    // Make an API call to the server to log out (clear cookies)
    const response = await apiRequest.post('/auth/logout');

    if (response.status === 200) {
      // Clear the localStorage on the client side
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('userDetails');

      // Redirect the user to the login page after logging out
      alert("Logged out successfully!");
      window.location.href = "loginpage"; // Use `window.location.href` to navigate on logout
    } else {
      alert("Failed to logout. Please try again.");
    }
  } catch (error) {
    console.error("Error logging out:", error);
    alert("An error occurred. Please try again.");
  }
};

export function AppSidebar() {
  // Initialize router and loggedIn state
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const isAuthenticated = localStorage.getItem("isLoggedin"); // your logic for checking if user is logged in
    if (isAuthenticated === "yes") {
      // Ensure it's a string comparison
      setLoggedIn(true); // Show logout option if user is authenticated
    }
  }, []); // Empty dependency array to run the effect only on component mount

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mt-16">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Render Logout if loggedIn is true */}
              {loggedIn ? (
                <SidebarMenuItem key="Logout">
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => {
                        setLoggedIn(false); // Update local state immediately
                        handleLogout(); // Perform logout API and redirection
                      }}
                      className="flex items-center space-x-2"
                    >
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                // Render Login if loggedIn is false
                <SidebarMenuItem key="Login">
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => router.push("loginpage")} // Use router.push for login redirection
                      className="flex items-center space-x-2"
                    >
                      <LogIn />
                      <span>Login</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
