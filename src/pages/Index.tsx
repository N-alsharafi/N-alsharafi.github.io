import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Laptop, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProjectCard from '@/components/ProjectCard';

import projectsData from '@/data/projects.json';

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Filter featured projects
    const featured = projectsData.filter(project => project.featured).slice(0, 3);
    setFeaturedProjects(featured);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Avatar className="h-32 w-32 mb-6">
              <AvatarImage src="./images/PFP.jpeg" alt="Nuh Al-Sharafi" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Nuh Al-Sharafi
            </h1>
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              <Badge variant="outline" className="text-sm bg-primary/5">
                CS Student
              </Badge>
              <Badge variant="outline" className="text-sm bg-primary/5">
                Data Analyst
              </Badge>
              <Badge variant="outline" className="text-sm bg-primary/5">
                Developer
              </Badge>
              <Badge variant="outline" className="text-sm bg-primary/5">
                AI/ML Engineer
              </Badge>
            </div>
          </div>
          
          <div className="bg-muted/30 p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Hello World! 👋</h2>
            <p className="text-muted-foreground mb-4">
              I'm a Computer Science student at Sabanci University.
            </p>
            <p className="text-muted-foreground mb-6">
              Feel free to visit my LinkedIn profile or view my resume. You can also check out my GitHub profile to see what I've been working on.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="https://www.linkedin.com/in/nuh-al-sharafi-9762ab222/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  LinkedIn
                  <ArrowRight size={16} />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/N-alsharafi/" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="./CV-Oct14-25.pdf" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* What I Do Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                  <Code size={24} />
                </div>
              </div>
              <CardTitle>Software Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Building applications with a focus on clean, maintainable code using modern technologies and best practices.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                  <Laptop size={24} />
                </div>
              </div>
              <CardTitle>Web Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Creating responsive and interactive web applications with modern frameworks and libraries.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center card-hover">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                  <Briefcase size={24} />
                </div>
              </div>
              <CardTitle>Academic Research</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Conducting research in computer science, data analysis, and applying computational methods to solve real-world problems.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Featured Projects Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link to="/experience" className="flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
