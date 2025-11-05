import { Calendar, MapPin, Clock, IndianRupee } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Internship } from "@/data/internships";

interface InternshipCardProps {
  internship: Internship;
  onViewDetails: (internship: Internship) => void;
}

export const InternshipCard = ({ internship, onViewDetails }: InternshipCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">{internship.title}</h3>
          <Badge variant="secondary" className="mb-3">
            {internship.department}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{internship.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>Apply by: {new Date(internship.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          {internship.stipend && (
            <div className="flex items-center gap-2 text-muted-foreground font-semibold">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span>{internship.stipend}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {internship.description}
        </p>

        {/* Action Button */}
        <Button
          className="w-full"
          onClick={() => onViewDetails(internship)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};
