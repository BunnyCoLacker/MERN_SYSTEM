import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUT':
            return {
                workout: action.payload,
            };
        case 'CREATE_WORKOUT':
            return {
                workout: [action.payload, ...state.workouts],
            };
        case 'Delete':
            return {
                workout: state.workouts.filter((w) => w._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workout: [],
    });

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
