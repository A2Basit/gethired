import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import companylogo from "../assets/images/companylogo.png";
import Button from "./Buttons";

const NavBar = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      if (error) {
        console.error("Sign out error:", error.message);
      } else {
        console.log("Sign out successful");
        // Redirect to home page after successful logout
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const navItems = [
    { label: "About", href: "/about" },
    { label: "View All Jobs", href: "/jobPostings" },
    ...(user?.user_type === "job_seeker" ? [{ label: "Find all jobs", href: "/jobPostings" }] : []),
    ...(user?.user_type === "employer" ? [{ label: "Post a new job", href: "/EmployerDashboard" }] : []),
  ];

  return (
    <nav className="fixed top-0 z-50 bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="block w-[12rem] xl:mr-8">
          <img src={companylogo} width={190} height={40} alt="GetHired" />
        </a>
        
        <ul className="hidden lg:flex lg:mx-auto lg:bg-transparent">
          {navItems.map((item, index) => (
            <li key={index} className="mr-6">
              <a
                href={item.href}
                className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {!user && (
          <Button
            className="hidden lg:flex"
            href="/login"
            variant="primary"
            size="md"
          >
            Find/Post a job
          </Button>
        )}

        {user && (
          <div className="hidden lg:block relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <span className="text-gray-800">{user.name}</span>
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <a
                  href="/EmployerDashboard"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className="lg:hidden flex justify-center w-8 h-8 bg-gray-200 rounded-full"
          onClick={() => setOpenNavigation(!openNavigation)}
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {openNavigation && (
        <div className="lg:hidden bg-white shadow-md py-3">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="py-2 px-4">
                <a
                  href={item.href}
                  className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {user ? (
              <>
                <li className="py-2 px-4">
                  <a
                    href="/EmployerDashboard"
                    className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="py-2 px-4">
                  <button
                    onClick={handleLogout}
                    className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="py-2 px-4">
                <a
                  href="/login"
                  className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
                >
                  Find/Post a job
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;