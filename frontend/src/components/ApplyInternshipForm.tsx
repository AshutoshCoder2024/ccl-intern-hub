import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

interface ApplyInternshipFormProps {
  open: boolean;
  onClose: () => void;
  internshipId: string;
  internshipTitle: string;
  onSuccess?: () => void;
}

const ApplyInternshipForm = ({
  open,
  onClose,
  internshipId,
  internshipTitle,
  onSuccess,
}: ApplyInternshipFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    currentInstitution: '',
    course: '',
    yearOfStudy: '',
    cgpa: '',
    previousExperience: '',
    skills: '',
    coverLetter: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Pre-fill user data if available
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName) setFormData(prev => ({ ...prev, fullName: userName }));
    if (userEmail) setFormData(prev => ({ ...prev, email: userEmail }));
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Please login to apply');
      setLoading(false);
      return;
    }

    try {
      const skillsArray = formData.skills
        ? formData.skills.split(',').map(s => s.trim()).filter(s => s)
        : [];

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          internshipId,
          ...formData,
          skills: skillsArray,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = errorText ? JSON.parse(errorText) : {};
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.message || 'Failed to submit application');
      }

      const data = await response.json();

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          address: '',
          currentInstitution: '',
          course: '',
          yearOfStudy: '',
          cgpa: '',
          previousExperience: '',
          skills: '',
          coverLetter: '',
        });
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {internshipTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details to submit your application
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-300 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Application submitted successfully!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentInstitution">Current Institution *</Label>
              <Input
                id="currentInstitution"
                name="currentInstitution"
                value={formData.currentInstitution}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course/Program *</Label>
              <Input
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearOfStudy">Year of Study *</Label>
              <Input
                id="yearOfStudy"
                name="yearOfStudy"
                placeholder="e.g., 3rd Year, Final Year"
                value={formData.yearOfStudy}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA/GPA</Label>
              <Input
                id="cgpa"
                name="cgpa"
                placeholder="e.g., 8.5"
                value={formData.cgpa}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="e.g., JavaScript, React, Node.js"
              value={formData.skills}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousExperience">Previous Experience</Label>
            <Textarea
              id="previousExperience"
              name="previousExperience"
              placeholder="Describe your previous work/internship experience"
              value={formData.previousExperience}
              onChange={handleChange}
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Why are you interested in this internship?"
              value={formData.coverLetter}
              onChange={handleChange}
              disabled={loading}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyInternshipForm;

