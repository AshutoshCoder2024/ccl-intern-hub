import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Plus, Trash2, Edit, Loader2, Lock, Users } from 'lucide-react';

interface Internship {
  _id: string;
  title: string;
  company: string;
  description: string;
  duration: string;
  stipend: string | number;
  monthPeriod?: string;
  numberOfSeats?: number;
  currentApplications?: number;
  isLocked?: boolean;
  postedBy?: string;
  createdAt: string;
}

const AdminInternships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

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
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    duration: '',
    monthPeriod: '',
    numberOfSeats: '',
    stipend: '',
    category: 'other',
    requirements: '',
    applicationDeadline: '',
  });

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/internships', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = errorText ? JSON.parse(errorText) : {};
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.message || 'Failed to fetch internships');
      }
      const data = await response.json();
      setInternships(data.internships);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          company: formData.company.trim(),
          location: formData.location.trim() || 'Not specified',
          description: formData.description.trim(),
          duration: formData.duration.trim(),
          monthPeriod: formData.monthPeriod && formData.monthPeriod.trim() && formData.monthPeriod !== 'none' ? formData.monthPeriod.trim() : undefined,
          numberOfSeats: formData.numberOfSeats ? parseInt(formData.numberOfSeats) : undefined,
          stipend: formData.stipend ? parseFloat(formData.stipend.toString().replace(/[₹,]/g, '')) || 0 : 0,
          category: formData.category || 'other',
          requirements: formData.requirements ? formData.requirements.split(',').map(r => r.trim()).filter(r => r) : [],
          applicationDeadline: formData.applicationDeadline || undefined,
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
        throw new Error(errorData.message || 'Failed to add internship');
      }

      setSuccess('Internship added successfully!');
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        duration: '',
        monthPeriod: '',
        numberOfSeats: '',
        stipend: '',
        category: 'other',
        requirements: '',
        applicationDeadline: '',
      });
      setShowAddDialog(false);
      fetchInternships();
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please make sure the backend server is running on port 5000.');
      } else if (err instanceof Error) {
        if (err.message.includes('Database') || err.message.includes('database')) {
          setError('Database connection error. Please check if MongoDB is running and the connection string is correct.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInternship = async () => {
    if (!selectedInternship) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        `/api/internships/${selectedInternship._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to delete internship');

      setSuccess('Internship deleted successfully!');
      setShowDeleteDialog(false);
      setSelectedInternship(null);
      fetchInternships();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Internship Postings</h2>
        <p className="text-slate-600 mt-1">Manage and publish internship opportunities</p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-green-50 border-green-300">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Add Internship Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Post New Internship
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Post New Internship</DialogTitle>
            <DialogDescription>
              Add a new internship opportunity
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddInternship} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="e.g., Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input
                  placeholder="e.g., Tech Company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <Input
                placeholder="e.g., Ranchi, Jharkhand"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Describe the internship role and responsibilities"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration *</label>
                <Input
                  placeholder="e.g., 3 months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Month Period</label>
                <Select 
                  value={formData.monthPeriod || undefined} 
                  onValueChange={(value) => setFormData({ ...formData, monthPeriod: value === 'none' ? '' : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select month period (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Jan-Feb">January - February</SelectItem>
                    <SelectItem value="Mar-Apr">March - April</SelectItem>
                    <SelectItem value="May-Jun">May - June</SelectItem>
                    <SelectItem value="Jul-Aug">July - August</SelectItem>
                    <SelectItem value="Sep-Oct">September - October</SelectItem>
                    <SelectItem value="Nov-Dec">November - December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Seats</label>
                <Input
                  type="number"
                  placeholder="e.g., 10 (leave empty for unlimited)"
                  value={formData.numberOfSeats}
                  onChange={(e) => setFormData({ ...formData, numberOfSeats: e.target.value })}
                  min="1"
                />
                <p className="text-xs text-muted-foreground">Leave empty for unlimited applications</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stipend (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.stipend}
                  onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="ai-ml">AI/ML</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Application Deadline</label>
                <Input
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements (comma-separated)</label>
              <Input
                placeholder="e.g., React, JavaScript, Node.js"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Internship'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Internship</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedInternship?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteInternship}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Internships Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Internships</CardTitle>
          <CardDescription>
            Total: {internships.length} internship{internships.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && internships.length === 0 ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : internships.length === 0 ? (
            <p className="text-center text-slate-600 py-8">No internships found</p>
          ) : (
            <div className="space-y-4">
              {internships.map((internship) => (
                <Card key={internship._id} className="border-slate-200">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-slate-900">
                          {internship.title}
                        </h3>
                        <p className="text-slate-600">{internship.company}</p>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                          {internship.description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <Badge variant="secondary">{internship.duration}</Badge>
                          <Badge variant="outline">
                            ₹{typeof internship.stipend === 'number' ? internship.stipend : internship.stipend || 'N/A'}
                          </Badge>
                          {internship.monthPeriod && (
                            <Badge variant="outline" className="text-xs">
                              {formatMonthPeriod(internship.monthPeriod)}
                            </Badge>
                          )}
                          {internship.isLocked && (
                            <Badge variant="destructive" className="text-xs flex items-center gap-1">
                              <Lock className="h-3 w-3" />
                              Full
                            </Badge>
                          )}
                        </div>
                        {internship.numberOfSeats && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">
                              <span className={internship.isLocked ? 'text-red-600 font-semibold' : ''}>
                                {internship.currentApplications || 0}/{internship.numberOfSeats} seats
                              </span>
                              {internship.isLocked && ' (Full)'}
                            </span>
                          </div>
                        )}
                        <p className="text-xs text-slate-500 mt-3">
                          Posted on {new Date(internship.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedInternship(internship);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInternships;
