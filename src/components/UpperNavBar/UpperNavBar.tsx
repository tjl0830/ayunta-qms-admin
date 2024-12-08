import React from "react";
import { useCounter } from "../../Functions/CounterContext";  // Import the custom hook
import dlsudLogo from "../../assets/dlsud_logo.png";
import registrarLogo from "../../assets/registrar_logo.png";
import DateTimeDisplay from "../DateTimeState/DateTimeState";
import styles from "./UpperNavBar.module.css";

const UpperNavBar: React.FC = () => {
  const { selectedCounter } = useCounter();  // Access the global selectedCounter value

  return (
    <div className={styles.UpperNavBar}>
      <div className={styles.overlapGroup}>
        <div className={styles.dateAndTime}>
          <DateTimeDisplay />
        </div>

        <div className={styles.CounterTitle}>
          <h1>Counter {selectedCounter || 1}</h1> {/* Display Counter or default to 1 */}
        </div>

        <img
          className={styles.registrarLogo}
          alt="Registrar logo"
          src={registrarLogo}
        />

        <img className={styles.dlsudLogo} alt="Dlsud logo" src={dlsudLogo} />
      </div>
    </div>
  );
};

export default UpperNavBar;
