import React, { useState, useEffect } from "react";
import Styles from "./CurrentlyServing.module.css";
import { database } from "../../Firebase/FirebaseConfig";
import { ref, onValue } from "firebase/database";
import { useCounter } from "../../Functions/CounterContext";

interface QueueEntry {
  queueNumber: string;
}

const CurrentlyServing: React.FC = () => {
  const { selectedCounter, setSelectedCounter } = useCounter();
  const [currentTransaction, setCurrentTransaction] = useState<string>("---");

  // Set initial counter on mount
  useEffect(() => {
    if (!selectedCounter) {
      setSelectedCounter("1"); // Set default counter to 1
    }
  }, []);

  // Fetch current transaction whenever the selected counter changes
  useEffect(() => {
    if (selectedCounter) {
      const queueRef = ref(database, `counters/${selectedCounter}/queue`);
      const unsubscribe = onValue(queueRef, (snapshot) => {
        const queueData = snapshot.val();
        if (queueData) {
          const firstQueueEntry = Object.values(queueData)[0] as QueueEntry;
          if (firstQueueEntry && firstQueueEntry.queueNumber) {
            setCurrentTransaction(firstQueueEntry.queueNumber);
          } else {
            setCurrentTransaction("---");
          }
        } else {
          setCurrentTransaction("---");
        }
      });

      return () => unsubscribe();
    }
  }, [selectedCounter]);

  return (
    <div className={Styles.ServingContainer}>
      <h2>Currently Serving</h2>
      <p id="CurrentTransaction">{currentTransaction}</p>
    </div>
  );
};

export default CurrentlyServing;
