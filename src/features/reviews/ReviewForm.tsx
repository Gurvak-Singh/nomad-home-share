import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/features/auth/useAuth";

interface ReviewFormProps {
  propertyId: string;
  onCancel: () => void;
  onSubmitSuccess: () => void;
}

const ReviewForm = ({ propertyId, onCancel, onSubmitSuccess }: ReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Category ratings
  const [categoryRatings, setCategoryRatings] = useState({
    cleanliness: 0,
    accuracy: 0,
    communication: 0,
    location: 0,
    value: 0
  });
  
  const handleCategoryRatingChange = (category: keyof typeof categoryRatings, value: number) => {
    setCategoryRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide an overall rating for your stay.",
        variant: "destructive"
      });
      return;
    }
    
    if (review.trim().length < 10) {
      toast({
        title: "Review too short",
        description: "Please provide more details about your experience.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all category ratings are provided
    const missingCategories = Object.entries(categoryRatings)
      .filter(([_, value]) => value === 0)
      .map(([key]) => key);
    
    if (missingCategories.length > 0) {
      toast({
        title: "Category ratings required",
        description: `Please rate the following: ${missingCategories.join(", ")}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your experience!",
      });
      
      onSubmitSuccess();
    }, 1500);
  };
  
  const renderStarRating = (
    currentRating: number, 
    onRatingChange: (rating: number) => void,
    onHover?: (rating: number) => void,
    hoverValue: number = 0
  ) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= (hoverValue || currentRating)
                ? "fill-current text-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onHover?.(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Write a review</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Overall rating</label>
          {renderStarRating(
            rating, 
            setRating, 
            setHoverRating, 
            hoverRating
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Rate specific categories</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Cleanliness</label>
              {renderStarRating(
                categoryRatings.cleanliness,
                (value) => handleCategoryRatingChange("cleanliness", value)
              )}
            </div>
            
            <div>
              <label className="block text-sm mb-1">Accuracy</label>
              {renderStarRating(
                categoryRatings.accuracy,
                (value) => handleCategoryRatingChange("accuracy", value)
              )}
            </div>
            
            <div>
              <label className="block text-sm mb-1">Communication</label>
              {renderStarRating(
                categoryRatings.communication,
                (value) => handleCategoryRatingChange("communication", value)
              )}
            </div>
            
            <div>
              <label className="block text-sm mb-1">Location</label>
              {renderStarRating(
                categoryRatings.location,
                (value) => handleCategoryRatingChange("location", value)
              )}
            </div>
            
            <div>
              <label className="block text-sm mb-1">Value</label>
              {renderStarRating(
                categoryRatings.value,
                (value) => handleCategoryRatingChange("value", value)
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block font-medium mb-2">Your review</label>
          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this property..."
            rows={5}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 10 characters required
          </p>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit review"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
