import React, { useEffect } from "react";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  console.log("messagew", message);
  useEffect(() => {
    // Show the alert with animation
    const alertElement = document.getElementById("myAlert") as HTMLDivElement;
    if (alertElement) {
      alertElement.style.animation = "fadeInUp 0.5s ease-out";

      // Hide the alert after a certain duration (e.g., 5 seconds)
      const timeout = setTimeout(() => {
        if (alertElement) {
          alertElement.style.animation = "fadeOutDown 0.5s ease-out";
          setTimeout(() => {
            alertElement.style.display = "none";
          }, 500);
        }
      }, 5000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div id="myAlert" className="alert bg-yellow-300 p-4 rounded shadow-md">
      <div className="text-xl font-semibold">Cảnh báo</div>
      <div className="text-sm">{message}</div>
    </div>
  );
};

export default Alert;
