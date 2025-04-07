
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Heart, 
  Share, 
  Star, 
  Award, 
  Users, 
  Home, 
  Key, 
  Calendar as CalendarIcon,
  ChevronDown, 
  MapPin
} from "lucide-react";
import { format } from "date-fns";

// Mock property data
const property = {
  id: "1",
  title: "Modern Loft in Downtown",
  description: "This stunning downtown loft features floor-to-ceiling windows with panoramic city views, modern furnishings, and all the amenities you need for a comfortable stay. Located in the heart of the entertainment district, you'll be steps away from restaurants, shops, and attractions.",
  location: "Los Angeles, California",
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1581541234269-511399b9d6fb?auto=format&fit=crop&w=800"
  ],
  price: 150,
  rating: 4.92,
  reviews: 128,
  host: {
    name: "Sarah",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
    isSuperhost: true,
    joined: "January 2019"
  },
  amenities: [
    "Wifi",
    "Kitchen",
    "Free parking",
    "TV",
    "Air conditioning",
    "Washer/Dryer",
    "Pool",
    "Hot tub",
    "Gym"
  ],
  sleeps: 4,
  bedrooms: 2,
  beds: 2,
  baths: 2,
  cleaningFee: 75,
  serviceFee: 45,
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [guests, setGuests] = useState(1);

  // In a real app, we would fetch property details based on the ID
  useEffect(() => {
    console.log(`Fetching property with ID: ${id}`);
  }, [id]);

  const handleReservation = () => {
    console.log("Reservation submitted", {
      propertyId: id,
      date,
      guests,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 pb-12">
        {/* Property title */}
        <div className="mt-6 md:mt-8">
          <h1 className="text-2xl md:text-3xl font-semibold">{property.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span className="font-semibold">{property.rating}</span>
                <span className="mx-1">·</span>
                <span className="underline">{property.reviews} reviews</span>
              </div>
              <span className="mx-1">·</span>
              <div className="flex items-center">
                {property.host.isSuperhost && (
                  <>
                    <Award className="h-4 w-4 mr-1 text-airbnb-red" />
                    <span className="font-semibold">Superhost</span>
                    <span className="mx-1">·</span>
                  </>
                )}
                <span className="underline">{property.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 sm:mt-0">
              <Button variant="ghost" className="flex items-center gap-1 p-0 hover:bg-transparent">
                <Share className="h-4 w-4 mr-1" />
                <span className="underline">Share</span>
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-1 p-0 hover:bg-transparent"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart 
                  className={`h-4 w-4 mr-1 ${isLiked ? "fill-airbnb-red text-airbnb-red" : ""}`}
                />
                <span className="underline">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Property photos */}
        <div className="mt-6">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-3 ${showAllPhotos ? "grid-rows-auto" : "max-h-[500px] overflow-hidden"}`}>
            <div className="md:col-span-2 md:row-span-2 rounded-tl-xl md:rounded-bl-xl overflow-hidden">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block rounded-tr-xl overflow-hidden">
              <img 
                src={property.images[1]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block overflow-hidden">
              <img 
                src={property.images[2]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block overflow-hidden">
              <img 
                src={property.images[3]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block rounded-br-xl overflow-hidden">
              <img 
                src={property.images[4]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 rounded-lg"
            onClick={() => setShowAllPhotos(!showAllPhotos)}
          >
            {showAllPhotos ? "Show fewer photos" : "Show all photos"}
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Property details */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between pb-6 border-b">
              <div>
                <h2 className="text-xl md:text-2xl font-medium">
                  Entire rental unit hosted by {property.host.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span>{property.sleeps} guests</span>
                  <span>·</span>
                  <span>{property.bedrooms} bedrooms</span>
                  <span>·</span>
                  <span>{property.beds} beds</span>
                  <span>·</span>
                  <span>{property.baths} baths</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={property.host.image} 
                  alt={property.host.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2">
                  <Key className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-medium">Self check-in</h3>
                  <p className="text-muted-foreground">Check yourself in with the keypad.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-medium">{property.host.name} is a Superhost</h3>
                  <p className="text-muted-foreground">
                    Superhosts are experienced, highly rated hosts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-medium">Great location</h3>
                  <p className="text-muted-foreground">
                    95% of recent guests gave the location a 5-star rating.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 pb-6 border-b">
              <p className="text-base leading-relaxed">{property.description}</p>
            </div>

            {/* Sleeping arrangements */}
            <div className="mt-6 pb-6 border-b">
              <h2 className="text-xl font-medium mb-4">Where you'll sleep</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-6">
                  <Home className="h-6 w-6 mb-2" />
                  <h3 className="font-medium">Bedroom 1</h3>
                  <p className="text-sm text-muted-foreground">1 queen bed</p>
                </div>
                <div className="border rounded-lg p-6">
                  <Home className="h-6 w-6 mb-2" />
                  <h3 className="font-medium">Bedroom 2</h3>
                  <p className="text-sm text-muted-foreground">1 queen bed</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6 pb-6 border-b">
              <h2 className="text-xl font-medium mb-4">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                {property.amenities
                  .slice(0, showAllAmenities ? property.amenities.length : 6)
                  .map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Award className="h-5 w-5" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
              </div>
              {property.amenities.length > 6 && (
                <Button
                  variant="outline"
                  className="mt-4 rounded-lg"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? "Show fewer amenities" : "Show all amenities"}
                </Button>
              )}
            </div>
          </div>

          {/* Right column - Booking card */}
          <div className="lg:col-span-1">
            <div className="border rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xl font-semibold">${property.price}</span>
                  <span className="text-muted-foreground"> night</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{property.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="text-muted-foreground underline">{property.reviews} reviews</span>
                </div>
              </div>

              {/* Booking form */}
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 divide-y">
                  <div className="p-3">
                    <div className="text-xs font-semibold uppercase mb-1">Check-in date</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Add date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-semibold uppercase mb-1">Guests</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 rounded-full"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                        >
                          -
                        </Button>
                        <span className="w-4 text-center">{guests}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-6 w-6 rounded-full"
                          onClick={() => setGuests(Math.min(16, guests + 1))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-4 bg-airbnb-red hover:bg-airbnb-red/90"
                onClick={handleReservation}
              >
                Reserve
              </Button>

              <div className="mt-4 text-center text-sm">
                <span className="text-muted-foreground">You won't be charged yet</span>
              </div>

              {/* Price breakdown */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="underline">${property.price} x 5 nights</span>
                  <span>${property.price * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>${property.cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>${property.serviceFee}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>${property.price * 5 + property.cleaningFee + property.serviceFee}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetail;
