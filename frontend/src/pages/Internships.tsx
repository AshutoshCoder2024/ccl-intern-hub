import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InternshipCard } from "@/components/InternshipCard";
import { InternshipModal } from "@/components/InternshipModal";
import { departments } from "@/data/internships";
import { Badge } from "@/components/ui/badge";

interface Internship {
  _id: string;
  id?: string;
  title: string;
  company?: string;
  department?: string;
  duration: string;
  location: string;
  description: string;
  stipend?: number | string;
  deadline?: string;
  eligibility?: string[];
  requiredDocuments?: string[];
  contactEmail?: string;
  category?: string;
  status?: string;
}

const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await fetch('/api/internships');
      if (response.ok) {
        const data = await response.json();
        setInternships(data.internships || []);
      } else {
        // If API fails, use static data as fallback
        const { internships: staticInternships } = await import('@/data/internships');
        setInternships(staticInternships.map(internship => ({
          ...internship,
          _id: internship.id,
        })));
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
      // Fallback to static data
      const { internships: staticInternships } = await import('@/data/internships');
      setInternships(staticInternships.map(internship => ({
        ...internship,
        _id: internship.id,
      })));
    } finally {
      setLoading(false);
    }
  };

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (internship.department || internship.company || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "all" || 
        (internship.department || internship.company || '') === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [searchQuery, selectedDepartment, internships]);

  const handleViewDetails = (internship: Internship) => {
    setSelectedInternship(internship);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Available Internships</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore internship opportunities across various departments at CCL Ranchi
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search internships by title, department, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Department Filter */}
            <div className="w-full md:w-64">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {filteredInternships.length} {filteredInternships.length === 1 ? 'Internship' : 'Internships'} Found
            </Badge>
            {(searchQuery || selectedDepartment !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDepartment("all");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Internship Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship._id || internship.id}
                internship={internship as any}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">No internships found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment("all");
              }}
              className="text-primary hover:underline"
            >
              Clear filters and view all internships
            </button>
          </div>
        )}

        {/* Modal */}
        <InternshipModal
          internship={selectedInternship}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
};

export default Internships;
