import React from "react";
import TicketCard from "./TicketCard"; // Import the TicketCard component

function TicketBoard({ tickets = [], grouping, sorting }) {
  // Grouping logic with a fallback in case tickets is not an array
  const groupBy = (tickets = [], key) => {
    if (!Array.isArray(tickets)) {
      console.error("tickets is not an array:", tickets); // Log an error if tickets is not an array
      return {}; // Return an empty object to avoid further errors
    }

    return tickets.reduce((acc, ticket) => {
      const groupValue = ticket[key];
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      acc[groupValue].push(ticket);
      return acc;
    }, {});
  };

  // Sorting logic
  const sortTickets = (tickets, sortType) => {
    if (sortType === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority); // Sort by priority descending
    }
    if (sortType === "title") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title ascending
    }
    return tickets; // Return unsorted if no sort is selected
  };

  // Group tickets based on the selected criteria (status, user, priority)
  const groupedTickets = groupBy(tickets, grouping);

  const columnIcons = {
    Todo: "white-circle",
    "In Progress": "yellow-half-moon",
    Done: "purple-tick",
    Cancelled: "gray-cross", // Icon for cancelled
  };

  return (
    <div className="kanban-board">
      {/* Loop through each group */}
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} className="group">
          <div className="group-header">
            <div className={columnIcons[group] + " column-icon"}></div>{" "}
            {/* Column Icons */}
            <h2 className="group-title">
              {group}
              <span className="ticket-count">
                {groupedTickets[group].length}
              </span>{" "}
              {/* Display the ticket count */}
            </h2>
            <div className="column-controls">
              <span className="add-column">+</span>
              <span className="more-options">...</span>
            </div>
          </div>
          <div className="tickets">
            {/* Sort tickets within each group */}
            {sortTickets(groupedTickets[group], sorting).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketBoard;
