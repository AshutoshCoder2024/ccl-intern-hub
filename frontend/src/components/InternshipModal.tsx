import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Clock, IndianRupee, Mail, FileText, CheckCircle2, Lock, AlertCircle } from "lucide-react";
import { Internship } from "@/data/internships";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ApplyInternshipForm from "./ApplyInternshipForm";
import { useNavigate } from "react-router-dom";

interface InternshipModalProps {
  internship: Internship | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InternshipModal = ({ internship, open, onOpenChange }: InternshipModalProps) => {
  const navigate = useNavigate();
  const [applyFormOpen, setApplyFormOpen] = useState(false);

  if (!internship) return null;

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

  const handleApply = () => {
    if (isLocked) {
      return;
    }
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/user-login');
      onOpenChange(false);
      return;
    }
    setApplyFormOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle className="text-2xl font-bold">{internship.title}</DialogTitle>
            {isLocked && (
              <div className="flex items-center gap-1 px-3 py-1 bg-red-50 border border-red-200 rounded-md">
                <Lock className="h-5 w-5 text-red-600" title="This internship is full" />
                <span className="text-sm font-semibold text-red-600">FULL</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
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
                Full - No longer accepting applications
              </Badge>
            )}
          </div>
          <DialogDescription>
            {internship.company} • {internship.location || 'Location not specified'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Duration:</span>
              <span className="text-muted-foreground">{internship.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">Location:</span>
              <span className="text-muted-foreground">{internship.location}</span>
            </div>
            {internship.deadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">Deadline:</span>
                <span className="text-muted-foreground">
                  {new Date(internship.deadline).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            )}
            {internship.stipend && (
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span className="font-medium">Stipend:</span>
                <span className="text-muted-foreground font-semibold">
                  {typeof internship.stipend === 'number' ? `₹${internship.stipend}/month` : internship.stipend}
                </span>
              </div>
            )}
            {monthPeriod && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">Period:</span>
                <span className="text-muted-foreground">{formatMonthPeriod(monthPeriod)}</span>
              </div>
            )}
            {seatsInfo && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Seats:</span>
                <span className={isLocked ? 'text-red-500 font-semibold' : 'text-muted-foreground'}>
                  {seatsInfo} {isLocked ? '(Full)' : 'available'}
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">{internship.description}</p>
          </div>

          <Separator />

          {/* Eligibility */}
          {internship.eligibility && internship.eligibility.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Eligibility Criteria
                </h3>
                <ul className="space-y-2">
                  {internship.eligibility.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Required Documents */}
          {internship.requiredDocuments && internship.requiredDocuments.length > 0 && (
            <>
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Required Documents
                </h3>
                <ul className="space-y-2">
                  {internship.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Separator />
            </>
          )}

          {/* Contact */}
          {internship.contactEmail && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Contact Information
              </h3>
              <p className="text-sm text-muted-foreground">
                For queries regarding this internship, please contact:{" "}
                <a href={`mailto:${internship.contactEmail}`} className="text-primary hover:underline">
                  {internship.contactEmail}
                </a>
              </p>
            </div>
          )}

          {/* Lock Warning */}
          {isLocked && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Internship Full</h4>
                <p className="text-sm text-red-700">
                  This internship has reached its maximum capacity. No more applications are being accepted at this time.
                </p>
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="flex gap-2">
            <Button 
              variant="hero" 
              size="lg" 
              className="flex-1" 
              onClick={handleApply}
              disabled={isLocked}
            >
              {isLocked ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Applications Closed
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
            {!isLocked && (
              <Button variant="outline" size="lg" asChild>
                <a href="/application-guide">How to Apply</a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>

      <ApplyInternshipForm
        open={applyFormOpen}
        onClose={() => setApplyFormOpen(false)}
        internshipId={(internship as any)._id || internship.id}
        internshipTitle={internship.title}
        onSuccess={() => {
          onOpenChange(false);
        }}
      />
    </Dialog>
  );
};
