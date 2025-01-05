import { useState, useEffect } from 'react';

const WorkoutDetails = ({ workout }) => {
    const [timer, setTimer] = useState(60); // Fixed 1-minute timer
    const [isRunning, setIsRunning] = useState(false); // To control timer start/stop
    const [isCompleted, setIsCompleted] = useState(false); // To track timer completion

    // Effect to decrease the timer every second when it's running
    useEffect(() => {
        let interval = null;
        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsRunning(false); // Stop the timer when it reaches 0
            setIsCompleted(true); // Mark the timer as completed
        }
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isRunning, timer]);

    const startTimer = () => {
        setTimer(60); // Reset the timer to 60 seconds
        setIsRunning(true); // Start the timer
        setIsCompleted(false); // Reset completion state
    };

    const skipTime = (seconds) => {
        setTimer((prevTimer) => Math.max(prevTimer - seconds, 0)); // Skip time but not below 0
    };

    const handleClick = async () => {
        const response = await fetch('/api/workout/' + workout._id, {
            method: 'Delete',
        });

        if (response.ok) {
            // Perform additional actions if needed
        }
    };

    return (
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>Load (kg):</strong> {workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{workout.createdAt}</p>
            <div>
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button onClick={() => skipTime(10)} disabled={!isRunning}>
                    Skip -10 Time
                </button>
            </div>
            <p>
                <strong>Timer:</strong> {timer > 0 ? `${timer} seconds` : "Time's up!"}
                {isCompleted && <span style={{ marginLeft: "10px", color: "green" }}>✔</span>}
            </p>
            <span onClick={handleClick}>Delete</span>
        </div>
    );
};

export default WorkoutDetails;
