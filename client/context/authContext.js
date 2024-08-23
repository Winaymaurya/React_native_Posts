import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Context
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

//   Axios Base URL
axios.defaults.baseURL='http://192.168.63.6:8080/api/v1/'

  // Initial local storage data
  const getLocal = async () => {
    try {
      let data = await AsyncStorage.getItem("@auth");
      if (data) {
        let loginData = JSON.parse(data);
        setState({ ...state, user: loginData?.user, token: loginData?.token });
        // console.log("Local Storage ==> ", loginData);
      }
    } catch (error) {
      console.log("Error fetching from local storage: ", error);
    }
  };

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
