"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CarWayAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function CarWayAnimation({ containerRef }: CarWayAnimationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end -200%"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-100%", "650%"]);

  if (!mounted) {
    return <div className="w-[45px] h-[117px] absolute -top-16 left-1/2 -translate-x-1/2" />;
  }

  return (
    <motion.img 
      src="/car-way.png" 
      alt="car-way" 
      width={45} 
      height={117} 
      style={{ y }} 
      className="absolute -top-16 left-1/2 -translate-x-1/2"
    />
  );
}

