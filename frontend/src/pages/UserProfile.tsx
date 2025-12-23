import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, Save, Loader2, AlertTriangle, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/user-login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
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
      const user = data.user;
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/user-login');
      return;
    }

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name.trim(),
          phone: profile.phone.trim() || undefined,
          address: profile.address.trim() || undefined,
          dateOfBirth: profile.dateOfBirth || undefined,
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
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      setProfile({
        name: data.user.name || '',
        email: data.user.email || '',
        phone: data.user.phone || '',
        address: data.user.address || '',
        dateOfBirth: data.user.dateOfBirth ? new Date(data.user.dateOfBirth).toISOString().split('T')[0] : '',
      });
      localStorage.setItem('userName', data.user.name);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please make sure the backend server is running.');
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">User Profile</h1>
          <p className="text-slate-600 mt-1">Manage your profile and preferences</p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-300">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        name="name"
                        placeholder="John Doe"
                        value={profile.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={profile.email}
                        disabled
                        className="pl-10 bg-slate-100"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Date of Birth</label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        name="address"
                        placeholder="Street address, City, State"
                        value={profile.address}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>View and manage your internship applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <LayoutDashboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">View all your applications in the dashboard</p>
                  <Link to="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
