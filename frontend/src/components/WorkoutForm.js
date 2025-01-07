import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch} = useWorkoutContext()
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (!user) {
        setError('You must be logged in')
        return
    }

    // Basic Validation
    if (!title || !load || !reps) {
      setError('All fields are required!');
      return;
    }

    const workout = { title, load, reps };
    
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
          
        },
      });

      const json = await response.json();
      

      if (!response.ok) {
        // Log the error to inspect the response
        console.log(json);
        setError(json.error || 'Failed to add workout');
      }

      if (response.ok) {
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        console.log('New workout added:', json);
        dispatch({type: 'CREATE_WORKOUT', payload: json})
        window.location.reload();
      }
    } catch (err) {
      // Log any unexpected errors
      console.error('An error occurred:', err);
      setError('An unexpected error occurred while adding the workout.');
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
