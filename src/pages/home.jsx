import Phone from "../assets/40.svg";
// import House from "../assets/bighouse.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/contextLogin";
import city1 from "../assets/12.png";
import city2 from "../assets/13.png";
import city3 from "../assets/14.png";
import { default as city4, default as city5 } from "../assets/16.png";
import city6 from "../assets/17.png";
import city7 from "../assets/18.png";
import city8 from "../assets/19.png";
import city9 from "../assets/20.png";
import city10 from "../assets/21.png";
import city11 from "../assets/22.png";
import city12 from "../assets/23.png";
import KoiImg2 from "../assets/24.svg";
import Docs from "../assets/27.svg";
import Something from "../assets/35.svg";
import KoiImg from "../assets/KoiImg.svg";
import KoiImg1 from "../assets/KoiImg1.svg";
import DownloadPromo from "../components/DownloadPromo";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import Overlay from "../components/Overlay";
import { axiosI } from "../axios";

import { Home, Users, Utensils, Briefcase } from "lucide-react";

function temphome() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(5); // Add this state
  const { userData } = useAuth();
  const categories = [
    { name: "Hostels", icon: Home, href: "/hostels" },
    { name: "Rooms", icon: Home, href: "/room" },
    { name: "Roommates", icon: Users, href: "/roommates" },
    { name: "Bhojanalayas", icon: Utensils, href: "/bhojanalayas" },
    { name: "Offices", icon: Briefcase, href: "/offices" },
  ];
  const cities = [
    { image: city1 },
    { image: city2 },
    { image: city3 },
    { image: city4 },
    { image: city5 },
    { image: city6 },
  ];

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", location);
    }
    setLoading(false);
  }, [location]);
  useEffect(() => {
    const l = localStorage.getItem("location");
    setLocation(l);
  }, [userData]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }
  const handleReset = () => {
    localStorage.removeItem("location");
    setLocation(null);
  };

  const handleSearch = async (value) => {
    if (value.length === 0) {
      setSuggestions([]);
      return;
    }
    if (value.length < 3) return;
    setIsFetching(true); // Start fetching
    try {
      const res = await axiosI.get("/search", {
        params: {
          q: value,
        },
      });
      console.log(res.data);
      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleNavigate = (s) => {
    if (s.type.toLowerCase() === "room") {
      window.location.href = `/room/${s._id}`;
    } else if (s.type.toLowerCase() === "hostel") {
      window.location.href = `/hostel/${s._id}`;
    } else if (s.type.toLowerCase() === "roommate") {
      window.location.href = `/roommate/${s._id}`;
    } else if (s.type.toLowerCase() === "bhojnalaya") {
      window.location.href = `/bhojnalaya/${s._id}`;
    } else if (s.type.toLowerCase() === "office") {
      window.location.href = `/office/${s._id}`;
    }
  };

  // Add this function to handle showing more results
  const handleShowMore = () => {
    setDisplayLimit(prevLimit => prevLimit + 5);
  };

  return (
    <>
      {!location && <Overlay setLocation={setLocation} location={location} />}
      <div className="w-full max-w-screen h-full overflow-hidden">
        {/* First Division */}
        <div className="h-full relative bg-white">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="relative pb-10">
            <div className="absolute top-[60%] md:left-[10%] lg:left-[15%] xl:left-[20%] bg-blue-200 w-[200px] h-[200px] rounded-full  hidden md:block"></div>
            <div className="absolute top-[40%] md:right-[10%] lg:right-[15%] xl:right-[20%] bg-blue-200 w-[200px] h-[200px] rounded-full hidden md:block"></div>
            <h1 className="text-center text-black font-bold font-['Poppins'] text-[10vw] xs:text-[6vw] sm:text-[32px] md:text-[50px] lg:text-[60px] pt-[100px] sm:pt-[150px]">
              The Perfect Room <span className="sm:relative">For You</span>
            </h1>
            <p className="text-center text-black font-light font-['Poppins'] w-[90%] sm:w-[80%] mx-auto text-[4vw] sm:text-[16px] mt-[10px] leading-[1.5]">
              Save time, energy, and money - Find and book your new
              accommodation.
            </p>
            <img
              className="w-full h-[350px] sm:h-[550px] mt-[30px]"
              src={Phone}
              alt="Main Display"
            />
            <div className="w-full flex justify-center items-center flex-col mt-12 sm:mt-24 px-4">
              <div className="relative flex items-center w-[80%] sm:w-[60%] lg:w-[50%] bg-white border border-gray-300 shadow-lg rounded-lg px-6 py-3">
                <input
                  type="text"
                  placeholder="Search for area, city name..."
                  className="w-full bg-transparent focus:outline-none placeholder-gray-500 text-lg sm:text-xl md:text-2xl py-3 text-gray-700 text-center"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                {/* Suggestion Box */}
                {isFetching && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg rounded-b-lg top-full z-10 mt-1 p-4">
                    <p className="text-center text-gray-500">Loading...</p>
                  </div>
                )}
                {!isFetching && suggestions.length > 0 && (
                  <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-lg rounded-b-lg top-full z-10 mt-1 max-h-72 overflow-y-auto">
                    <div className="flex flex-col divide-y divide-gray-200">
                      {suggestions.slice(0, displayLimit).map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-8 cursor-pointer hover:bg-blue-50 p-4 transition ease-in-out duration-200"
                          onClick={() => handleNavigate(s)}
                        >
                          <img
                            src={s.images[0] || "/placeholder-image.jpg"}
                            alt={s.name || "Suggestion"}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="text-lg font-medium text-gray-700">
                              {s.bhojanalayName ||
                                s.hostelName ||
                                s.officeName ||
                                s.propertyType ||
                                s.roommateName ||
                                s.roomName ||
                                s.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              {s.location || "No location available"}
                            </p>
                          </div>
                        </div>
                      ))}
                      {suggestions.length > displayLimit && (
                        <button
                          onClick={handleShowMore}
                          className="w-full py-3 text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 transition duration-200"
                        >
                          Show More
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-6 text-sm sm:text-base text-gray-500 text-center">
                {location && (
                  <span>
                    <span className="font-semibold text-gray-700">
                      {location.length > 20
                        ? location?.slice(0, 25) + "..."
                        : location}
                    </span>
                  </span>
                )}
                <button
                  onClick={handleReset}
                  className="text-sm sm:text-base text-blue-500 underline ml-2 hover:text-blue-700 transition ease-in-out duration-200"
                >
                  Reset
                </button>
              </p>
            </div>
          </div>

          {/* Chatbot Floating Button */}
        </div>
        {/* Second Division */}
        {/* <div className="max-w-screen mx-auto w-full bg-[#d0f4de] py-12"> */}
        {/* {" "} */}
        {/* Title */}{" "}
        {/* <div className="text-center text-black text-3xl sm:text-[42px] font-semibold font-['Poppins'] pt-[10px] sm:pt-[20px]"> */}
        {/* {" "} */}
        {/* Our Categories{" "} */}
        {/* </div>{" "} */}
        {/* <div className="gap-4 sm:gap-6 mt-[30px] sm:mt-[60px] flex flex-wrap justify-center items-center px-4"> */}
        {/* {" "} */}
        {/* <Link */}
        {/* to="/hostels" */}
        {/* className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#fcf6bd] rounded-full border-b-[6px] border-r-[4px] border-slate-400 shadow-xl flex-shrink-0 flex justify-center items-center text-xs overflow-hidden"
            >
              {" "}
              Hostels{" "}
            </Link>{" "}
            <Link
              to="/room"
              className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#fcf6bd] rounded-full border-b-[6px] border-r-[4px] border-slate-400 shadow-xl flex-shrink-0 flex justify-center items-center text-xs overflow-hidden"
            >
              {" "}
              Rooms{" "}
            </Link>{" "}
            <Link
              to="/roommates"
              className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#fcf6bd] rounded-full border-b-[6px] border-r-[4px] border-slate-400 shadow-xl flex-shrink-0 flex justify-center items-center text-xs overflow-hidden"
            >
              {" "}
              Roommates{" "}
            </Link>{" "}
            <Link
              to="/bhojanalayas"
              className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#fcf6bd] rounded-full border-b-[6px] border-r-[4px] border-slate-400 shadow-xl flex-shrink-0 flex justify-center items-center text-xs overflow-hidden"
            >
              {" "}
              Bhojanalayas{" "}
            </Link>{" "}
            <Link
              to="/offices"
              className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#fcf6bd] rounded-full border-b-[6px] border-r-[4px] border-slate-400 shadow-xl flex-shrink-0 flex justify-center items-center text-xs overflow-hidden"
            >
              {" "}
              Offices{" "}
            </Link>{" "}
          </div>{" "}
        </div> */}
        <section className="bg-gradient-to-b from-green-50 to-green-100 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
              Our Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="group flex flex-col items-center"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-xl">
                    <category.icon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
                  </div>
                  <span className="mt-4 text-sm sm:text-base font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* Third Division */}
        <div className="w-full max-w-screen bg-white gap-6 flex flex-col md:flex-row md:items-center items-center px-6 sm:px-12 lg:px-24 py-10">
          {/* Text Section */}
          <div className="flex-1 flex items-center md:items-start justify-center flex-col text-center md:text-left mt-10 md:mt-0">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-medium font-['Poppins']">
              Are you searching for a
              <br />
              <span className="mt-2 block">Roommate?</span>
            </h2>
            <p className="text-black text-base sm:text-lg md:text-xl font-light font-['Poppins'] mt-4">
              Explore new people and <br />
              make friends to share <br />
              Accommodation
            </p>
            <button className="mt-6 px-6 py-3 bg-[#d0f4de] rounded-full border-b-4 border-r-2 border-gray-300 shadow-xl w-max">
              <Link
                to="/roommates"
                className="text-black text-lg sm:text-xl font-light font-['Poppins']"
              >
                Search Today
              </Link>
            </button>
          </div>
          {/* Image Section */}
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <img
              className="max-w-full h-auto"
              src={KoiImg2}
              alt="Roommate search illustration"
            />
          </div>
        </div>
        {/* Fourth Division */}
        <div className="w-full bg-[#d0f4de] flex flex-col gap-6 md:flex-row-reverse items-center py-16 px-6 sm:px-12 lg:px-24">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-medium font-['Poppins']">
              Connect with our Experts and Get Consult Today
            </h2>
            <p className="mt-4 text-black text-lg sm:text-xl font-light font-['Poppins']">
              Planning to shift to a new city? Get a consult today and plan all
              the expenses.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#e4c1f9] rounded-full border-b-4 border-r-2 border-gray-400 shadow-xl">
              <span className="text-black text-lg sm:text-xl font-light font-['Poppins']">
                Take a Call
              </span>
            </button>
          </div>
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <img
              className="max-w-full h-auto"
              src={KoiImg1}
              alt="Placeholder"
            />
          </div>
        </div>
        {/* Fifth Division */}
        <div className="w-full bg-white flex flex-col md:flex-row gap-6 items-center py-16 px-6 sm:px-12 lg:px-24">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-medium font-['Poppins']">
              Want a taste <br /> Just like your home?
            </h2>
            <p className="mt-4 text-black text-lg sm:text-xl font-light font-['Poppins']">
              Are you looking for nearby Bhojanalay where you can get a
              delicious taste like home?
            </p>
            <button className="mt-6 px-6 py-3 bg-[#a9def9] rounded-full border-b-4 border-r-2 border-gray-300 shadow-xl">
              <Link
                to="/bhojanalayas"
                className="text-black text-lg sm:text-xl font-light font-['Poppins']"
              >
                Book Now
              </Link>
            </button>
          </div>
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <img className="max-w-full h-auto" src={KoiImg} alt="Placeholder" />
          </div>
        </div>
        {/* Sixth Division */}
        <div className="w-full bg-[#D0F4DE] flex flex-col md:flex-row-reverse items-center gap-6 py-16 px-6 sm:px-12 lg:px-24">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-medium font-['Poppins']">
              Legal Documentation and Rental Agreement Required?
            </h2>
            <p className="mt-4 text-black text-lg sm:text-xl font-light font-['Poppins']">
              Shifting into a new flat or room? Get a flat agreement for legal
              authorization and verification.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#ff99c8] rounded-full border-b-4 border-r-2 border-gray-400 shadow-xl">
              <span className="text-black text-lg sm:text-xl font-light font-['Poppins']">
                Let’s Connect
              </span>
            </button>
          </div>
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <img
              className="max-w-full h-auto"
              src={Docs}
              alt="Legal documentation"
            />
          </div>
        </div>
        {/* Seventh Division */}
        <div className="w-full bg-white py-10 flex justify-center">
          <div className="w-full max-w-[1600px] px-4 lg:px-8">
            {/* Header Section */}
            <div className="text-black text-center font-medium font-['Poppins'] mb-4">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[52px]">
                Our Major Locations
              </h2>
              <p className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
                Search in your preferred location wherever you want to shift
              </p>
            </div>

            {/* Locations Section */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 lg:gap-8 mt-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city1}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city2}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city3}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city4}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city5}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city6}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city7}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city8}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city9}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city10}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city11}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-full aspect-square bg-[#fcf6bd] rounded-full border-4 border-stone-300">
                  <img
                    src={city12}
                    alt="City"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* <section className="w-full py-16 sm:py-24">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Our Major Locations
                  </h2>
                  <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
                    Discover your perfect destination among our carefully
                    selected cities
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
                  {cities.map((city) => (
                    <CityItem image={city.image} />
                  ))}
                </div>

                <div className="mt-12 sm:mt-16 text-center">
                  <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
                    Explore All Locations
                  </button>
                </div>
              </div>
            </section> */}

            {/* Button Section */}
          </div>
        </div>
        {/* Eighth Division  */}
        <DownloadPromo />
        {/* Nineth Division  */}
        <div className="w-full bg-[#d0f4de] flex flex-col md:flex-row items-center py-16 px-6 sm:px-12 lg:px-24">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-medium font-['Poppins']">
              Want To Explore Some Premium Properties?
            </h2>
            <p className="mt-4 text-black text-lg sm:text-xl font-light font-['Poppins']">
              Get the best premium properties with verified owners to shift.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#a9def9] rounded-full border-b-4 border-r-2 border-gray-400 shadow-xl">
              <span className="text-black text-lg sm:text-xl font-light font-['Poppins']">
                Connect Now
              </span>
            </button>
          </div>
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <img
              className="max-w-full h-auto"
              src={Something}
              alt="Placeholder"
            />
          </div>
        </div>
        {/* Last Division  */}
        <Footer />
      </div>
    </>
  );
}

export default temphome;
