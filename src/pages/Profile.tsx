import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567",
    bio: "I love traveling and experiencing new cultures. Always looking for unique stays!",
    address: "123 Main St, San Francisco, CA",
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type: 'email' | 'push' | 'sms', checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  // Sample booking history
  const bookings = [
    {
      id: "b1",
      property: "Luxury Beach Villa",
      dates: "Jun 15 - Jun 20, 2025",
      status: "Upcoming",
      price: "$1,250"
    },
    {
      id: "b2",
      property: "Mountain Cabin Retreat",
      dates: "Mar 10 - Mar 15, 2025",
      status: "Completed",
      price: "$780"
    },
    {
      id: "b3",
      property: "Downtown Loft",
      dates: "Jan 5 - Jan 8, 2025",
      status: "Completed",
      price: "$450"
    }
  ];

  // Sample wishlist
  const wishlist = [
    {
      id: "w1",
      name: "Beach Getaways",
      count: 5
    },
    {
      id: "w2",
      name: "Winter Escapes",
      count: 3
    },
    {
      id: "w3",
      name: "City Breaks",
      count: 7
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate("/")}>
          ← Back to home
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="relative mx-auto w-32 h-32 mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="rounded-full w-full h-full object-cover"
              />
              {user.isHost && (
                <span className="absolute bottom-0 right-0 bg-airbnb-red text-white text-xs px-2 py-1 rounded-full">
                  Host
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500 mb-4">{user.isHost ? 'Host' : 'Guest'} • Joined 2024</p>
            
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="bg-white rounded-lg shadow-md p-6 mt-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profileData.name} 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={profileData.phone} 
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={profileData.address} 
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      value={profileData.bio} 
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">About</h3>
                    <p className="text-gray-600 mt-2">{profileData.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Email:</span> {profileData.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Phone:</span> {profileData.phone}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Address:</span> {profileData.address}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Account Details</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Account Type:</span> {user.isHost ? 'Host' : 'Guest'}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Member Since:</span> January 2024
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Last Login:</span> Today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bookings" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h3 className="text-lg font-medium mb-4">Your Bookings</h3>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div>
                        <h4 className="font-medium">{booking.property}</h4>
                        <p className="text-gray-500 text-sm">{booking.dates}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 md:mt-0">
                        <span className={`px-2 py-1 rounded-full text-xs mr-4 ${
                          booking.status === 'Upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="font-medium">{booking.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You don't have any bookings yet.</p>
              )}
            </TabsContent>
            
            <TabsContent value="wishlist" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Your Wishlists</h3>
                <Button variant="outline" size="sm">Create New</Button>
              </div>
              
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlist.map(list => (
                    <div 
                      key={list.id} 
                      className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium">{list.name}</h4>
                        <p className="text-gray-500 text-sm">{list.count} properties</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You don't have any wishlists yet.</p>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-gray-500 text-sm">Receive booking updates and promotions</p>
                  </div>
                  <Switch 
                    checked={profileData.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-gray-500 text-sm">Receive alerts on your device</p>
                  </div>
                  <Switch 
                    checked={profileData.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-gray-500 text-sm">Receive text messages for important updates</p>
                  </div>
                  <Switch 
                    checked={profileData.notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    Connected Accounts
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Settings
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
