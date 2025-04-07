
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  images: string[];
  price: number;
  rating: number;
  dates?: string;
  distance?: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  images,
  price,
  rating,
  dates,
  distance,
}: PropertyProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group flex flex-col">
      {/* Image carousel */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-2">
        <Link to={`/property/${id}`} className="block w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Nav dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full opacity-70",
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Prev/Next buttons - Only visible on hover */}
        {images.length > 1 && (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-white/80 hover:bg-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-white/80 hover:bg-white"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </>
        )}

        {/* Save button */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-transparent p-2 hover:bg-transparent z-10"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked ? "fill-airbnb-red text-airbnb-red" : "text-white stroke-[2.5px]"
            )}
          />
        </Button>
      </div>

      {/* Property info */}
      <Link to={`/property/${id}`} className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base">{title}</h3>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{location}</p>
        {dates && <p className="text-muted-foreground text-sm">{dates}</p>}
        {distance && <p className="text-muted-foreground text-sm">{distance}</p>}
        <p className="mt-1">
          <span className="font-medium">${price}</span>{" "}
          <span className="text-muted-foreground">night</span>
        </p>
      </Link>
    </div>
  );
};

export default PropertyCard;
