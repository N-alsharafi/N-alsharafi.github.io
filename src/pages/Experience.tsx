import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard, { Project } from '@/components/ProjectCard';
import ExperienceCard, { WorkExperience } from '@/components/ExperienceCard';
import SideMissionCard, { SideMission } from '@/components/SideMissionCard';

import projectsData from '@/data/projects.json';
import workData from '@/data/work.json';
import missionsData from '@/data/side-missions.json';

// Type guard for type safety
const projects = projectsData as Project[];
const workExperiences = workData as WorkExperience[];
const sideMissions = missionsData as SideMission[];

const Experience = () => {
  const [filter, setFilter] = useState<string>("all");
  
  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags)
    )
  );
  
  // Filter projects based on selected tag
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 gradient-text">My Experience</h1>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="work">Work Experience</TabsTrigger>
          <TabsTrigger value="missions">Side Missions</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects" className="animate-fade-in">
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge 
              variant={filter === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter("all")}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge 
                key={tag}
                variant={filter === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects match the selected filter.</p>
            </div>
          )}
        </TabsContent>
        
        {/* Work Experience Tab */}
        <TabsContent value="work" className="animate-fade-in">
          <div className="space-y-6">
            {workExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </TabsContent>
        
        {/* Side Missions Tab */}
        <TabsContent value="missions" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sideMissions.map((mission) => (
              <SideMissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Experience;
