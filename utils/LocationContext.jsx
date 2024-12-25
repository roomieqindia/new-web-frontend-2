import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const fetchLocation = async () => {
    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: localStorage.getItem("location"),
          key: "AIzaSyAy9lpoCJKj3p-ez31H9mNw5dM115WJr1Y",
        },
      }
    );
    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      setUserLocation(location);
      
      setLoading(false);
     
    }
    
  };
  useEffect(()=>{
    // fetchLocation();
  },[])


  // useEffect(() => {
  //   if (location) {
  //     localStorage.setItem("location", location);
  //   }
  // }, [location]);

  // const resetLocation = () => {
  //   localStorage.removeItem("location");
  //   setLocation(null);
  // };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        fetchLocation,
        loading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  return useContext(LocationContext);
};
