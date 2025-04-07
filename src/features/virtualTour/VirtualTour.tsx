import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Maximize2, MinusCircle, PlusCircle, RotateCcw } from "lucide-react";

interface VirtualTourProps {
  propertyId: string;
  propertyName: string;
}

// Mock panorama images for the virtual tour
const mockPanoramas = [
  {
    id: "living",
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    hotspots: [
      { id: "h1", x: 30, y: 50, target: "kitchen", label: "Kitchen" },
      { id: "h2", x: 70, y: 50, target: "bedroom", label: "Bedroom" }
    ]
  },
  {
    id: "kitchen",
    name: "Kitchen",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    hotspots: [
      { id: "h3", x: 20, y: 50, target: "living", label: "Living Room" },
      { id: "h4", x: 80, y: 50, target: "dining", label: "Dining Area" }
    ]
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    hotspots: [
      { id: "h5", x: 30, y: 50, target: "living", label: "Living Room" },
      { id: "h6", x: 70, y: 50, target: "bathroom", label: "Bathroom" }
    ]
  },
  {
    id: "bathroom",
    name: "Bathroom",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    hotspots: [
      { id: "h7", x: 50, y: 50, target: "bedroom", label: "Bedroom" }
    ]
  },
  {
    id: "dining",
    name: "Dining Area",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    hotspots: [
      { id: "h8", x: 30, y: 50, target: "kitchen", label: "Kitchen" },
      { id: "h9", x: 70, y: 50, target: "living", label: "Living Room" }
    ]
  }
];

// Mock floor plan data
const mockFloorPlan = {
  image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
  rooms: [
    { id: "living", name: "Living Room", x: 30, y: 40, width: 25, height: 30 },
    { id: "kitchen", name: "Kitchen", x: 60, y: 40, width: 20, height: 20 },
    { id: "bedroom", name: "Bedroom", x: 30, y: 75, width: 20, height: 20 },
    { id: "bathroom", name: "Bathroom", x: 55, y: 75, width: 15, height: 15 },
    { id: "dining", name: "Dining Area", x: 75, y: 65, width: 15, height: 15 }
  ]
};

const VirtualTour = ({ propertyId, propertyName }: VirtualTourProps) => {
  const [activePanorama, setActivePanorama] = useState(mockPanoramas[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const handlePanoramaChange = (panoramaId: string) => {
    const panorama = mockPanoramas.find(p => p.id === panoramaId);
    if (panorama) {
      setActivePanorama(panorama);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 2) {
      setZoomLevel(prev => prev + 0.1);
    } else if (direction === 'out' && zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.1);
    }
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRoomHover = (roomId: string | null) => {
    setActiveRoom(roomId);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">Virtual Tour: {propertyName}</h2>
        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
      
      <Tabs defaultValue="360tour" className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="360tour">360° Tour</TabsTrigger>
            <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="360tour" className="p-0">
          <div className="relative">
            {/* Panorama View */}
            <div 
              className="relative w-full h-[50vh] overflow-hidden bg-gray-100"
              style={{ 
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <img 
                src={activePanorama.image} 
                alt={activePanorama.name}
                className="w-full h-full object-cover"
              />
              
              {/* Hotspots */}
              {activePanorama.hotspots.map(hotspot => (
                <div 
                  key={hotspot.id}
                  className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  onClick={() => handlePanoramaChange(hotspot.target)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="absolute w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {hotspot.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
              <Button variant="ghost" size="icon" onClick={() => handleZoom('out')}>
                <MinusCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleZoom('in')}>
                <PlusCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleRotate}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Room Navigation */}
          <div className="p-4">
            <h3 className="font-medium mb-2">Navigate Rooms</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {mockPanoramas.map(panorama => (
                <Card 
                  key={panorama.id}
                  className={`flex-shrink-0 cursor-pointer ${
                    activePanorama.id === panorama.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handlePanoramaChange(panorama.id)}
                >
                  <CardContent className="p-2">
                    <div className="w-24 h-24 relative overflow-hidden rounded-md">
                      <img 
                        src={panorama.image} 
                        alt={panorama.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center text-sm mt-1">{panorama.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="floorplan" className="p-4">
          <div className="relative w-full h-[50vh] bg-gray-100 overflow-hidden">
            <img 
              src={mockFloorPlan.image} 
              alt="Floor Plan"
              className="w-full h-full object-contain"
            />
            
            {/* Interactive Floor Plan Rooms */}
            {mockFloorPlan.rooms.map(room => (
              <div 
                key={room.id}
                className={`absolute border-2 rounded cursor-pointer transition-colors ${
                  activeRoom === room.id || activePanorama.id === room.id
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-400 bg-transparent hover:bg-gray-200/50'
                }`}
                style={{ 
                  left: `${room.x}%`, 
                  top: `${room.y}%`,
                  width: `${room.width}%`,
                  height: `${room.height}%`
                }}
                onClick={() => handlePanoramaChange(room.id)}
                onMouseEnter={() => handleRoomHover(room.id)}
                onMouseLeave={() => handleRoomHover(null)}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium bg-white px-1 py-0.5 rounded whitespace-nowrap">
                  {room.name}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">Property Details</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Total Area:</span>
                <span className="font-medium">1,250 sq ft</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Bedrooms:</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Bathrooms:</span>
                <span className="font-medium">1</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Floor:</span>
                <span className="font-medium">3rd</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Year Built:</span>
                <span className="font-medium">2018</span>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualTour;
