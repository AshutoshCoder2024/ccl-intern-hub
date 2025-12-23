import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, departments } from "@/data/internships";
import * as Icons from "lucide-react";

const Projects = () => {
  const getDepartmentIcon = (department: string) => {
    const dept = departments.find((d) => d.name === department);
    if (!dept) return null;
    const Icon = Icons[dept.icon as keyof typeof Icons] as any;
    return Icon ? <Icon className="h-8 w-8 text-primary" /> : null;
  };

  const featuredProject = projects.find((p) => p.status === "Featured");
  const ongoingProjects = projects.filter((p) => p.status === "Ongoing");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Projects & Departments</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the innovative projects and diverse departments at CCL Ranchi
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Featured Project</h2>
            </div>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  {getDepartmentIcon(featuredProject.department)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{featuredProject.title}</h3>
                    <Badge className="bg-primary">{featuredProject.status}</Badge>
                  </div>
                  <Badge variant="secondary" className="mb-4">
                    {featuredProject.department}
                  </Badge>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {featuredProject.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium">Duration:</span>
                    <span>{featuredProject.duration}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Departments Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Our Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const Icon = Icons[dept.icon as keyof typeof Icons] as any;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {Icon && <Icon className="h-12 w-12 text-primary" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">{dept.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Ongoing Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Ongoing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {getDepartmentIcon(project.department)}
                  </div>
                  <Badge variant="secondary">{project.status}</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{project.title}</h3>
                <Badge variant="outline" className="mb-3">
                  {project.department}
                </Badge>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Duration:</span> {project.duration}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center p-12 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Want to be Part of These Projects?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our internship program and contribute to cutting-edge projects that are shaping the future of mining industry in India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
