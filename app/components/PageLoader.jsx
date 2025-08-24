// app/components/PageLoader.jsx
"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function PageLoader({ minShowMs = 800, fadeMs = 250 }) {
  const [visible, setVisible] = useState(true);  // for opacity
  const [mounted, setMounted] = useState(true);  // for unmount

  useEffect(() => {
    // Keep loader visible briefly for smooth UX
    const t1 = setTimeout(() => setVisible(false), minShowMs);
    const t2 = setTimeout(() => setMounted(false), minShowMs + fadeMs + 20);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [minShowMs, fadeMs]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#12121c] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Loader label="Loading..." />
    </div>
  );
}