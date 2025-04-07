import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  date: string;
  rating: number;
  content: string;
}

interface ReviewListProps {
  propertyId: string;
  onWriteReview?: () => void;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "r1",
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      location: "New York, USA"
    },
    date: "March 2025",
    rating: 5,
    content: "This place was absolutely stunning! The views were incredible and the host was very responsive. The kitchen was well-equipped and we loved the outdoor space. Would definitely stay here again!"
  },
  {
    id: "r2",
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      location: "Toronto, Canada"
    },
    date: "February 2025",
    rating: 4,
    content: "Great location and beautiful property. Very comfortable beds and the place was spotless. Only reason for 4 stars is that the WiFi was a bit slow during our stay, but everything else was perfect."
  },
  {
    id: "r3",
    author: {
      name: "Emma Garcia",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      location: "London, UK"
    },
    date: "January 2025",
    rating: 5,
    content: "We had an amazing stay! The place looks exactly like the photos, and the neighborhood is quiet yet close to everything. The host provided great local recommendations and was very accommodating with our check-in time."
  },
  {
    id: "r4",
    author: {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      location: "Sydney, Australia"
    },
    date: "December 2024",
    rating: 3,
    content: "The property itself is beautiful and as described. However, we had some issues with noise from construction nearby that wasn't mentioned in the listing. The host was apologetic and offered a partial refund, which was appreciated."
  },
  {
    id: "r5",
    author: {
      name: "Olivia Kim",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      location: "Seoul, South Korea"
    },
    date: "November 2024",
    rating: 5,
    content: "Perfect in every way! The space is beautifully designed, immaculately clean, and has all the amenities you could need. The location is ideal for exploring the city, and the host's guidebook had excellent recommendations."
  }
];

const ReviewList = ({ propertyId, onWriteReview }: ReviewListProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
  
  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
  mockReviews.forEach(review => {
    ratingDistribution[5 - review.rating]++;
  });
  
  // Convert to percentages
  const ratingPercentages = ratingDistribution.map(count => (count / mockReviews.length) * 100);
  
  // Display limited reviews initially
  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Star className="fill-current text-yellow-400 mr-2 h-5 w-5" />
          {averageRating.toFixed(1)} · {mockReviews.length} reviews
        </h2>
        <Button variant="outline" onClick={onWriteReview}>
          Write a review
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-10">{rating} stars</span>
              <Progress value={ratingPercentages[5 - rating]} className="h-2" />
              <span className="text-sm text-gray-500 w-8">
                {ratingDistribution[5 - rating]}
              </span>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">What guests are saying:</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cleanliness</span>
              <Progress value={95} className="h-2" />
              <span className="text-sm">4.8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Accuracy</span>
              <Progress value={90} className="h-2" />
              <span className="text-sm">4.5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Communication</span>
              <Progress value={98} className="h-2" />
              <span className="text-sm">4.9</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Location</span>
              <Progress value={85} className="h-2" />
              <span className="text-sm">4.3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Value</span>
              <Progress value={88} className="h-2" />
              <span className="text-sm">4.4</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 mt-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.author.avatar} alt={review.author.name} />
                <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <h4 className="font-medium">{review.author.name}</h4>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <span>{review.author.location}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
                
                <div className="flex items-center mt-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {mockReviews.length > 3 && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? "Show less reviews" : `Show all ${mockReviews.length} reviews`}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
