
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkTo: string;
  buttonText: string;
  color?: "blue" | "green" | "purple"; // Explicitly define color type
}

export const FeatureCard = ({ icon, title, description, linkTo, buttonText, color = "blue" }: FeatureCardProps) => {
  // Define color variants based on the color prop
  const getColorVariants = () => {
    switch (color) {
      case 'green':
        return {
          border: 'border-green-200',
          iconBg: 'bg-green-100',
          iconText: 'text-green-700',
          button: 'text-green-700 border-green-300 hover:bg-green-50',
        };
      case 'purple':
        return {
          border: 'border-purple-200',
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-700',
          button: 'text-purple-700 border-purple-300 hover:bg-purple-50',
        };
      case 'blue':
      default:
        return {
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-700',
          button: 'text-blue-700 border-blue-300 hover:bg-blue-50',
        };
    }
  };

  const colorVariants = getColorVariants();

  return (
    <Card className={`border ${colorVariants.border} hover:shadow-md transition-all`}>
      <div className="p-5">
        <div className={`w-10 h-10 rounded-full ${colorVariants.iconBg} ${colorVariants.iconText} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        <Link
          to={linkTo}
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border ${colorVariants.button}`}
        >
          {buttonText}
        </Link>
      </div>
    </Card>
  );
};
