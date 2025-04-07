
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [searchType, setSearchType] = useState<string>("stays");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState<number>(1);

  const handleSearch = () => {
    console.log({
      searchType,
      location,
      date,
      guests,
    });
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 animate-fade-in relative">
      {/* Close button */}
      {onClose && (
        <Button 
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {/* Search tabs */}
      <Tabs defaultValue={searchType} onValueChange={setSearchType} className="mb-6">
        <TabsList className="grid grid-cols-2 w-full max-w-[300px] mx-auto">
          <TabsTrigger value="stays">Stays</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-4">
        {/* Where */}
        <div className="space-y-1">
          <label htmlFor="location" className="text-sm font-medium">
            Where
          </label>
          <Input
            id="location"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg"
          />
        </div>
        
        {/* When */}
        <div className="space-y-1">
          <label className="text-sm font-medium">When</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal border rounded-lg"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
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
        
        {/* Guests */}
        <div className="space-y-1">
          <label htmlFor="guests" className="text-sm font-medium">
            Who
          </label>
          <div className="flex items-center gap-4">
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="rounded-lg"
            />
            <span className="text-sm">
              {guests === 1 ? "guest" : "guests"}
            </span>
          </div>
        </div>
        
        {/* Search button */}
        <Button 
          onClick={handleSearch}
          className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
