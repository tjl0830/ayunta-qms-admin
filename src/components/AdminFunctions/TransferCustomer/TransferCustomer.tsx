import { useState } from "react";
import styles from "./TransferCustomer.module.css"; // Import your custom styles
import { moveFirstItemToAnotherQueue } from "../../../Firebase/FirebaseFunctions"; // Import the Firebase function
import { useCounter } from "../../../Functions/CounterContext"; // Import the useCounter hook

const TransferCustomer = () => {
  const { selectedCounter } = useCounter(); // Access the global selectedCounter
  const [targetCounter, setTargetCounter] = useState<string>(""); // Track the target counter to transfer
  const [isCounterListVisible, setIsCounterListVisible] = useState<boolean>(false); // Show or hide the counter list

  // Array of counters (you can modify this as per your need)
  const counters = [...Array(16)].map((_, i) => i + 1).filter((counter) => counter !== 13); // Exclude Counter 13

  const handleCounterChange = (counter: string) => {
    setTargetCounter(counter);
    setIsCounterListVisible(false); // Hide the counter list after selection
  };

  // Handle the Transfer button click (left side of the split button)
  const handleTransferClick = () => {
    if (targetCounter) {
      console.log("Transferring from Counter:", selectedCounter, "to Counter:", targetCounter);

      // Call the Firebase function to move the first item to the selected target counter
      moveFirstItemToAnotherQueue(selectedCounter, targetCounter);

      // After transfer, clear the target selection and hide the counter list
      setTargetCounter(""); 
      setIsCounterListVisible(false);
    } else {
      // Improved feedback for the user
      alert("Please select a target counter.");
    }
  };

  // Toggle visibility of counter list when right button is clicked
  const toggleCounterList = () => {
    setIsCounterListVisible((prev) => !prev);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.SplitButton}>
        {/* Left button for default action (transfer) */}
        <button
          onClick={handleTransferClick}
          className={styles.LeftButton}
          id="TransferButton"
        >
          {selectedCounter && targetCounter
            ? `Transfer to Counter ${targetCounter}`
            : "Transfer Customer"}
        </button>

        {/* Right button (to show/hide the counter list) */}
        <button onClick={toggleCounterList} className={styles.RightButton}>
          &#9662; {/* Down arrow */}
        </button>
      </div>

      {/* Conditional rendering of counter list only if a selectedCounter is present */}
      {isCounterListVisible && selectedCounter && (
        <div className={styles.CounterList}>
          {/* Label for the dropdown */}
          <div className={styles.CounterListLabel}>Select Target Counter</div>

          {/* Display counters as buttons */}
          {counters.map((counter) => (
            <button
              key={counter}
              onClick={() => handleCounterChange(counter.toString())}
              className={styles.CounterButton}
            >
              Counter {counter}
            </button>
          ))}
        </div>
      )}

      {/* If a target counter is selected, show a "Clear Selection" button */}
      {targetCounter && (
        <button
          onClick={() => setTargetCounter("")}
          className={styles.ClearSelectionButton}
        >
          Clear Target Selection
        </button>
      )}
    </div>
  );
};

export default TransferCustomer;
