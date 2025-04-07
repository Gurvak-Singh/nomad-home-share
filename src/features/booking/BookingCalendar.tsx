import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format, isSameDay, isWithinInterval } from "date-fns";

interface BookingCalendarProps {
  propertyId: string;
  onBookingComplete?: () => void;
}

// Mock unavailable dates
const generateUnavailableDates = () => {
  const today = new Date();
  const unavailableDates = [];
  
  // Add some random unavailable dates
  for (let i = 1; i < 60; i += 3) {
    if (Math.random() > 0.7) {
      const startDate = addDays(today, i);
      const endDate = addDays(startDate, Math.floor(Math.random() * 3) + 1);
      unavailableDates.push({ start: startDate, end: endDate });
    }
  }
  
  return unavailableDates;
};

const BookingCalendar = ({ propertyId, onBookingComplete }: BookingCalendarProps) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [isBooking, setIsBooking] = useState(false);
  
  // Mock unavailable dates
  const unavailableDates = generateUnavailableDates();
  
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(range => 
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const handleBooking = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Select dates",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      
      toast({
        title: "Booking confirmed!",
        description: `Your stay is booked from ${format(dateRange.from, 'MMM dd, yyyy')} to ${format(dateRange.to, 'MMM dd, yyyy')}.`,
      });
      
      onBookingComplete?.();
    }, 1500);
  };

  // Calculate total nights and price
  const calculateTotalNights = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const totalNights = calculateTotalNights();
  const pricePerNight = 149;
  const totalPrice = totalNights * pricePerNight;
  const serviceFee = Math.round(totalPrice * 0.12);
  const grandTotal = totalPrice + serviceFee;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Select your dates</h3>
        
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange as any}
          numberOfMonths={2}
          disabled={(date) => {
            // Disable dates in the past or unavailable dates
            return date < new Date() || isDateUnavailable(date);
          }}
          className="rounded-md border"
        />
      </div>
      
      {(dateRange.from && dateRange.to) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Price details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>${pricePerNight} × {totalNights} nights</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>${serviceFee}</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-medium">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-6" 
            onClick={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? "Processing..." : "Reserve"}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            You won't be charged yet
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
