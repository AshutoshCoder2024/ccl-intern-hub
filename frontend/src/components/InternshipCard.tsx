import { Calendar, MapPin, Clock, IndianRupee, Lock } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Internship } from "@/data/internships";

interface InternshipCardProps {
  internship: Internship;
  onViewDetails: (internship: Internship) => void;
}

export const InternshipCard = ({ internship, onViewDetails }: InternshipCardProps) => {
  const isLocked = (internship as any).isLocked || 
    ((internship as any).numberOfSeats && 
     (internship as any).numberOfSeats > 0 && 
     (internship as any).currentApplications >= (internship as any).numberOfSeats);
  
  const monthPeriod = (internship as any).monthPeriod;
  const formatMonthPeriod = (period: string) => {
    const monthMap: Record<string, string> = {
      'Jan-Feb': 'January - February',
      'Mar-Apr': 'March - April',
      'May-Jun': 'May - June',
      'Jul-Aug': 'July - August',
      'Sep-Oct': 'September - October',
      'Nov-Dec': 'November - December',
    };
    return monthMap[period] || period;
  };
  const seatsInfo = (internship as any).numberOfSeats 
    ? `${(internship as any).currentApplications || 0}/${(internship as any).numberOfSeats} seats`
    : null;

  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30 ${isLocked ? 'opacity-75' : ''}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-foreground">{internship.title}</h3>
              {isLocked && (
                <div className="flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-md">
                  <Lock className="h-4 w-4 text-red-600" title="This internship is full" />
                  <span className="text-xs font-semibold text-red-600">FULL</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">
                {(internship as any).department || (internship as any).company || 'Internship'}
              </Badge>
              {monthPeriod && (
                <Badge variant="outline" className="text-xs">
                  {formatMonthPeriod(monthPeriod)}
                </Badge>
              )}
              {isLocked && (
                <Badge variant="destructive" className="text-xs">
                  Full
                </Badge>
              )}
            </div>
          </div>
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
          {internship.deadline && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Apply by: {new Date(internship.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          )}
          {internship.stipend && (
            <div className="flex items-center gap-2 text-muted-foreground font-semibold">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span>{typeof internship.stipend === 'number' ? `₹${internship.stipend}/month` : internship.stipend}</span>
            </div>
          )}
          {seatsInfo && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span className={isLocked ? 'text-red-500 font-semibold' : ''}>
                {seatsInfo} {isLocked ? '(Full)' : 'available'}
              </span>
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
          disabled={isLocked}
          variant={isLocked ? "outline" : "default"}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Full - View Details
            </>
          ) : (
            'View Details'
          )}
        </Button>
      </div>
    </Card>
  );
};
