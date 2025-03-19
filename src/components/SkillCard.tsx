
import React, { useEffect, useRef, useState } from 'react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon, 
  title, 
  description,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`glass rounded-2xl p-6 transition-all duration-700 ease-out-expo ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${isHovered ? 'transform -translate-y-2 shadow-lg dark:shadow-primary/10' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 text-primary transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>{icon}</div>
      <h3 className={`text-lg font-medium mb-2 transition-colors duration-300 ${isHovered ? 'text-primary' : ''}`}>{title}</h3>
      <p className="text-foreground/60 text-sm">{description}</p>
    </div>
  );
};

export default SkillCard;
