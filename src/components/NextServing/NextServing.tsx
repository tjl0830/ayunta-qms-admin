import { useState, useEffect } from "react";
import Styles from "./NextServing.module.css";
import { database } from "../../Firebase/FirebaseConfig";
import { ref, onValue } from "firebase/database";
import { useCounter } from "../../Functions/CounterContext"; // Import the useCounter hook

function NextServing() {
  const { selectedCounter } = useCounter(); // Access selectedCounter
  const [queue, setQueue] = useState<string[]>([]); // Queue list for the next customers

  // Fetch the queue whenever the selected counter changes
  useEffect(() => {
    if (selectedCounter) {
      const queueRef = ref(database, `counters/${selectedCounter}/queue`);
      const unsubscribe = onValue(queueRef, (snapshot) => {
        const queueData = snapshot.val();

        if (queueData) {
          const queueList = Object.values(queueData).map(
            (entry: any) => entry.queueNumber
          );
          setQueue(queueList.slice(1, 15)); // Slice to show the next 14 customers (excluding the first)
        } else {
          // If queueData is null or empty, reset the queue to an empty array
          setQueue([]);
        }
      });

      return () => unsubscribe(); // Cleanup listener on unmount
    }
  }, [selectedCounter]); // This will update whenever selectedCounter changes

  return (
    <div className={Styles.ServingContainer}>
      <h2>Next in Queue</h2>
      <div className={Styles.QueueContainer} id="QueueContainer">
        {queue.map((queueNumber) => (
          <div key={queueNumber} className={Styles.QueueItem}>
            <span>{queueNumber}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NextServing;
