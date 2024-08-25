import { useState } from "react";
import { FaCheck } from "react-icons/fa"; // Import check icon

const Note = function ({ style, children, title, id, onDelete }) {
  const [completed, setCompleted] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/notes/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      onDelete(id); // Call the onDelete callback after successful deletion
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  return (
    <div
      className={`relative bg-[#FFF475] p-4 w-64 shadow-lg rounded-3xl border border-gray-300 m-5 ${
        completed ? "line-through" : ""
      }`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
        backgroundSize: "100% 24px",
        ...style, // Apply dynamic positioning styles
      }}
    >
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-lg mb-10">{children}</p>
      <button
        onClick={() => setCompleted(!completed)} // Toggle completion status
        className={`absolute bottom-2 right-2 px-3 py-1 rounded-full flex items-center justify-center transition-colors ${
          completed ? "bg-green-500 text-white" : "bg-white text-gray-700"
        }`}
      >
        <FaCheck className="text-xl" />
      </button>
      {completed && (
        <button
          onClick={handleDelete}
          className="absolute bottom-2 right-16 bg-red-500 text-white px-3 py-1 rounded-full"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Note;
