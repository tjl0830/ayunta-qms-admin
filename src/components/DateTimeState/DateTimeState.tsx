import React, { useState, useEffect } from "react";

// Define the type for the state
type DateTimeState = string;

const DateTimeDisplay: React.FC = () => {
  // State to hold the formatted date and time
  const [dateTime, setDateTime] = useState<DateTimeState>("");

  // Function to format and update the current date and time
  const updateDateTime = (): void => {
    const now = new Date();

    // Get the hours, minutes, and seconds
    let hours = now.getHours(); // 24-hour format
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert the hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0 (midnight), set it to 12

    // Format the date as "Nov 11, 2024"
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = now.toLocaleDateString("en-US", options);

    // Combine date and time into one formatted string and set it to the state
    setDateTime(`${date} ${hours}:${minutes}:${seconds} ${ampm}`);
  };

  // Using useEffect to update the dateTime every second
  useEffect(() => {
    // Initial call to update the time immediately
    updateDateTime();

    // Set up interval to update the time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <p>{dateTime}</p>
    </div>
  );
};

export default DateTimeDisplay;
