import { useState, useEffect } from "react";
import Note from "./Components/Note";
import Input from "./Components/Input";

function App() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState(false);
  const [error, setError] = useState(null);

  const handleNewData = function () {
    setNewData((prev) => !prev);
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setReminders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [newData]);

  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((note) => note._id !== id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching reminders: {error}</p>;
  }

  return (
    <>
      <Input handleNewData={handleNewData} />
      <div className="flex flex-wrap gap-4 p-4">
        {reminders.map((note) => (
          <Note
            key={note._id}
            title={note.title}
            id={note._id}
            onDelete={handleDelete}
          >
            {note.description}
          </Note>
        ))}
      </div>
    </>
  );
}

export default App;
