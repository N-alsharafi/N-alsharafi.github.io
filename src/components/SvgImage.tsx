import { useState, useEffect } from 'react';

interface SvgImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SvgImage = ({ src, alt, className = 'w-full h-full object-cover' }: SvgImageProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fix the image path for HashRouter by ensuring it's an absolute path from the server root
  const baseUrl = window.location.origin;
  const fullPath = src.startsWith('/') 
    ? `${baseUrl}${src}` 
    : `${baseUrl}/${src}`;

  useEffect(() => {
    const loadSvg = async () => {
      try {
        console.log(`Fetching SVG from: ${fullPath}`);
        setIsLoading(true);
        
        const response = await fetch(fullPath);
        
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.status} ${response.statusText}`);
        }
        
        const svgText = await response.text();
        
        // Process SVG to add a viewBox if it doesn't exist and set width/height to 100%
        let processedSvg = svgText;
        if (!processedSvg.includes('viewBox') && processedSvg.includes('width="400"') && processedSvg.includes('height="400"')) {
          processedSvg = processedSvg.replace(/<svg/, '<svg viewBox="0 0 400 400"');
        }
        
        // Set width and height to 100% to fill container
        processedSvg = processedSvg.replace(/<svg([^>]*)>/, '<svg$1 width="100%" height="60%">');
        
        setSvgContent(processedSvg);
        setError(null);
      } catch (err) {
        console.error('Error loading SVG:', err);
        setError(err instanceof Error ? err.message : 'Failed to load image');
      } finally {
        setIsLoading(false);
      }
    };

    loadSvg();
  }, [fullPath]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted-foreground/20 ${className}`}>
        <span className="text-muted-foreground">Image not available</span>
      </div>
    );
  }

  // For SVG content, we use dangerouslySetInnerHTML
  // This is generally safe for SVGs you control/own
  if (svgContent) {
    return (
      <div 
        className={`${className} flex items-center justify-center flex-grow`}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        aria-label={alt}
        role="img"
        style={{ 
          display: 'inline-flex', 
          alignItems: 'baseline', 
          justifyContent: 'center',
          transform: 'scale(1.1)',
          overflow: 'hidden'
        }}
      />
    );
  }

  // Fallback to standard img tag
  return <img src={fullPath} alt={alt} className={className} />;
};

export default SvgImage; 