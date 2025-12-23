import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, XCircle, Clock, FileText, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Application {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  } | null;
  internship: {
    _id: string;
    title: string;
    company: string;
    location: string;
  } | null;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  currentInstitution: string;
  course: string;
  yearOfStudy: string;
  cgpa?: string;
  previousExperience?: string;
  skills: string[];
  coverLetter?: string;
  status: 'pending' | 'under-review' | 'accepted' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    status: 'pending' as 'pending' | 'under-review' | 'accepted' | 'rejected',
    adminNotes: '',
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    setLoading(true);
    try {
      const url = statusFilter === 'all'
        ? '/api/applications'
        : `/api/applications?status=${statusFilter}`;

      const response = await fetch(url, {
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
        throw new Error(errorData.message || 'Failed to fetch applications');
      }

      const data = await response.json();
      
      // Filter and validate applications - handle null internships and users gracefully
      const validApplications = (data.applications || []).map((app: any) => ({
        ...app,
        internship: app.internship || null,
        user: app.user || null,
      }));

      setApplications(validApplications);
      setError(''); // Clear any previous errors
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching applications';
      setError(errorMessage);
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedApplication) return;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(
        `/api/applications/${selectedApplication._id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(statusUpdate),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = errorText ? JSON.parse(errorText) : {};
        } catch {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.message || 'Failed to update status');
      }

      const data = await response.json();

      setStatusDialogOpen(false);
      fetchApplications();
      setStatusUpdate({ status: 'pending', adminNotes: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any; label: string }> = {
      pending: { variant: 'secondary', icon: Clock, label: 'Pending' },
      'under-review': { variant: 'default', icon: FileText, label: 'Under Review' },
      accepted: { variant: 'default', icon: CheckCircle2, label: 'Accepted' },
      rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const openStatusDialog = (application: Application) => {
    setSelectedApplication(application);
    setStatusUpdate({
      status: application.status,
      adminNotes: application.adminNotes || '',
    });
    setStatusDialogOpen(true);
  };

  const openDetailDialog = (application: Application) => {
    setSelectedApplication(application);
    setDetailDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    underReview: applications.filter(app => app.status === 'under-review').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Applications</h2>
        <p className="text-slate-600 mt-1">Manage internship applications</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Under Review</CardDescription>
            <CardTitle className="text-2xl text-blue-600">{stats.underReview}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Accepted</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.accepted}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.rejected}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Application List</CardTitle>
          <CardDescription>View and manage all applications</CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No applications found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Internship</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell className="font-medium">{app.fullName}</TableCell>
                    <TableCell>
                      {app.internship?.title || 'Internship Deleted'}
                    </TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetailDialog(app)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openStatusDialog(app)}
                        >
                          Update Status
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Full application information
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={selectedApplication.fullName} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={selectedApplication.email} disabled />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={selectedApplication.phone} disabled />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input value={formatDate(selectedApplication.dateOfBirth)} disabled />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input value={selectedApplication.address} disabled />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input value={selectedApplication.currentInstitution} disabled />
                </div>
                <div>
                  <Label>Course</Label>
                  <Input value={selectedApplication.course} disabled />
                </div>
                <div>
                  <Label>Year of Study</Label>
                  <Input value={selectedApplication.yearOfStudy} disabled />
                </div>
                <div>
                  <Label>CGPA</Label>
                  <Input value={selectedApplication.cgpa || 'N/A'} disabled />
                </div>
                <div className="col-span-2">
                  <Label>Skills</Label>
                  <Input value={selectedApplication.skills.join(', ')} disabled />
                </div>
                {selectedApplication.previousExperience && (
                  <div className="col-span-2">
                    <Label>Previous Experience</Label>
                    <Textarea value={selectedApplication.previousExperience} disabled rows={3} />
                  </div>
                )}
                {selectedApplication.coverLetter && (
                  <div className="col-span-2">
                    <Label>Cover Letter</Label>
                    <Textarea value={selectedApplication.coverLetter} disabled rows={4} />
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status of this application
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div>
                <Label>Status</Label>
                <Select
                  value={statusUpdate.status}
                  onValueChange={(value: any) =>
                    setStatusUpdate({ ...statusUpdate, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Admin Notes (Optional)</Label>
                <Textarea
                  value={statusUpdate.adminNotes}
                  onChange={(e) =>
                    setStatusUpdate({ ...statusUpdate, adminNotes: e.target.value })
                  }
                  placeholder="Add any notes about this application..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleStatusUpdate}>Update Status</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;

