import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Globe, Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from './SearchBar';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg
              className="h-8 w-8 text-airbnb-red"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1.75C5.86 1.75 1.25 6.36 1.25 12.5S5.86 23.25 12 23.25 22.75 18.64 22.75 12.5 18.14 1.75 12 1.75zm0 8.5c1.52 0 2.75 1.23 2.75 2.75s-1.23 2.75-2.75 2.75-2.75-1.23-2.75-2.75 1.23-2.75 2.75-2.75z" />
            </svg>
            <span className="text-airbnb-red font-bold text-xl ml-2 hidden md:block">
              nomad
            </span>
          </Link>

          {/* Search Bar Button (Mobile Collapsed) */}
          <div className="md:flex-1 md:justify-center px-4 hidden md:flex">
            <Button 
              variant="outline" 
              className="shadow-md border-gray-200 rounded-full px-6 py-2 flex items-center gap-2 text-sm font-medium hover:shadow-lg"
              onClick={() => setShowSearch(true)}
            >
              <span>Anywhere</span>
              <span className="h-4 border-r border-gray-300"></span>
              <span>Any week</span>
              <span className="h-4 border-r border-gray-300"></span>
              <span className="text-gray-600">Add guests</span>
              <div className="bg-airbnb-red text-white rounded-full p-2">
                <Search className="h-4 w-4" />
              </div>
            </Button>
          </div>

          {/* Mobile Search Button */}
          <div className="flex md:hidden">
            <Button 
              variant="outline" 
              className="rounded-full px-4 py-2 shadow-sm"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search</span>
            </Button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm font-medium rounded-full hidden md:flex"
            >
              Airbnb your home
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="rounded-full flex items-center gap-2 border-gray-300 airbnb-profile-transition" 
                  size="sm"
                >
                  <Menu className="h-4 w-4" />
                  <div className="bg-gray-500 text-white rounded-full p-1">
                    <User className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 mt-2">
                <DropdownMenuItem className="font-medium cursor-pointer">
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Log in
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Airbnb your home
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/contact-us">Contact Us</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Expanded Search Modal */}
      {showSearch && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white/95 z-50 flex justify-center pt-20">
          <div className="w-full max-w-3xl px-4">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
