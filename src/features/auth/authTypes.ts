// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password?: string;
  isHost: boolean;
  bookings: Booking[];
  wishlist: WishlistItem[];
}

// Booking type
export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

// Wishlist item type
export interface WishlistItem {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  addedAt: string;
}

// Sample user data
export const mockUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    isHost: false,
    bookings: [] as Booking[],
    wishlist: [] as WishlistItem[]
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    isHost: true,
    bookings: [] as Booking[],
    wishlist: [] as WishlistItem[]
  }
];
