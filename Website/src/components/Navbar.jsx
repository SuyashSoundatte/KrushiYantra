import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./component";
import { Link } from "react-router-dom";
import FlowingMenu from "./Animated/FlowingMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu items for FlowingMenu
  const menuItems = [
    { link: "/", text: "Services", image: "/images/services.png" },
    { link: "/", text: "About Us", image: "/images/about.png" },
    { link: "/", text: "Contact Us", image: "/images/contact.png" },
    { link: "/auth/signin", text: "Sign In", image: "/images/login.png" },
    { link: "/auth/signup", text: "Sign Up", image: "/images/signup.png" },
  ];

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 bg-background/80 text-white font-['Navbar']">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 lg:py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold">KrushiYantra</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="xl:-ml-96 hidden md:flex md:items-center md:space-x-8">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Services
            </a>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About Us
            </a>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact Us
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="white">
              <Link to="/auth/signin">Sign In</Link>
            </Button>
            <Button variant="white">
              <Link to="/auth/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with FlowingMenu */}
      <div className="w-full p-1">
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 bg-green-800 h-fit flex flex-col items-center p-2 rounded-2xl">
            <div className="w-full ">
              <FlowingMenu items={menuItems} />
            </div>
            {/* <div className="pt-4 flex flex-col gap-2">
            <Button variant="white">
              <Link to="/auth/signup">Sign Up</Link>
            </Button>
            <Button variant="white">
              <Link to="/auth/signin">Sign In</Link>
            </Button>
          </div> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
