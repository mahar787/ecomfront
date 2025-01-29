import { useState, useEffect } from "react";

const ErrorComponent = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    // Set a timeout to hide the alert after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5000ms = 5 seconds

    // Cleanup timeout if the component is unmounted before 5 seconds
    return () => clearTimeout(timer);
  }, [props]);
  if (!isVisible) return null;

  return (
    <div
      className="p-2 bg-TrendifyOrange rounded-md min-w-80"
      style={{ position: "absolute", top: "12vh", left: "2vh" }}
    >
      <span className="">{props.message}</span>
    </div>
  );
};

export default ErrorComponent;
