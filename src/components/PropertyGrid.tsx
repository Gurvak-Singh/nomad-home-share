
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard, { PropertyProps } from "./PropertyCard";

interface PropertyGridProps {
  properties: PropertyProps[];
  title?: string;
  subtitle?: string;
}

const PropertyGrid = ({ properties, title, subtitle }: PropertyGridProps) => {
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('property-grid');
    if (container) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-semibold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      
      <div className="relative group">
        <div 
          id="property-grid" 
          className="grid grid-flow-col auto-cols-[minmax(270px,1fr)] gap-6 overflow-x-auto property-slider pb-8 snap-x snap-mandatory"
        >
          {properties.map((property) => (
            <div key={property.id} className="snap-start">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <Button
          onClick={() => scrollContainer('left')}
          variant="secondary"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white shadow-md hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => scrollContainer('right')}
          variant="secondary"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-white shadow-md hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PropertyGrid;
