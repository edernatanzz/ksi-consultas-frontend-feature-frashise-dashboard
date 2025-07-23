import { useState, useEffect } from "react";
import { breakpoints } from "@/shared/styles/breakpoints";

export function useBreakpoint() {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width < breakpoints.tablet) return "mobile";
  if (width < breakpoints.laptop) return "tablet";
  if (width < breakpoints.desktop) return "laptop";
  if (width < breakpoints.monitor) return "desktop";
  return "monitor";
} 