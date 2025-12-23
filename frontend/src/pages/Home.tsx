import { ArrowRight, Building2, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-mining.jpg";

const Home = () => {
  const stats = [
    { icon: Building2, label: "Departments", value: "8+" },
    { icon: Users, label: "Interns Annually", value: "200+" },
    { icon: Award, label: "Success Rate", value: "95%" },
    { icon: TrendingUp, label: "Years of Excellence", value: "50+" },
  ];

  const highlights = [
    {
      title: "Real-World Experience",
      description: "Work on actual mining projects and gain hands-on experience with industry-standard equipment and processes.",
    },
    {
      title: "Expert Mentorship",
      description: "Learn from experienced professionals with decades of mining industry expertise.",
    },
    {
      title: "Comprehensive Training",
      description: "Structured learning programs covering technical skills, safety protocols, and professional development.",
    },
    {
      title: "Career Opportunities",
      description: "High-performing interns may receive pre-placement offers for full-time positions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-secondary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Shape Your Future in Mining
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Join Central Coalfields Limited's prestigious internship program and gain invaluable industry experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Button variant="hero" size="lg" asChild>
              <Link to="/internships">
                Explore Internships <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/application-guide">Application Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              About CCL Ranchi Internship Program
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Central Coalfields Limited (CCL) is a premier coal mining company under Coal India Limited. 
              Our internship program is designed to nurture future mining professionals by providing comprehensive 
              training, real-world project exposure, and mentorship from industry experts. We offer opportunities 
              across multiple departments, ensuring students gain holistic understanding of modern mining operations.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">{highlight.title}</h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Explore our available internship opportunities and take the first step towards a rewarding career in the mining industry.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/internships">
              View All Internships <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
