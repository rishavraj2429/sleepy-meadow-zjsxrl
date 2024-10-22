import React, { useState, useEffect } from "react";
import "./styles.css";
import TicketBoard from "./TicketBoard"; // Import the TicketBoard component

function App() {
  const [tickets, setTickets] = useState([]); // Initialize tickets as an empty array
  const [grouping, setGrouping] = useState("status"); // Default grouping by status
  const [sorting, setSorting] = useState(""); // Sorting based on priority or title

  // Fetch the data from API when component mounts
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Log the fetched data to inspect its structure
        if (data && Array.isArray(data)) {
          setTickets(data); // If the data is an array, set it as tickets
        } else if (data && data.tickets) {
          setTickets(data.tickets); // If data contains a "tickets" field, use that
        } else {
          console.error("Unexpected data format:", data); // Handle unexpected data format
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app-container">
      <div className="display-controls">
        <h1>Display:</h1>
        <div className="dropdowns">
          <select
            onChange={(e) => setGrouping(e.target.value)}
            value={grouping}
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>

          <select onChange={(e) => setSorting(e.target.value)} value={sorting}>
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Display the tickets grouped by the selected criteria */}
      <TicketBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;
