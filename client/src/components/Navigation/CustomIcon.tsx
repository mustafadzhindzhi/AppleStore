import React from 'react';

interface CustomIconProps {
  className: string;
  children?: React.ReactNode;
}

const CustomIcon: React.FC<CustomIconProps> = ({ className, children }) => (
  <span className={className}>{children}</span>
);

export default CustomIcon;