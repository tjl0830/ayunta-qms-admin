import React from "react";
import { useCounter } from "../../../Functions/CounterContext"; // Import the useCounter hook
import Styles from "./ChangeCounter.module.css";

const ChangeCounter: React.FC = () => {
  const { selectedCounter, setSelectedCounter } = useCounter(); // Access selectedCounter and setSelectedCounter
  const counters = Array.from({ length: 16 }, (_, i) => i + 1).filter(counter => counter !== 13); // Exclude counter 13

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const counter = event.target.value;
    setSelectedCounter(counter);  // Update the selectedCounter in the global state
  };

  return (
    <div className={Styles.Container}>
      <select
        id="ChangeCounter"
        value={selectedCounter || "1"} // Default to "1" if selectedCounter is undefined or null
        onChange={handleChange}
        className={Styles.Dropdown}
      >
        <option value="" disabled className={Styles.Title}>
          Change Counter
        </option>
        {counters.map((counter) => (
          <option key={counter} value={counter}>
            Counter {counter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeCounter;
