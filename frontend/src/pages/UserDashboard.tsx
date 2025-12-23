import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, FileText, CheckCircle2, XCircle, Clock, AlertCircle, User, Mail, Phone, MapPin, Calendar, LogOut } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Application {
  _id: string;
  status: 'pending' | 'under-review' | 'accepted' | 'rejected';
  internship: {
    _id: string;
    title: string;
    company: string;
    location: string;
    duration: string;
    stipend: number;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  createdAt: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/user-login');
      return;
    }

    fetchUserProfile();
    fetchApplications();
  }, [navigate]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    try {
      const response = await fetch('/api/users/profile', {
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
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();
      setUserProfile(data.user || null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      // Don't set error state for profile fetch failure, just log it
    }
  };

  const fetchApplications = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/applications/my-applications', {
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
      // Filter and validate applications - handle null internships gracefully
      const validApplications = (data.applications || []).map((app: any) => ({
        ...app,
        internship: app.internship || null, // Ensure null if internship is missing
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

  const getStatusBadge = useCallback((status: string) => {
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
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/user-login');
  }, [navigate]);

  // Memoize filtered applications for better performance
  const { pendingApplications, underReviewApplications, acceptedApplications, rejectedApplications } = useMemo(() => ({
    pendingApplications: applications.filter(app => app.status === 'pending'),
    underReviewApplications: applications.filter(app => app.status === 'under-review'),
    acceptedApplications: applications.filter(app => app.status === 'accepted'),
    rejectedApplications: applications.filter(app => app.status === 'rejected'),
  }), [applications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userProfile?.name || 'User'}!</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* User Profile Card */}
        {userProfile && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                My Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{userProfile.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{userProfile.email}</p>
                  </div>
                </div>
                {userProfile.phone && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Phone className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold">{userProfile.phone}</p>
                    </div>
                  </div>
                )}
                {userProfile.address && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-semibold">{userProfile.address}</p>
                    </div>
                  </div>
                )}
              </div>
              {userProfile.dateOfBirth && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date of Birth</p>
                    <p className="font-semibold">{formatDate(userProfile.dateOfBirth)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Applications</CardDescription>
              <CardTitle className="text-3xl">{applications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{pendingApplications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Accepted</CardDescription>
              <CardTitle className="text-3xl text-green-600">{acceptedApplications.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Rejected</CardDescription>
              <CardTitle className="text-3xl text-red-600">{rejectedApplications.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications ({applications.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
            <TabsTrigger value="under-review">Under Review ({underReviewApplications.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>View all your internship applications</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No applications yet. Start applying to internships!</p>
                    <Button onClick={() => navigate('/internships')}>
                      Browse Internships
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Internship</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium">
                            {app.internship?.title || 'Internship Deleted'}
                          </TableCell>
                          <TableCell>{app.internship?.company || 'N/A'}</TableCell>
                          <TableCell>{app.internship?.location || 'N/A'}</TableCell>
                          <TableCell>{getStatusBadge(app.status)}</TableCell>
                          <TableCell>{formatDate(app.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingApplications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending applications</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Internship</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium">
                            {app.internship?.title || 'Internship Deleted'}
                          </TableCell>
                          <TableCell>{app.internship?.company || 'N/A'}</TableCell>
                          <TableCell>{formatDate(app.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="under-review">
            <Card>
              <CardHeader>
                <CardTitle>Under Review</CardTitle>
              </CardHeader>
              <CardContent>
                {underReviewApplications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No applications under review</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Internship</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {underReviewApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium">
                            {app.internship?.title || 'Internship Deleted'}
                          </TableCell>
                          <TableCell>{app.internship?.company || 'N/A'}</TableCell>
                          <TableCell>{formatDate(app.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accepted">
            <Card>
              <CardHeader>
                <CardTitle>Accepted Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {acceptedApplications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No accepted applications yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Internship</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Stipend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {acceptedApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium">
                            {app.internship?.title || 'Internship Deleted'}
                          </TableCell>
                          <TableCell>{app.internship?.company || 'N/A'}</TableCell>
                          <TableCell>{app.internship?.duration || 'N/A'}</TableCell>
                          <TableCell>₹{app.internship?.stipend || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {rejectedApplications.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No rejected applications</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Internship</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell className="font-medium">
                            {app.internship?.title || 'Internship Deleted'}
                          </TableCell>
                          <TableCell>{app.internship?.company || 'N/A'}</TableCell>
                          <TableCell>{formatDate(app.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;

