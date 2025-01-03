import Category from "../assets/category.svg";
import House from "../assets/House.svg";
import Footer from "../components/footer";
import PriceRangeSlider from "../components/PriceRangeSlider";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/mobile.webp";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { axiosI } from "../axios";
import { useLocationContext } from "../../utils/LocationContext";
import Overlay from "../components/Overlay";
import ProductCard from "./Demo";
import { set } from "react-hook-form";

function RoomsPage() {
  const { userLocation, fetchLocation } = useLocationContext();
  const [roomList, setRoomList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [advanceFilter, setAdvanceFilter] = useState({
    priceRange: {
      min: 0,
      max: 0,
    },
    bedrooms: "",
    bathroom: "",
    furnishing: [],
    listedBy: [],
    bachelors: "",
    pricePerSqft: {
      min: "",
      max: "",
    },
    sortBy: "",
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", location);
    }
  }, [location]);

  useEffect(() => {
    setAdvanceFilter((prev) => {
      return {
        ...prev,
        lat: userLocation?.lat,
        lng: userLocation?.lng,
      };
    });
    fetchRooms();
  }, [filter, userLocation]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchRooms = async () => {
    if (!userLocation) return;
    setLoading(true);

    try {
      const { data } = await axiosI.get("/rooms", {
        params: {
          filter,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
        },
      });
      setRoomList(data);
      if (data) {
        const res = await axiosI.get("/wishlist");
        setWishlist(
          Array.isArray(res?.data?.itemIds) ? res?.data?.itemIds : []
        );
      }
    } catch (err) {
      console.error("Error fetching rooms: ", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id) => {
    console.log("Toggling wishlist for: ", id);

    const isWishlisted = wishlist.includes(id);
    console.log("isWishlisted: ", isWishlisted);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType: "RoomForm" })
      .then((res) => {
        if (isWishlisted) {
          setWishlist((prev) => prev.filter((item) => item !== id));
        } else {
          setWishlist((prev) => [...prev, id]);
        }
      })
      .catch((err) => {
        console.error("Error toggling wishlist: ", err);
      });
  };

  const handleFilter = async () => {
    // Filter rooms with advanceFilter
    // setLoading(true);
    setVisibleItems(8);
    const { data } = await axiosI.post("/filter/rooms", advanceFilter);
    setRoomList(data);
    // setLoading(false);
  };

  const handleClearFilter = () => {
    setAdvanceFilter({
      priceRange: {
        min: 0,
        max: 0,
      },
      bedrooms: "",
      bathroom: "",
      furnishing: [],
      listedBy: [],
      bachelors: "",
      pricePerSqft: {
        min: "",
        max: "",
      },
      sortBy: "",
    });

    // Fetch rooms with filter and userLocation
    fetchRooms();
  };

  const handlePriceRangeChange = (range) => {
    setAdvanceFilter((prev) => ({
      ...prev,
      priceRange: {
        min: range[0],
        max: range[1],
      },
    }));
  };

  const handleToggleFilter = () => {
    setVisibleItems(8);
    setIsFilterVisible(!isFilterVisible);
  };

  const loadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  return (
    <>
      <Navbar isFilterVisible={isFilterVisible} />
      {!location && <Overlay setLocation={setLocation} location={location} />}
      {/* if isFilterVisible is true blur the main div */}
      <div className={`mb-[20px] ${isFilterVisible ? "blur-sm" : ""}`}>
        <div className="relative bg-white overflow-hidden h-auto pt-8">
          {/* Background Houses */}
          <img
            className="absolute top-5 sm:top-10 right-0 w-[120px] sm:w-[237px] h-[200px] sm:h-[400px] opacity-80"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute bottom-0 left-0 w-[140px] sm:w-[270px] h-[210px] sm:h-[610px] opacity-50"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute bottom-0 right-10 w-[150px] sm:w-[250px] h-[200px] sm:h-[420px] opacity-70"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute top-[25%] sm:top-[20%] right-[15%] w-[160px] sm:w-[277px] h-[180px] sm:h-[284px] opacity-70"
            src={House}
            alt="Decorative House"
          />
          <img
            className="absolute top-[30%] sm:top-[25%] left-[10%] w-[170px] sm:w-[250px] h-[200px] sm:h-[404px] opacity-50"
            src={House}
            alt="Decorative House"
          />

          {/* Main Content */}
          <div className=" z-10 flex flex-col items-center justify-center py-16 sm:py-32 space-y-6">
            <h1 className="text-2xl sm:text-5xl font-bold font-poppins text-black">
              Rooms
            </h1>
            <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
              Find the perfect room for you
            </p>
            <img
              className="w-[100px] sm:w-[171px] h-[140px] sm:h-[340px] opacity-90 mt-4"
              src={Category}
              alt="Category Icon"
            />
          </div>

          {/* Footer Section */}
          <div className="card-section relative z-10 -mt-20 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 py-4 space-y-4 sm:space-y-0 sm:w-full">
            <p className="text-sm sm:text-lg font-poppins text-gray-600">
              Home \ Rooms
            </p>
            <div className="flex items-center bg-white gap-4 justify-between px-3 pt-8 max-xs:w-full cursor-pointer">
              <span
                onClick={() => {
                  localStorage.removeItem("location");
                  setLocation(null);
                }}
              >
                {location && location.length > 20
                  ? location?.slice(0, 25) + "..."
                  : location}
              </span>
              <button className="sm:hidden" onClick={handleToggleFilter}>
                <img src="filter.svg" className="w-6 h-6" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black mx-auto w-[85%] sm:w-[94%] h-[1px] ml-[6] mt-1"></div>
      </div>
      {/* filter button for mobile screen */}
      <>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="px-4">
            <div className="font-poppins py-6 flex gap-2">
              {/* advance Filter */}
              <div
                className={`fixed inset-x-0 bottom-0 z-50 w-full h-[80vh] bg-white shadow-lg transform ${
                  isFilterVisible ? "translate-y-0" : "translate-y-full"
                } transition-transform duration-300 ease-in-out sm:relative sm:translate-y-0 sm:w-1/5 sm:h-auto sm:shadow-none flex flex-col sm:mx-6 border-t-[.5px] sm:border-[.5px] p-4 sm:rounded-lg border-gray-900 overflow-y-auto`}
              >
                <button
                  className="sm:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={handleToggleFilter}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="text-2xl text-center w-full">
                  FILTERS & SORTING
                </div>
                {/* divider */}
                <div className="border-b border-gray-400 my-2"></div>
                {/* Price Range Slider with Min-Max Input */}
                <div className="flex flex-col space">
                  <label className="text-lg">By Budget</label>
                  <label className="text-xs mb-4">Choose a range below</label>
                  <div className="flex items-center space-x-2">
                    <PriceRangeSlider
                      min={0}
                      max={100000}
                      step={100}
                      defaultValue={[0, 100000]}
                      onRangeChange={handlePriceRangeChange}
                    />
                  </div>
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* By Bedrooms */}
                <div className="flex flex-col space">
                  <label className="text-lg">By Bedrooms</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {["1BHK", "2BHK", "3BHK", "4BHK", "4+BHK"].map((e) => (
                    <div
                      className={`p-2 px-4 border-[.5px] border-gray-950 mb-3 rounded-lg hover:border-blue-500 cursor-pointer ${
                        advanceFilter.bedrooms === e
                          ? "bg-[#bedbfe] border-blue-500"
                          : ""
                      }`}
                      onClick={() =>
                        setAdvanceFilter((prev) => ({ ...prev, bedrooms: e }))
                      }
                      key={e}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* By Bathroom */}
                <div className="flex flex-col space">
                  <label className="text-lg">By Bathroom</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {/* set active also */}
                  {["1 Bathroom", "2 Bathrooms", "3 Bathrooms"].map((e) => (
                    <div
                      className={`p-2 px-4 border-[.5px] border-gray-950 mb-3 rounded-lg hover:border-blue-500 cursor-pointer ${
                        advanceFilter.bathroom === e
                          ? "bg-[#bedbfe] border-blue-500"
                          : ""
                      }`}
                      onClick={() =>
                        setAdvanceFilter((prev) => ({ ...prev, bathroom: e }))
                      }
                      key={e}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* By Furnishing checkbox */}
                <div className="flex flex-col space">
                  <label className="text-lg">By Furnishing</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {["Furnished", "Semi-Furnished", "Unfurnished"].map((e) => (
                    <div className="p-2 px-4  mb-3" key={e}>
                      <input
                        type="checkbox"
                        onClick={() =>
                          setAdvanceFilter((prev) => ({
                            ...prev,
                            furnishing: [...prev.furnishing, e],
                          }))
                        }
                        className="mr-2"
                      />

                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* By Listed checkbox */}
                <div className="flex flex-col space">
                  <label className="text-lg">Listed By</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {["Owner", "Tenant / Rental"].map((e) => (
                    <div className="p-2 px-4  mb-3" key={e}>
                      <input
                        type="checkbox"
                        onClick={() =>
                          setAdvanceFilter((prev) => ({
                            ...prev,
                            listedBy: [...prev.listedBy, e],
                          }))
                        }
                        className="mr-2"
                      />
                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* By Bachelors */}
                <div className="flex flex-col space">
                  <label className="text-lg">By Bachelors</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {["Yes ", "No"].map((e) => (
                    <div
                      className={`p-2 px-4 border-[.5px] border-gray-950 mb-3 rounded-lg hover:border-blue-500 cursor-pointer
                    ${
                      advanceFilter.bachelors === e
                        ? "bg-[#bedbfe] border-blue-500"
                        : ""
                    }`}
                      onClick={() =>
                        setAdvanceFilter((prev) => ({ ...prev, bachelors: e }))
                      }
                      key={e}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* Price per Sqft min max slider */}
                <div className="flex flex-col space">
                  <label className="text-lg">Price per Sqft</label>
                  <label className="text-xs mb-4">Choose a range below</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 border-[.5px] p-1 rounded-md"
                      onChange={(e) =>
                        setAdvanceFilter((prev) => ({
                          ...prev,
                          pricePerSqft: {
                            ...prev.pricePerSqft,
                            min: +e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 border-[.5px] p-1 rounded-md"
                      onChange={(e) =>
                        setAdvanceFilter((prev) => ({
                          ...prev,
                          pricePerSqft: {
                            ...prev.pricePerSqft,
                            max: +e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* Sort By */}
                <div className="flex flex-col space">
                  <label className="text-lg">Sort By</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {[
                    "Price: Low to High",
                    "Price: High to Low",
                    "Featured & Verified Listing",
                  ].map((e) => (
                    <div
                      className={`p-2 px-4 border-[.5px] border-gray-950 mb-3 rounded-lg hover:border-blue-500 cursor-pointer
                    ${
                      advanceFilter.sortBy === e
                        ? "bg-[#bedbfe] border-blue-500"
                        : ""
                    }`}
                      onClick={() =>
                        setAdvanceFilter((prev) => ({ ...prev, sortBy: e }))
                      }
                      key={e}
                    >
                      {e}
                    </div>
                  ))}
                </div>
                <div className="border-b border-gray-400 my-2"></div>
                {/* Buttons */}
                <div className="flex justify-between my-4">
                  <button
                    className="py-2 px-5 rounded-lg border-[.5px] border-black active:bg-[#bedbfe] active:scale-95 transform transition-transform"
                    onClick={() => {
                      handleClearFilter();
                      document
                        .querySelector(".card-section")
                        .scrollIntoView({ behavior: "smooth" });
                      setIsFilterVisible(false);
                    }}
                  >
                    Clear
                  </button>
                  <button
                    // add transition of .5s
                    className="py-2 px-5 rounded-lg border-[.5px] border-black active:bg-[#bedbfe] active:scale-95 transform transition-transform"
                    onClick={() => {
                      handleFilter();
                      document
                        .querySelector(".card-section")
                        .scrollIntoView({ behavior: "smooth" });
                      setIsFilterVisible(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className={isFilterVisible ? "blur-sm" : ""}>
                <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {roomList.length > 0 ? (
                    <>
                      {roomList.slice(0, visibleItems).map((room, index) => (
                        <div key={index}>
                          <ProductCard
                            title={room.roomName}
                            desc={room.description || "No Description"}
                            img={room.images?.[0]} // Safe navigation for images array
                            price={room.monthlyMaintenance}
                            location={room.location}
                            link={`/room/${room._id}`}
                            verified={room.uid?.verified || false}
                            isFeatureListing={room.uid?.isFeatureListing}
                            isWishlisted={wishlist.includes(room._id)}
                            toggleWishlist={() => toggleWishlist(room._id)}
                            distance={room.distance}
                          />
                        </div>
                      ))}
                      {visibleItems < roomList.length && (
                        <div className="col-span-full flex justify-center mt-4">
                          <button
                            onClick={loadMore}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                          >
                            Show More
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-2xl font-bold">
                      No Rooms Found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {/* Eighth Division  */}
      <div
        className={`bg-[#f8f8f8] flex flex-col items-center justify-center py-12 px-4 sm:px-8 lg:flex-row lg:py-16 ${
          isFilterVisible ? "blur-sm" : ""
        }`}
      >
        {/* Left Section: Text Content */}
        <div className="flex flex-col space-y-6 text-center lg:text-left lg:max-w-md">
          <h2 className="text-black text-2xl sm:text-3xl lg:text-4xl font-medium font-poppins">
            Connect with us
            <br />
            <span>from anywhere you want</span>
          </h2>
          <p className="text-black text-lg sm:text-xl font-light">
            Download our app to get{" "}
            <span className="font-semibold">a Rampage Experience</span>
          </p>
          {/* App Download Buttons */}
          <div className="flex !-mt-4 sm:space-x-4 space-y-4 sm:space-y-0 items-center justify-center lg:justify-start">
            <button>
              <img
                className="w-36 sm:w-44 lg:w-48 transition-transform hover:scale-105"
                src={GooglePlay}
                alt="Download on Google Play"
              />
            </button>
            <button>
              <img
                className="w-36 -mt-5 sm:mt-0 sm:w-44 lg:w-48 transition-transform hover:scale-105"
                src={AppStore}
                alt="Download on App Store"
              />
            </button>
          </div>
        </div>

        {/* Right Section: Phone Image */}
        <div className="">
          <img
            className="w-64 sm:w-80 lg:w-[35rem] mx-auto"
            src={SecondPhone}
            alt="App Preview on Phone"
          />
        </div>
      </div>
      <div className={isFilterVisible ? "blur-sm" : ""}>
        <Footer />
      </div>
    </>
  );
}

export default RoomsPage;
