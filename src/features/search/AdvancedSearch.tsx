import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search, X } from "lucide-react";
import { format } from "date-fns";

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
}

const propertyTypes = [
  { id: "house", label: "House" },
  { id: "apartment", label: "Apartment" },
  { id: "guesthouse", label: "Guesthouse" },
  { id: "hotel", label: "Hotel" },
  { id: "cabin", label: "Cabin" },
  { id: "villa", label: "Villa" },
  { id: "condo", label: "Condo" },
  { id: "cottage", label: "Cottage" },
];

const amenities = [
  { id: "wifi", label: "WiFi" },
  { id: "kitchen", label: "Kitchen" },
  { id: "washer", label: "Washer" },
  { id: "dryer", label: "Dryer" },
  { id: "ac", label: "Air conditioning" },
  { id: "heating", label: "Heating" },
  { id: "pool", label: "Pool" },
  { id: "hot_tub", label: "Hot tub" },
  { id: "free_parking", label: "Free parking" },
  { id: "gym", label: "Gym" },
  { id: "tv", label: "TV" },
  { id: "iron", label: "Iron" },
  { id: "workspace", label: "Workspace" },
  { id: "bbq", label: "BBQ grill" },
  { id: "fireplace", label: "Fireplace" },
];

const AdvancedSearch = ({ onSearch }: AdvancedSearchProps) => {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [instantBook, setInstantBook] = useState(false);
  const [superhost, setSuperhost] = useState(false);
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handlePropertyTypeChange = (propertyType: string, checked: boolean) => {
    if (checked) {
      setSelectedPropertyTypes([...selectedPropertyTypes, propertyType]);
    } else {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(type => type !== propertyType));
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const handleGuestChange = (type: keyof typeof guests, value: number) => {
    if (value >= 0) {
      setGuests({ ...guests, [type]: value });
    }
  };

  const handleSearch = () => {
    // Update active filters
    const filters = [];
    
    if (location) filters.push("Location");
    if (dateRange.from && dateRange.to) filters.push("Dates");
    if (guests.adults + guests.children > 1) filters.push("Guests");
    if (priceRange[0] > 50 || priceRange[1] < 500) filters.push("Price");
    if (selectedPropertyTypes.length > 0) filters.push("Property Type");
    if (selectedAmenities.length > 0) filters.push("Amenities");
    if (instantBook) filters.push("Instant Book");
    if (superhost) filters.push("Superhost");
    
    setActiveFilters(filters);
    setIsFiltersOpen(false);
    
    // Call the search function with all filters
    onSearch({
      location,
      dateRange,
      guests,
      priceRange,
      propertyTypes: selectedPropertyTypes,
      amenities: selectedAmenities,
      instantBook,
      superhost,
    });
  };

  const clearFilters = () => {
    setLocation("");
    setDateRange({ from: undefined, to: undefined });
    setGuests({ adults: 1, children: 0, infants: 0, pets: 0 });
    setPriceRange([50, 500]);
    setSelectedPropertyTypes([]);
    setSelectedAmenities([]);
    setInstantBook(false);
    setSuperhost(false);
    setActiveFilters([]);
    
    onSearch({});
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="bg-white rounded-full shadow-md border border-gray-200 flex items-center p-2 mb-4">
        <div className="flex-1 px-4">
          <Input
            type="text"
            placeholder="Where are you going?"
            className="border-none shadow-none focus-visible:ring-0 h-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="h-8 border-r border-gray-300 mx-2"></div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-10 px-4">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d")
                )
              ) : (
                "Any week"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange as any}
              numberOfMonths={2}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <div className="h-8 border-r border-gray-300 mx-2"></div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-10 px-4">
              {guests.adults + guests.children > 0 ? (
                <>
                  {guests.adults + guests.children} {guests.adults + guests.children === 1 ? "guest" : "guests"}
                  {guests.infants > 0 && `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}`}
                  {guests.pets > 0 && `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}`}
                </>
              ) : (
                "Add guests"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-gray-500">Ages 13+</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("adults", guests.adults - 1)}
                    disabled={guests.adults <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("adults", guests.adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Children</p>
                  <p className="text-sm text-gray-500">Ages 2-12</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("children", guests.children - 1)}
                    disabled={guests.children <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("children", guests.children + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Infants</p>
                  <p className="text-sm text-gray-500">Under 2</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("infants", guests.infants - 1)}
                    disabled={guests.infants <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.infants}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("infants", guests.infants + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pets</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("pets", guests.pets - 1)}
                    disabled={guests.pets <= 0}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests.pets}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGuestChange("pets", guests.pets + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button onClick={handleSearch} className="ml-2 rounded-full">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Button
          variant={isFiltersOpen ? "default" : "outline"}
          className="rounded-full"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Filters
        </Button>
        
        {activeFilters.map((filter) => (
          <Button
            key={filter}
            variant="outline"
            className="rounded-full"
          >
            {filter}
          </Button>
        ))}
        
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            className="rounded-full text-sm"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
      
      {/* Advanced Filters Panel */}
      {isFiltersOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsFiltersOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="price">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price" className="space-y-4">
              <div>
                <Label className="mb-2 block">Price range</Label>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="min-price">Min Price</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 mr-1">$</span>
                      <Input
                        id="min-price"
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <div className="border-t w-6 border-gray-300"></div>
                  <div>
                    <Label htmlFor="max-price">Max Price</Label>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 mr-1">$</span>
                      <Input
                        id="max-price"
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="type" className="space-y-4">
              <div>
                <Label className="mb-2 block">Property type</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {propertyTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`border rounded-lg p-4 cursor-pointer hover:border-black transition-colors ${
                        selectedPropertyTypes.includes(type.id) ? "border-black" : ""
                      }`}
                      onClick={() => handlePropertyTypeChange(
                        type.id, 
                        !selectedPropertyTypes.includes(type.id)
                      )}
                    >
                      <div className="text-xl mb-2">
                        {type.id === "house" && "🏠"}
                        {type.id === "apartment" && "🏢"}
                        {type.id === "guesthouse" && "🏡"}
                        {type.id === "hotel" && "🏨"}
                        {type.id === "cabin" && "🌲"}
                        {type.id === "villa" && "🏛️"}
                        {type.id === "condo" && "🏙️"}
                        {type.id === "cottage" && "🏕️"}
                      </div>
                      <div className="font-medium">{type.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4">
              <div>
                <Label className="mb-2 block">Amenities</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => 
                          handleAmenityChange(amenity.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={amenity.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="more" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instant-book"
                    checked={instantBook}
                    onCheckedChange={(checked) => setInstantBook(checked as boolean)}
                  />
                  <div>
                    <label
                      htmlFor="instant-book"
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Instant Book
                    </label>
                    <p className="text-sm text-gray-500">
                      Book without waiting for host approval
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="superhost"
                    checked={superhost}
                    onCheckedChange={(checked) => setSuperhost(checked as boolean)}
                  />
                  <div>
                    <label
                      htmlFor="superhost"
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Superhost
                    </label>
                    <p className="text-sm text-gray-500">
                      Stay with recognized hosts
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Label htmlFor="sort-by">Sort by</Label>
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: low to high</SelectItem>
                      <SelectItem value="price-high">Price: high to low</SelectItem>
                      <SelectItem value="rating">Top rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button variant="outline" onClick={clearFilters}>
              Clear all
            </Button>
            <Button onClick={handleSearch}>
              Show results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
