import { API_BASE_URL, getDefaultHeaders } from "../src/config/apiConfig";

// Common API request function
export const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: getDefaultHeaders(),
      body: body ? JSON.stringify(body) : null,
    });


    if (!response.ok) {
      const errorData = await response.json();
      console.log('1',JSON.stringify(errorData));
      throw Error(JSON.stringify(errorData || 'Something Went Wrong')); 
    }

    // await not used here , as the place of api call will use await
    return response.json();
  } catch (error) {
    throw new Error(error.message); // Throw error to be handled in the calling function
  }
};
