import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertTriangle, Users, Briefcase, BarChart3 } from 'lucide-react';

interface Stats {
  totalAdmins: number;
  totalInternships: number;
  totalApplications: number;
}

const AdminReports = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [adminsRes, internshipsRes] = await Promise.all([
        fetch('/api/admin', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/internships', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!adminsRes.ok || !internshipsRes.ok) {
        throw new Error('Failed to fetch stats');
      }

      const adminsText = await adminsRes.text();
      const internshipsText = await internshipsRes.text();
      
      let adminsData, internshipsData;
      try {
        adminsData = adminsText ? JSON.parse(adminsText) : { admins: [] };
        internshipsData = internshipsText ? JSON.parse(internshipsText) : { internships: [] };
      } catch (error) {
        throw new Error('Invalid response from server');
      }

      setStats({
        totalAdmins: adminsData.admins?.length || 0,
        totalInternships: internshipsData.internships?.length || 0,
        totalApplications: 0, // Can be updated if you have applications endpoint
      });
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
        <h2 className="text-3xl font-bold text-slate-900">Reports & Analytics</h2>
        <p className="text-slate-600 mt-1">System statistics and insights</p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && stats === null && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Admins */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.totalAdmins}</div>
              <p className="text-xs text-slate-600 mt-1">Active admin accounts</p>
            </CardContent>
          </Card>

          {/* Total Internships */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Internship Posts</CardTitle>
              <Briefcase className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.totalInternships}</div>
              <p className="text-xs text-slate-600 mt-1">Active internship postings</p>
            </CardContent>
          </Card>

          {/* Total Applications */}
          <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stats.totalApplications}</div>
              <p className="text-xs text-slate-600 mt-1">Student applications received</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Overview */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Current system status and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Operational</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">API Status</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Connected</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Database</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">MongoDB</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Last Updated</p>
              <span className="text-sm text-slate-600">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Manage Admins</p>
              <p className="text-xs text-blue-700 mt-1">Add or remove admin users from the system</p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900">Post Internships</p>
              <p className="text-xs text-green-700 mt-1">Create and publish new internship opportunities</p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-900">View Applications</p>
              <p className="text-xs text-purple-700 mt-1">Review and manage student applications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
