// Import the necessary Firebase database functions from your firebaseConfig.ts
import { database } from "./FirebaseConfig"; // Assuming FirebaseConfig.ts contains your Firebase setup
import { ref, get, set, remove, child, push } from "firebase/database"; // Import specific functions you need

// Type definition for a queue entry
interface QueueEntry {
  queueNumber: string | number;
}

// Function to remove the first queue number (i.e., serve the next person)
export function nextInQueue(counterNumber: string): void {
  const queueRef = ref(database, `counters/${counterNumber}/queue`);

  get(queueRef).then((snapshot) => {
    const queueData = snapshot.val();

    if (queueData) {
      // Get the key of the first item in the queue
      const firstQueueKey = Object.keys(queueData)[0];

      // Remove the first queue entry
      remove(child(queueRef, firstQueueKey));
    }
  });
}

// Function to update the queue display and show the current transaction (first in queue)
export function updateQueueDisplay(
  counterNumber: string,
  queueDisplayElement: HTMLElement,
  currentTransactionElement: HTMLElement
): void {
  const queueRef = ref(database, `counters/${counterNumber}/queue`);

  get(queueRef).then((snapshot) => {
    const queueData = snapshot.val();

    if (queueData) {
      // Extract queue entry keys (auto-generated IDs) and their corresponding values (queue numbers)
      const queueKeys = Object.keys(queueData);
      const queueEntries: QueueEntry[] = Object.values(queueData);

      // If there are 15 or fewer entries, display all the queue numbers (up to 15)
      if (queueKeys.length <= 15) {
        const currentQueueEntry = queueEntries[0]; // First queue entry (current transaction)
        const currentQueueNumber = currentQueueEntry.queueNumber;

        // Set the current transaction number
        currentTransactionElement.textContent = `${currentQueueNumber}`;

        // Display the remaining queue numbers (up to 14)
        const remainingQueue = queueEntries.slice(1, 15); // Slice to get only the next 14 entries
        queueDisplayElement.innerHTML = remainingQueue
          .map(
            (entry) =>
              `<div class="queue-number"><p>${entry.queueNumber}</p></div>`
          )
          .join("");
      } else {
        // If there are more than 15 entries, display the first, last, and a truncated list in the middle
        const currentQueueEntry = queueEntries[0];
        const lastQueueEntry = queueEntries[queueEntries.length - 1];
        const currentQueueNumber = currentQueueEntry.queueNumber;

        // Set the current transaction number
        currentTransactionElement.textContent = `${currentQueueNumber}`;

        // Display the next 13 queue numbers with ellipsis indicating more in the middle
        const remainingQueue = queueEntries.slice(1, 13);
        queueDisplayElement.innerHTML =
          remainingQueue
            .map(
              (entry) =>
                `<div class="queue-number"><p>${entry.queueNumber}</p></div>`
            )
            .join("") +
          `<div class="queue-number"><p>...</p></div>` +
          `<div class="queue-number"><p>${lastQueueEntry.queueNumber}</p></div>`;
      }
    } else {
      // If no queue data exists, reset the display
      currentTransactionElement.textContent = "---";
      queueDisplayElement.innerHTML = "<p></p>";
    }
  });
}

// Function to move the first item from one queue to another (for transfer between counters)
export async function moveFirstItemToAnotherQueue(
  counterNumber: string,
  targetCounterNumber: string
): Promise<void> {
  const sourceQueueRef = ref(database, `counters/${counterNumber}/queue`);
  const targetQueueRef = ref(database, `counters/${targetCounterNumber}/queue`);

  try {
    const snapshot = await get(sourceQueueRef);
    const queueData = snapshot.val();

    if (queueData) {
      const firstQueueKey = Object.keys(queueData)[0];
      const firstQueueItem = queueData[firstQueueKey];

      // Use push to generate a new key in the target queue
      await push(targetQueueRef, firstQueueItem);

      // Once added, remove the item from the source queue
      await remove(child(sourceQueueRef, firstQueueKey));
    }
  } catch (error) {
    console.error("Failed to move item between queues:", error);
  }
}
