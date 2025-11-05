import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Clock, IndianRupee, Mail, FileText, CheckCircle2 } from "lucide-react";
import { Internship } from "@/data/internships";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface InternshipModalProps {
  internship: Internship | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InternshipModal = ({ internship, open, onOpenChange }: InternshipModalProps) => {
  if (!internship) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{internship.title}</DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="mt-2">
              {internship.department}
            </Badge>
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
            {internship.stipend && (
              <div className="flex items-center gap-2 text-sm">
                <IndianRupee className="h-4 w-4 text-primary" />
                <span className="font-medium">Stipend:</span>
                <span className="text-muted-foreground font-semibold">{internship.stipend}</span>
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

          {/* Required Documents */}
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

          {/* Contact */}
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

          {/* Apply Button */}
          <Button variant="hero" size="lg" className="w-full" asChild>
            <a href="/application-guide">How to Apply</a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
