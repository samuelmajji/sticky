import { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Importing the plus icon from react-icons

const Input = function ({ handleNewData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Clear input fields after successful submission
      setTitle("");
      setDescription("");
      handleNewData(); // Trigger re-fetch of reminders
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/notes/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Clear input fields after successful submission
      setTitle("");
      setDescription("");
      handleNewData(); // Trigger re-fetch of reminders
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      <div className="space-y-4 w-full max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#FFF475] p-4 h-12 shadow-lg rounded-3xl border border-gray-300"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
            backgroundSize: "100% 24px",
          }}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-[#FFF475] p-4 h-32 shadow-lg rounded-3xl border border-gray-300"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
            backgroundSize: "100% 24px",
          }}
          placeholder="Description"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="absolute bottom-0 right-500 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center transition-transform transform hover:scale-105 hover:bg-blue-600"
        disabled={loading}
      >
        <FaPlus className="text-xl" />
        <span className="ml-2">Add</span>
      </button>
      {loading && <p className="mt-2 text-blue-500">Submitting...</p>}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
    </div>
  );
};

export default Input;
