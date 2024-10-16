import React, { useState, useEffect } from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added a loading state

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem("token");

        // Replace with your actual API URL
        const response = await fetch("http://localhost:8084/api/goals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setGoals(data);
        } else {
          setError("Failed to fetch goals. Please try again.");
        }
      } catch (error) {
        setError("An error occurred while fetching goals.");
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8 mt-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Your Fitness Goals</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {!loading && goals.length > 0 ? (
        <ul className="space-y-6">
          {goals.map((goal) => (
            <li
              key={goal._id}
              className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-blue-800">
                {goal.description}
              </h2>
              <p className="text-gray-700 mt-2">
                <strong>Target Date:</strong>{" "}
                {new Date(goal.targetDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-1">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    goal.completed ? "text-green-600" : "text-yellow-500"
                  } font-bold`}
                >
                  {goal.completed ? "Completed" : "In Progress"}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <p className="text-center text-lg font-semibold text-gray-500">
            No goals found. Start setting your fitness goals!
          </p>
        )
      )}
    </div>
  );
};

export default Goals;
