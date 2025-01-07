import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Email and password are required.");
            setIsLoading(false);
            return;
        }

      
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const resp = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(resp.error);
                return;
            }
        if (response.ok) {
            //save the user to the localstorage
       localStorage.setItem("user", JSON.stringify(resp));

            // Update the auth context
            dispatch({ type: "LOGIN", payload: resp});

            setIsLoading(false);
   
}
          
        }

    return { login, isLoading, error };
}
