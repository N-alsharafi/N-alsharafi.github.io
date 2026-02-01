import { Github, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  // Email obfuscation using CSS reversal
  const obfuscatedEmail = 'moc.liamg@ifarahsla.hun'; // Reversed email

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 gradient-text text-center">Get in Touch</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Feel free to reach out through any of these channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 mr-4">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <a 
                  href="mailto:nuh.alsharafi@gmail.com" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span style={{ unicodeBidi: 'bidi-override', direction: 'rtl' }}>
                    {obfuscatedEmail}
                  </span>
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 mr-4">
                <Github size={20} />
              </div>
              <div>
                <h3 className="font-medium">GitHub</h3>
                <a 
                  href="https://github.com/N-alsharafi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  github.com/N-alsharafi
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 mr-4">
                <Linkedin size={20} />
              </div>
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/nuh-al-sharafi-9762ab222/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  linkedin.com/in/nuh-al-sharafi-9762ab222/
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
