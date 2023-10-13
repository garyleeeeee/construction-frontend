const API_URL = 'https://construction-api-1mxh.onrender.com/v1';

// const API_URL = 'http://localhost:8000/v1';

// Sign In
export const httpSignInUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/login`,{
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        // API call failed
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    }
};

// Get All Users
export const httpFetchAllUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not available. Please log in.');
        };
        const response = await fetch(`${API_URL}/users/`,{
            method: 'GET',
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
        });
            // API call failed
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            };
            // API call succeeded
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error.message
            };
        }
};

// Get User By ID
export const httpFindUserById = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/findbyid`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        });
        // API call failed
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    }
};

// Update User Info
export const httpUpdateUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/update`,{
            method: 'PUT',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
       // API call failed
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    };
};

export const httpDeleteUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/delete`,{
            method: 'DELETE',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
       // API call failed
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    };
}

// Add Pending User
export const httpAddPendingUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`,{
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
       // API call failed
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    };
};

// Initialise UserPassword
export const httpInitialisePassword = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/password`,{
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        // API call failed
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    };
        // API call succeeded
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message
        };
    };
}