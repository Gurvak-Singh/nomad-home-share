import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/AuthContext";

interface WishlistButtonProps {
  propertyId: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "button";
}

// Mock wishlists
const mockWishlists = [
  { id: "w1", name: "Beach Getaways", count: 5 },
  { id: "w2", name: "Winter Escapes", count: 3 },
  { id: "w3", name: "City Breaks", count: 7 }
];

const WishlistButton = ({ 
  propertyId, 
  size = "md", 
  variant = "icon" 
}: WishlistButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveToWishlist = (wishlistId: string) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setIsDialogOpen(false);
      
      toast({
        title: "Saved to wishlist",
        description: "This property has been added to your wishlist.",
      });
    }, 800);
  };
  
  const handleCreateWishlist = () => {
    if (!newWishlistName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your wishlist.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setIsDialogOpen(false);
      setIsCreatingNew(false);
      setNewWishlistName("");
      
      toast({
        title: "Wishlist created",
        description: `"${newWishlistName}" has been created and this property has been added.`,
      });
    }, 800);
  };
  
  const handleToggleSave = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save properties to your wishlist.",
        variant: "destructive"
      });
      return;
    }
    
    if (isSaved) {
      setIsSaved(false);
      toast({
        title: "Removed from wishlist",
        description: "This property has been removed from your wishlist.",
      });
    } else {
      setIsDialogOpen(true);
    }
  };
  
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  
  const iconSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${sizeClasses[size]}`}
          onClick={handleToggleSave}
        >
          <Heart
            className={`${iconSize[size]} ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </Button>
      ) : (
        <Button
          variant={isSaved ? "default" : "outline"}
          className={isSaved ? "bg-red-500 hover:bg-red-600" : ""}
          onClick={handleToggleSave}
        >
          <Heart
            className={`mr-2 h-4 w-4 ${isSaved ? "fill-white text-white" : ""}`}
          />
          {isSaved ? "Saved" : "Save"}
        </Button>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save to wishlist</DialogTitle>
            <DialogDescription>
              Add this property to an existing wishlist or create a new one.
            </DialogDescription>
          </DialogHeader>
          
          {isCreatingNew ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Wishlist name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Dream Vacations"
                  value={newWishlistName}
                  onChange={(e) => setNewWishlistName(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreatingNew(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateWishlist}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create & Save"}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 py-4">
                {mockWishlists.map((wishlist) => (
                  <Button
                    key={wishlist.id}
                    variant="outline"
                    className="justify-between font-normal"
                    onClick={() => handleSaveToWishlist(wishlist.id)}
                    disabled={isSubmitting}
                  >
                    <span>{wishlist.name}</span>
                    <span className="text-gray-500 text-sm">{wishlist.count}</span>
                  </Button>
                ))}
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCreatingNew(true)}
                  disabled={isSubmitting}
                >
                  Create new wishlist
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WishlistButton;
