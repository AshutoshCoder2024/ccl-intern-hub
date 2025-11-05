import { FileText, CheckCircle2, Clock, Upload, Send, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ApplicationGuide = () => {
  const steps = [
    {
      icon: FileText,
      title: "Review Internship Listings",
      description: "Browse through available internships and carefully read the eligibility criteria, duration, and requirements for positions that interest you.",
      timeline: "Days 1-2",
    },
    {
      icon: CheckCircle2,
      title: "Check Eligibility",
      description: "Ensure you meet all eligibility requirements including educational qualifications, academic performance, and any specific skills mentioned in the internship description.",
      timeline: "Day 2",
    },
    {
      icon: Upload,
      title: "Prepare Documents",
      description: "Gather all required documents: updated resume, academic transcripts, ID proof, NOC from institution (if applicable), and any additional documents specified.",
      timeline: "Days 3-4",
    },
    {
      icon: Send,
      title: "Submit Application",
      description: "Email your complete application with all required documents to the department-specific email address mentioned in the internship listing. Use subject line: 'Internship Application - [Position Name] - [Your Name]'.",
      timeline: "Day 5",
    },
    {
      icon: MessageSquare,
      title: "Application Review",
      description: "Our HR team will review your application. This typically takes 7-10 working days. Shortlisted candidates will be contacted via email or phone.",
      timeline: "Days 6-15",
    },
    {
      icon: CheckCircle2,
      title: "Interview & Selection",
      description: "Shortlisted candidates will be invited for an interview (in-person or virtual). Final selection results will be communicated within 5 working days after the interview.",
      timeline: "Days 16-20",
    },
  ];

  const tips = [
    "Apply before the deadline - late applications will not be considered",
    "Ensure all documents are clear, legible, and in PDF format",
    "Write a compelling cover letter highlighting your interest and relevant skills",
    "Double-check the email address before sending your application",
    "Keep track of your application status and follow up if needed",
    "Prepare for interviews by researching CCL's operations and recent projects",
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Application Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to successfully apply for an internship at CCL Ranchi
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-12 top-20 w-0.5 h-16 bg-border" />
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon & Timeline */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-2">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">
                      {step.timeline}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        Step {index + 1}: {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/5">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Important Tips
            </h2>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to apply? Browse our available internships
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/internships">View Internships</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationGuide;
