import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap mx-4">
          {/* Quick Links Column */}
          <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a
                  href="/home"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/register"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Register
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/login"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links Column */}
          <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
            <h5 className="text-lg font-bold mb-4">Company</h5>
            <ul className="list-none">
              <li className="mb-2">
                <a
                  href="/about"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contact"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Company Address Column */}
          <div className="w-full sm:w-1/3 px-4">
            <h5 className="text-lg font-bold mb-4">Company Address</h5>
            <p className="mb-2">123 Main St, Anytown, USA 12345</p>
            <p>info@company.com</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400">&copy; 2024 Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
