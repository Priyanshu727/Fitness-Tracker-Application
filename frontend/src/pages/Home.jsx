import React, { useEffect, useState } from 'react';

const Home = () => {
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Direct API call for workouts
                const workoutRes = await fetch('http://localhost:8084/api/workouts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const workoutsData = await workoutRes.json();

                // Direct API call for goals
                const goalRes = await fetch('http://localhost:8084/api/goals', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const goalsData = await goalRes.json();

                setWorkouts(workoutsData);
                setGoals(goalsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 mt-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome to Fitness Tracker</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">Workouts</h2>
                {workouts.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {workouts.map((workout) => (
                            <li key={workout._id} className="text-lg text-gray-700">{workout.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No workouts available</p>
                )}
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Goals</h2>
                {goals.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {goals.map((goal) => (
                            <li key={goal._id} className="text-lg text-gray-700">{goal.description}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No goals available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
