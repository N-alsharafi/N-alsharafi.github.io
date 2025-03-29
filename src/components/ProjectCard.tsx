import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SvgImage from './SvgImage';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  date: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [imageError, setImageError] = useState(false);
  const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  // Check if the image is an SVG
  const isSvg = project.image.toLowerCase().endsWith('.svg');

  // For non-SVG images, still use the absolute URL approach
  const baseUrl = window.location.origin;
  const imagePath = project.image.startsWith('/') 
    ? `${baseUrl}${project.image}` 
    : `${baseUrl}/${project.image}`;
  
  const handleImageError = () => {
    console.error(`Failed to load image: ${imagePath}`);
    setImageError(true);
  };

  // Format description to handle newlines properly
  const formattedDescription = project.description.split('\n\n').map((paragraph, i) => {
    // Check if the paragraph is a bullet point list item
    if (paragraph.startsWith('- ')) {
      // Split into individual bullet points
      const bulletPoints = paragraph.split('\n- ');
      return (
        <ul key={i} className="list-disc pl-5 space-y-1 mt-2">
          {bulletPoints.map((point, j) => (
            <li key={j}>{point.replace(/^- /, '')}</li>
          ))}
        </ul>
      );
    }
    // Regular paragraph
    return <p key={i} className="mb-2">{paragraph}</p>;
  });

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="h-72 overflow-hidden bg-muted flex justify-center items-center">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-muted-foreground/20">
            <span className="text-muted-foreground">Image not available</span>
          </div>
        ) : isSvg ? (
          <SvgImage 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover flex-grow"
          />
        ) : (
          <img 
            src={imagePath}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-muted-foreground mb-4">{formattedDescription}</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github size={16} />
              <span>Code</span>
            </a>
          </Button>
        )}
        {project.demo && (
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
