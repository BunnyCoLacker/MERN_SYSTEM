import { useEffect, useState} from 'react';


import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [workouts, setWorkouts] = useState([]); // Ensure it's an array to match `.map` usage.
  const [error, setError] = useState(null); // State to track errors.

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    const response = await fetch('/api/workout');
    const json = await response.json();

    if (response.ok) {
      setWorkouts(json);
    } else {
      setError("Failed to fetch workouts.");
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {error && <p className="error">{error}</p>} {/* Display error if any */}
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        ) : (
          !error && <p>Loading workouts...</p>
        )}
      </div>
      <div className="form-container">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
