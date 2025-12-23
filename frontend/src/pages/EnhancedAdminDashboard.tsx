import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  LogOut,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import AdminUsers from './AdminUsers';
import AdminInternships from './AdminInternships';
import AdminReports from './AdminReports';
import AdminApplications from './AdminApplications';

const EnhancedAdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    const name = localStorage.getItem('adminName');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      navigate('/login');
      return;
    }

    setAdminName(name || '');
    setAdminEmail(email || '');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CCL Admin Hub</h1>
              <p className="text-sm text-slate-600">Welcome, {adminName || 'Admin'}</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="internships" className="gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Internships</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Applications</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Admins</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
              <p className="text-slate-600 mt-1">Overview of your admin account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admin Info Card */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your admin profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Name</p>
                    <p className="text-lg text-slate-900">{adminName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Email</p>
                    <p className="text-lg text-slate-900">{adminEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Role</p>
                    <p className="text-lg text-slate-900">Administrator</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>System overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="text-sm font-medium text-blue-900">Management Areas</span>
                    <span className="text-2xl font-bold text-blue-600">4</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-900">Active Sections</span>
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Overview */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Available Features</CardTitle>
                <CardDescription>Manage your internship platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
                    <Briefcase className="h-6 w-6 text-blue-600 mb-2" />
                    <h3 className="font-semibold text-slate-900">Internships</h3>
                    <p className="text-sm text-slate-600 mt-1">Post and manage internship opportunities</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                    <Users className="h-6 w-6 text-green-600 mb-2" />
                    <h3 className="font-semibold text-slate-900">Admin Users</h3>
                    <p className="text-sm text-slate-600 mt-1">Add and manage admin accounts</p>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
                    <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
                    <h3 className="font-semibold text-slate-900">Reports</h3>
                    <p className="text-sm text-slate-600 mt-1">View analytics and system reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Message */}
            <Alert className="bg-blue-50 border-blue-300">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Welcome to CCL Admin Hub! Use the navigation tabs above to manage internships, admin users, and view reports.
              </AlertDescription>
            </Alert>
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships">
            <AdminInternships />
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <AdminApplications />
          </TabsContent>

          {/* Admins Tab */}
          <TabsContent value="admins">
            <AdminUsers />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <AdminReports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EnhancedAdminDashboard;
