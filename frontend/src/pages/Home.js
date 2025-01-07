import { useEffect, useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';                  
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { dispatch } = useWorkoutContext()
  const [workouts, setWorkouts] = useState([]); // Ensure it's an array to match `.map` usage.
  const [error, setError] = useState(null); // State to track errors.
  const {user} = useAuthContext()
 
  useEffect(() => {
    if (user){
      fetchWorkout();
    }
    
  }, [user]);

  const fetchWorkout = async () => {
    const response = await fetch('/api/workout', {
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'SET_WORKOUTS', payload: json})
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
          !error && <p>No workouts added</p>
        )}
      </div>
      <div className="form-container">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
