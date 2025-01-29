"use client"; // Ensure it's a client component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Hook to detect route changes
import NProgress from "nprogress";

const ProgressBar = () => {
  const pathname = usePathname(); // Current path
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show progress bar on route change
    NProgress.start();
    setLoading(true);

    // Simulate loading completion
    const timeout = setTimeout(() => {
      NProgress.done();
      setLoading(false);
    }, 500); // Adjust timing as per your need

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]); // Triggered whenever the pathname changes

  return null; // No UI for this component
};

export default ProgressBar;
