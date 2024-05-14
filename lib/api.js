// src/utils/api.js

import { API_URL } from "./utils";

const makeApiRequest = async (mode, values, endpoint, setSnackSeverity, setOpenSnackbar, setOpenSnackbarContent, triggerAlert = true) => {
  try {
      const requestOptions = {
        method: mode,
        headers: {
          'Content-Type': 'application/json', // Adjust as needed
          // Add other headers if required
        },
        body: mode === 'POST' ? JSON.stringify(values) : null,
      };
  
      const response = await fetch(API_URL+endpoint, requestOptions);
      const data = await response.json();
  
      if (response.ok) {
        if(triggerAlert) {
          if(response.status === 200 || response.status === 201) {
            setSnackSeverity("success");
            setOpenSnackbar(true);
            setOpenSnackbarContent(data?.message);
            } else {
              setSnackSeverity("error");
              setOpenSnackbar(true);
              setOpenSnackbarContent(data?.error ? data?.error : "Something went wrong");
            }
        }
        
        return {...data, status: response.status};
      } else {
        setSnackSeverity("error");
          setOpenSnackbar(true);
          setOpenSnackbarContent(data?.error ? data?.error : "Something went wrong");
          return null;
      }
    } catch (error) {
      setSnackSeverity("error");
      setOpenSnackbar(true);
      setOpenSnackbarContent("Something went wrong");
      return null;
    }
  };
  
  export default makeApiRequest;
  