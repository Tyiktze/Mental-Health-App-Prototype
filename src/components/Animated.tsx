import { motion } from "framer-motion";
import React from "react";

interface AnimatedProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const Animated: React.FC<AnimatedProps> = ({
  children,
  className,
  duration = 0.4,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
