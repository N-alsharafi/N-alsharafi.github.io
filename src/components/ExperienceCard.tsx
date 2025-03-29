import { CalendarDays, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface WorkExperience {
  id: number;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export const formatDateRange = (startDate: string, endDate: string): string => {
  // Format start date
  const start = new Date(startDate);
  const startMonth = start.toLocaleString('default', { month: 'short' });
  const startYear = start.getFullYear();
  
  // Format end date (could be "Present")
  let endFormatted;
  if (endDate === "Present") {
    endFormatted = "Present";
  } else {
    const end = new Date(endDate);
    const endMonth = end.toLocaleString('default', { month: 'short' });
    const endYear = end.getFullYear();
    endFormatted = `${endMonth} ${endYear}`;
  }
  
  return `${startMonth} ${startYear} - ${endFormatted}`;
};

const ExperienceCard = ({ experience }: { experience: WorkExperience }) => {
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  
  return (
    <Card className="mb-6 card-hover">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
          <div>
            <CardTitle className="text-xl">{experience.position}</CardTitle>
            <p className="text-lg font-medium text-orange-500">{experience.company}</p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center text-muted-foreground mb-1">
              <CalendarDays size={16} className="mr-1" />
              <span className="text-sm">{dateRange}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              <span className="text-sm">{experience.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-line">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
