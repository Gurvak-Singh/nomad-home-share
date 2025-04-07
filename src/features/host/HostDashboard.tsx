import { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the host dashboard
const mockListings = [
  {
    id: "l1",
    title: "Luxury Beach Villa",
    location: "Malibu, CA",
    price: 299,
    rating: 4.9,
    reviews: 28,
    occupancyRate: 85,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "l2",
    title: "Downtown Loft",
    location: "New York, NY",
    price: 199,
    rating: 4.7,
    reviews: 42,
    occupancyRate: 78,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "l3",
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 249,
    rating: 4.8,
    reviews: 19,
    occupancyRate: 65,
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  }
];

const mockBookings = [
  {
    id: "b1",
    listing: "Luxury Beach Villa",
    guest: "John Smith",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    status: "Confirmed",
    total: 1495
  },
  {
    id: "b2",
    listing: "Downtown Loft",
    guest: "Emma Johnson",
    checkIn: "Apr 22, 2025",
    checkOut: "Apr 25, 2025",
    status: "Pending",
    total: 597
  },
  {
    id: "b3",
    listing: "Mountain Cabin Retreat",
    guest: "Michael Chen",
    checkIn: "May 5, 2025",
    checkOut: "May 10, 2025",
    status: "Confirmed",
    total: 1245
  }
];

const mockEarningsData = [
  { month: 'Jan', earnings: 3200 },
  { month: 'Feb', earnings: 2800 },
  { month: 'Mar', earnings: 3500 },
  { month: 'Apr', earnings: 4200 },
  { month: 'May', earnings: 5100 },
  { month: 'Jun', earnings: 5800 },
  { month: 'Jul', earnings: 6500 },
  { month: 'Aug', earnings: 7200 },
  { month: 'Sep', earnings: 5900 },
  { month: 'Oct', earnings: 4800 },
  { month: 'Nov', earnings: 4200 },
  { month: 'Dec', earnings: 3800 },
];

const HostDashboard = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Calculate total earnings
  const totalEarnings = mockEarningsData.reduce((sum, month) => sum + month.earnings, 0);
  
  // Calculate average rating
  const avgRating = mockListings.reduce((sum, listing) => sum + listing.rating, 0) / mockListings.length;
  
  // Calculate average occupancy
  const avgOccupancy = mockListings.reduce((sum, listing) => sum + listing.occupancyRate, 0) / mockListings.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Host Dashboard</h1>
        <Button>Add New Listing</Button>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-green-500">+12% from last year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockListings.length}</div>
            <p className="text-xs text-green-500">+1 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}/5.0</div>
            <p className="text-xs text-green-500">+0.2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgOccupancy)}%</div>
            <p className="text-xs text-green-500">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="listings">
        <TabsList className="mb-6">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        {/* Listings Tab */}
        <TabsContent value="listings">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Card key={listing.id}>
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardHeader className="pb-2">
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>{listing.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium">${listing.price}/night</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-medium">{listing.rating} ({listing.reviews} reviews)</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Occupancy</span>
                    <span className="font-medium">{listing.occupancyRate}%</span>
                  </div>
                  <Progress value={listing.occupancyRate} className="h-2 mt-2" />
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button variant="outline" size="sm" className="flex-1">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add New Listing Card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center h-full min-h-[300px]">
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">+</span>
                </div>
                <h3 className="font-medium mb-2">Add New Listing</h3>
                <p className="text-gray-500 text-sm mb-4">
                  List your property and start earning
                </p>
                <Button>Get Started</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Manage your upcoming and recent bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Listing</th>
                      <th className="text-left py-3 px-4">Guest</th>
                      <th className="text-left py-3 px-4">Check-in</th>
                      <th className="text-left py-3 px-4">Check-out</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-4">{booking.listing}</td>
                        <td className="py-3 px-4">{booking.guest}</td>
                        <td className="py-3 px-4">{booking.checkIn}</td>
                        <td className="py-3 px-4">{booking.checkOut}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">${booking.total}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Earnings Tab */}
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>
                Your earnings for the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockEarningsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Earnings']}
                    />
                    <Bar dataKey="earnings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${totalEarnings.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Average Monthly
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${Math.round(totalEarnings / 12).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Highest Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $7,200
                    </div>
                    <p className="text-xs text-gray-500">August 2025</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
              <CardDescription>
                Manage your property availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="font-medium mb-4">Bookings for {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Selected Date'}</h3>
                  
                  {date && date.getDate() === 15 && date.getMonth() === 3 ? (
                    <div className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Luxury Beach Villa</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Check-in
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">John Smith • Apr 15 - Apr 20, 2025</p>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-500 text-sm">$1,495 total</span>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center p-8 border rounded-lg">
                      No bookings for this date
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-4">Manage Availability</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Block dates
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Set seasonal pricing
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Manage booking rules
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostDashboard;
