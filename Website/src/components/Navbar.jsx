import { useState } from "react"
import { Menu, X } from "lucide-react"
import {Button} from './component'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Services
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Category
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Article
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              About Us
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="white" className="text-sm">
              Sign In
            </Button>
            <Button variant="white">
              Sign Up
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1 bg-background/95">
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Services
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Category
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Article
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              About Us
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md"
            >
              Contact
            </a>
            <div className="pt-4 flex flex-col gap-2">
              <Button variant="white">
                Sign In
              </Button>
              <Button variant="white" >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

