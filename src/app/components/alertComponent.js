import React, { useEffect, useState } from "react";

const AlertComponent = (props) => {
  // State to control the visibility of the alert
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the alert after 5 seconds
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timeout if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [props]);

  // Function to hide the alert when the close button is clicked
  const handleClose = () => {
    setIsVisible(false);
  };

  // If isVisible is false, don't render the alert
  if (!isVisible) return null;

  return (
    <div
      className="p-2 bg-blue-600 text-white rounded-md min-w-80 relative transition-all duration-500 opacity-100"
      style={{
        position: "absolute",
        top: "12vh",
        left: "2vh",
        opacity: isVisible ? 1 : 0, // Fade out effect
        transform: isVisible ? "translateY(0)" : "translateY(-10px)", // Slide effect
      }}
    >
      <span>{props.message}</span>
      {/* Close Button (X symbol) */}
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 p-1 text-white font-bold text-xl"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        &times; {/* This is the cross symbol */}
      </button>
    </div>
  );
};

export default AlertComponent;
