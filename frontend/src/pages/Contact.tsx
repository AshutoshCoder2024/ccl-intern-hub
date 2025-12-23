import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      contactSchema.parse(formData);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 2-3 business days.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Validation Error", {
          description: error.errors[0].message,
        });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later or contact us directly via email.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our internship program? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Darbhanga House<br />
                    Ranchi, Jharkhand<br />
                    India - 834029
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +91-651-2460145<br />
                    +91-651-2460146
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    internship@cclranchi.in<br />
                    hr@cclranchi.in
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Office Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday<br />
                    9:00 AM - 5:30 PM IST
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship inquiry"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your query in detail..."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto space-y-6">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe
              title="CCL Ranchi Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.1983076532406!2d85.31754428319621!3d23.381042198531148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e11835ef5ce7%3A0x66d0e4e27debaf01!2sDarbhanga%20House%20CCL%20HQ%2C%20Morabadi%2C%20Ranchi%2C%20Jharkhand%20834001!5e0!3m2!1sen!2sin!4v1762756152224!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Location</h2>
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium">Darbhanga House, Ranchi</p>
                <p className="text-sm">Jharkhand - 834029</p>
              </div>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
