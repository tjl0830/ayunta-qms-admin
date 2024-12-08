import styles from "./NextCustomer.module.css";
import { nextInQueue } from "../../../Firebase/FirebaseFunctions"; // Importing the function

const NextCustomer = () => {
  const handleNextClick = () => {
    const selectedCounter = document.getElementById("ChangeCounter") as HTMLSelectElement | null;
    if (selectedCounter && selectedCounter.value) {
      const counterNumber = selectedCounter.value;
      nextInQueue(counterNumber); // Call the Firebase function to serve the next person
    }
  };

  return (
    <div className={styles.Container}>
      <button
        onClick={handleNextClick}
        className={styles.Button}
        id="NextButton"
      >
        Next Customer
      </button>
    </div>
  );
};

export default NextCustomer;
