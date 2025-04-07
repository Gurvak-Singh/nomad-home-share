import { createContext, useState, ReactNode } from "react";
import { User, mockUsers } from "./authTypes";

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, "id" | "bookings" | "wishlist" | "isHost">) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message: string }>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false, message: "Not implemented" }),
  register: async () => ({ success: false, message: "Not implemented" }),
  logout: () => {},
  updateProfile: async () => ({ success: false, message: "Not implemented" }),
});

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user with matching email (case insensitive)
      const foundUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      // Check if user exists and password matches
      if (foundUser && foundUser.password === password) {
        // Set user state (excluding password)
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        return { success: true, message: "Login successful" };
      }

      return { success: false, message: "Invalid email or password" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  // Register function
  const register = async (userData: Omit<User, "id" | "bookings" | "wishlist" | "isHost">) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if email already exists
      const emailExists = mockUsers.some(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (emailExists) {
        return { success: false, message: "Email already in use" };
      }

      // Create new user (in a real app, this would be saved to a database)
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        bookings: [],
        wishlist: [],
        isHost: false,
      };

      // Set user state (excluding password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User);

      return { success: true, message: "Registration successful" };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "An error occurred during registration" };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        return { success: false, message: "User not authenticated" };
      }

      // Update user data
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: "An error occurred while updating profile" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the context for the hook file to use
export default AuthContext;
