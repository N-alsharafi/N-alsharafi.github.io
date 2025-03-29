import { CalendarDays, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface SideMission {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}

const SideMissionCard = ({ mission }: { mission: SideMission }) => {
  return (
    <Card className="card-hover h-full flex flex-col border-l-4 border-l-orange-500">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{mission.title}</CardTitle>
        </div>
        <div className="flex items-center text-muted-foreground mt-2">
          <CalendarDays size={16} className="mr-1" />
          <span className="text-sm">{mission.date}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{mission.description}</p>
      </CardContent>
      {mission.link && (
        <CardFooter>
          <Button variant="outline" size="sm" asChild>
            <a href={mission.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink size={16} />
              <span>Learn More</span>
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SideMissionCard;
