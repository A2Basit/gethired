// Navbar.jsx
import { useAuth } from "../context/AuthProvider";
import companylogo from "../assets/images/companylogo.png";
import Button from "./Buttons";
import { useState } from "react";
const NavBar = () => {
  const { user, signOut, loading } = useAuth();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      if (error) {
        console.error("Sign out error:", error.message);
      } else {
        console.log("Sign out successful");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 z-50 bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="block w-[12rem] xl:mr-8">
          <img src={companylogo} width={190} height={40} alt="GetHired" />
        </a>
        <ul className="hidden lg:flex lg:mx-auto lg:bg-transparent">
          <li className="mr-6">
            <a
              href="/about"
              className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/jobPostings"
              className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
            >
              Find all jobs
            </a>
          </li>
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
          <Button
            className="hidden lg:flex"
            onClick={handleLogout}
            variant="primary"
            size="md"
          >
            Sign out
          </Button>
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
            <li className="py-2">
              <a
                href="/about"
                className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li className="py-2">
              <a
                href="/jobPostings"
                className="text-lg font-medium text-gray-600 transition-colors hover:text-blue-500"
              >
                Find all jobs
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
