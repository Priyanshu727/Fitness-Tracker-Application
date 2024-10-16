import React, { useState, useEffect } from "react";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token");

        // Replace with your actual API URL
        const response = await fetch("http://localhost:8084/api/workouts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          setError("Failed to fetch workouts");
        }
      } catch (error) {
        setError("Error fetching workouts");
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Workouts</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {!loading && workouts.length > 0 ? (
        <ul className="space-y-6">
          {workouts.map((workout) => (
            <li
              key={workout._id}
              className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-800">{workout.title}</h2>
              <p className="text-gray-700 mt-2">{workout.description}</p>
              <p className="text-gray-700 mt-1">
                <strong>Duration:</strong> {workout.duration} minutes
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className="text-center text-lg font-semibold text-gray-500">
            No workouts found. Start adding some workouts!
          </p>
        )
      )}
    </div>
  );
};

export default Workouts;
