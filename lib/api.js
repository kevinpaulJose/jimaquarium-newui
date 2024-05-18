// src/utils/api.js

import { API_URL } from "./utils";

const makeApiRequest = async (mode, values, endpoint, setSnackSeverity, 
  setOpenSnackbar, setOpenSnackbarContent, triggerAlert = true, specialSaveSetter = null) => {
  try {
    if(specialSaveSetter) {
      specialSaveSetter(true)
    }
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
        // if(specialSaveSetter) {
        //   specialSaveSetter(false)
        // }
        if(triggerAlert) {
          if(response.status === 200 || response.status === 201) {
            setSnackSeverity("success");
            setOpenSnackbar(true);
            setOpenSnackbarContent(data?.message);
            } else {
              setSnackSeverity("error");
              setOpenSnackbar(true);
              setOpenSnackbarContent(data?.error ? data?.error : "Something went wrong");
              console.log( response);
            }
        }
        
        return {...data, status: response.status};
      } else {
        // if(specialSaveSetter) {
        //   specialSaveSetter(false)
        // }
        setSnackSeverity("error");
          setOpenSnackbar(true);
          setOpenSnackbarContent(data?.error ? data?.error : "Something went wrong");
          console.log(response);
          return null;
      }
    } catch (error) {
      setSnackSeverity("error");
      setOpenSnackbar(true);
      setOpenSnackbarContent("Something went wrong");
      console.log(error);
      // if(specialSaveSetter) {
      //   specialSaveSetter(false)
      // }
      return null;
    }
  };
  
  export default makeApiRequest;
  