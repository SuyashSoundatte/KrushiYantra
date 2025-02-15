import { useState } from "react";
import { Link } from "react-router-dom";
import { MdCancel, MdMenuOpen } from "react-icons/md";
import { Button } from "./component";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-12 lg:py-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-semibold text-green-600 hover:text-green-700 transition duration-300"
              >
                KrushiYantra
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-12 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-green-600 hover:text-green-700 transition duration-300"
                >
                  <h1 className="text-[16px]">Help?</h1>
                </NavLink>
                <NavLink
                  to="/"
                  className="text-green-600 hover:text-green-700 transition duration-300"
                >
                  <h1 className="text-[16px]">About Us</h1>
                </NavLink>
                <NavLink
                  to="/"
                  className="text-green-600 hover:text-green-700 transition duration-300"
                >
                  {/* <h1 className="text-[16px]">Sign Up</h1>   */}
                  <Button buttonType="button" variant="success">
                    Sign Up
                  </Button>
                </NavLink>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <div className="text-2xl">
                    <MdCancel />
                  </div>
                ) : (
                  <div className="text-2xl">
                    <MdMenuOpen />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <MobileNavLink to="/" onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/" onClick={toggleMenu}>
                About Us
              </MobileNavLink>
              <MobileNavLink to="/" onClick={toggleMenu}>
                Sign Up
              </MobileNavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
  >
    {children}
  </Link>
);

export default Navbar;
