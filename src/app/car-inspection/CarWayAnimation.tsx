"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CAR_SRC = "/car-way.png";
const ICON_WIDTH = 45;
const ICON_HEIGHT = 117;

interface CarWayAnimationProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  roadRef: React.RefObject<HTMLDivElement | null>;
}

function useRoadTravel(roadRef: React.RefObject<HTMLDivElement | null>) {
  const [travel, setTravel] = useState(280);

  useEffect(() => {
    const road = roadRef.current;
    if (!road) return;

    const update = () => {
      const h = road.clientHeight;
      setTravel(Math.max(0, h - ICON_HEIGHT + 8));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(road);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [roadRef]);

  return travel;
}

export default function CarWayAnimation({
  containerRef,
  roadRef,
}: CarWayAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const travel = useRoadTravel(roadRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-ICON_HEIGHT * 0.35, travel],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.94, 1],
    [0, 1, 1, 0],
  );

  if (!mounted) {
    return (
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: ICON_WIDTH, height: ICON_HEIGHT }}
        aria-hidden
      />
    );
  }

  return (
    <motion.img
      src={CAR_SRC}
      alt=""
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      style={{ y, opacity }}
      className="pointer-events-none absolute left-1/2 top-0 z-[2] h-auto -translate-x-1/2 object-contain"
      draggable={false}
    />
  );
}
