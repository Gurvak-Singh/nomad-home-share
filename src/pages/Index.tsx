
import Header from "@/components/Header";
import PropertyGrid from "@/components/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

// Mock data for property listings
const propertyListings = [
  {
    id: "1",
    title: "Modern Loft in Downtown",
    location: "Los Angeles, California",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
    ],
    price: 150,
    rating: 4.92,
    distance: "10 miles away",
    dates: "Nov 12-17",
  },
  {
    id: "2",
    title: "Beachfront Villa with Pool",
    location: "Miami, Florida",
    images: [
      "https://images.unsplash.com/photo-1440778303588-435521a205bc?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
    ],
    price: 329,
    rating: 4.85,
    distance: "Beach front",
    dates: "Dec 1-8",
  },
  {
    id: "3",
    title: "Rustic Cabin in the Woods",
    location: "Aspen, Colorado",
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800",
    ],
    price: 220,
    rating: 4.97,
    distance: "5 miles away",
    dates: "Jan 5-10",
  },
  {
    id: "4",
    title: "Urban Apartment with City View",
    location: "New York City, New York",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800",
    ],
    price: 275,
    rating: 4.8,
    distance: "Downtown",
    dates: "Oct 22-27",
  },
  {
    id: "5",
    title: "Lakeside Retreat with Dock",
    location: "Lake Tahoe, Nevada",
    images: [
      "https://images.unsplash.com/photo-1475087542963-13ab5e611954?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1533443144047-ea8b99828d5b?auto=format&fit=crop&w=800",
    ],
    price: 195,
    rating: 4.9,
    distance: "Lakeside",
    dates: "Nov 10-15",
  },
  {
    id: "6",
    title: "Historic Townhouse in Old Town",
    location: "Charleston, South Carolina",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800",
    ],
    price: 180,
    rating: 4.95,
    distance: "Historic district",
    dates: "Dec 5-10",
  },
];

// Property categories for filter
const propertyCategories = [
  { id: "beach", label: "Beach", icon: "🏖️" },
  { id: "mountains", label: "Mountains", icon: "⛰️" },
  { id: "cabin", label: "Cabins", icon: "🏡" },
  { id: "design", label: "Design", icon: "🏛️" },
  { id: "countryside", label: "Countryside", icon: "🌄" },
  { id: "camping", label: "Camping", icon: "⛺" },
  { id: "lake", label: "Lake", icon: "🚣" },
  { id: "city", label: "City", icon: "🏙️" },
  { id: "mansion", label: "Mansion", icon: "🏰" },
  { id: "treehouse", label: "Treehouse", icon: "🌳" },
];

// Trending properties (subset of all listings)
const trendingListings = propertyListings.slice(3, 6);

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [displayedProperties, setDisplayedProperties] = useState(propertyListings);

  // Filter properties when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setDisplayedProperties(propertyListings);
    } else {
      // In a real app, this would filter from API
      // For now, we just return a subset of the data
      setDisplayedProperties(
        propertyListings.filter((_, index) => index % 2 === (activeCategory === "beach" ? 0 : 1))
      );
    }
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pb-12">
        {/* Category navigation */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="overflow-x-auto property-slider py-4">
              <div className="flex gap-6 min-w-max">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActiveCategory("all")}
                >
                  All
                </Button>
                {propertyCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className="rounded-full flex items-center gap-2"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main listings */}
        <div className="mt-8">
          <PropertyGrid properties={displayedProperties} />
        </div>

        {/* Trending section */}
        <div className="mt-16">
          <PropertyGrid 
            title="Trending destinations" 
            subtitle="Popular places to stay around the world"
            properties={trendingListings}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-10 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>AirCover</li>
                <li>Safety information</li>
                <li>Supporting people with disabilities</li>
                <li>Cancellation options</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>Nomad Forum</li>
                <li>Referrals</li>
                <li>Gift cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2 text-sm">
                <li>Airbnb your home</li>
                <li>AirCover for Hosts</li>
                <li>Hosting resources</li>
                <li>Community forum</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nomad</h3>
              <ul className="space-y-2 text-sm">
                <li>Newsroom</li>
                <li>New features</li>
                <li>Careers</li>
                <li>Investors</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center mb-4 md:mb-0">
              <p className="text-sm">© 2025 Nomad, Inc.</p>
              <ul className="flex gap-4 text-sm">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">English (US)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
