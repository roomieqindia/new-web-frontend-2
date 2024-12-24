import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import "../App.css";
import { axiosI } from "../axios";

const Overlay = ({ setLocation, location }) => {
  const [Areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = async (e) => {
    if (e.target.value.length > 2) {
      setLoading(true); // Set loading to true when a request is made
      const { data } = await axiosI.get(`/autosuggest_google?q=${e.target.value}`);
      console.log(data);

      setAreas(data.predictions);
      setLoading(false); // Set loading to false when response is received
    }
  };

  const handleClick = async (e) => {
    setLoading(true); // Set loading to true when a request is made
    const { data } = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: e,
          key: "AIzaSyAy9lpoCJKj3p-ez31H9mNw5dM115WJr1Y",
        },
      }
    );

    if (data.results.length > 0) {
      const location = data.results[0].geometry.location;
      console.log(location);
    }
    setLocation(e);
    setLoading(false);
    window.location.reload(); // Set loading to false when response is received
  };

  const getLocation = () => {
    setLoading(true); // Set loading to true when requesting location
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAy9lpoCJKj3p-ez31H9mNw5dM115WJr1Y`
        );
        setLocation(data.results[0].formatted_address);
        setLoading(false); // Set loading to false when response is received
        window.location.reload();
      },
      (err) => {
        alert(
          "We do not have permission to determine your location. Please enter manually"
        );
        setLoading(false); // Set loading to false in case of error
      }
    );
  };

  return (
    <>
      <div className="overlay">
        <div className="box-cnt">
          <div className="detectPop">
            <h4>
              Welcome to <span>RoomieQ India</span>
            </h4>
            <div className="dup">
              <IoLocationOutline className="loca" />
              <p>
                Please provide your location to start exploring nearby
                accommodations choices.
              </p>
            </div>
            <div className="dend">
              <input
                className="dser"
                onChange={handleChange}
                placeholder="Search Places ..."
                // value={query}
              />

              <div className="or">OR</div>
              <button onClick={getLocation} className="dbut">
                Detect my location
              </button>
            </div>
          </div>
          <div className="detectbox">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              Areas &&
              Areas.map((area, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(area.description)}
                  className="dolo"
                >
                  <IoLocationOutline className="local" />
                  <p> {area.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overlay;
