import GridCardLike from "../components/CardLike";
import Category from "../assets/category.svg";
import House from "../assets/House.svg";
import Filter from "../assets/filter.png";
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/mobile.webp";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { axiosI } from "../axios";
import { useLocationContext } from "../../utils/LocationContext";
import PriceRangeSlider from "../components/PriceRangeSlider";
import ProductCard from "./Demo";
import Overlay from "../components/Overlay";

function HostelsPage() {
  const [HostelsList, setHostelsList] = useState([]);
  const [filteredHostelsList, setFilteredHostelsList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { userLocation, fetchLocation } = useLocationContext();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [advanceFilter, setAdvanceFilter] = useState({
    budget: {
      min: 0,
      max: 0,
    },
    subType: [],
    sortBy: "",
    sharing: "",
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", location);
    }
  }, [location]);

  const handleFilter = async () => {
    setVisibleItems(8); // Reset when filtering
    const { data } = await axiosI.post("/filter/hostels", advanceFilter);
    console.log(data);
    setHostelsList(data);
  };

  const handleClearFilter = () => {
    setVisibleItems(8); // Reset when clearing filter
    setAdvanceFilter({
      budget: {
        min: 0,
        max: 0,
      },
      subType: [],
      sharing: "",
      sortBy: "",
    });

    // Fetch hostels with filter and userLocation
    fetchHostels();
  };

  const handlePriceRangeChange = (range) => {
    setAdvanceFilter((prev) => ({
      ...prev,
      budget: {
        min: range[0],
        max: range[1],
      },
    }));
  };

  const fetchHostels = async () => {
    if (!userLocation) return;
    setLoading(true);
    try {
      const { data } = await axiosI.get("/hostels", {
        params: {
          filter,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
        },
      });
      setHostelsList(data);
      if (data) {
        const res = await axiosI.get("/wishlist");
        setWishlist(
          Array.isArray(res?.data?.itemIds) ? res?.data?.itemIds : []
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    setAdvanceFilter((prev) => {
      return {
        ...prev,
        lat: userLocation?.lat,
        lng: userLocation?.lng,
      };
    });
    // Fetch hostels
    fetchHostels();
    // Fetch wishlist items
  }, [filter, userLocation]);

  const toggleWishlist = (id) => {
    console.log("Toggling wishlist for: ", id);

    const isWishlisted = wishlist.includes(id);
    console.log("isWishlisted: ", isWishlisted);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType: "Hostel" })
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
  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  return (
    <>
      <Navbar isFilterVisible={isFilterVisible} />
      {!location && <Overlay setLocation={setLocation} location={location} />}
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
          <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-32 space-y-6">
            <h1 className="text-2xl sm:text-5xl font-bold font-poppins text-black">
              Hostels
            </h1>
            <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
              Find the perfect hostels for you
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
              Home \ Hostels
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

      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <div className="px-4">
          <div className="font-poppins py-6 flex gap-2">
            {/* Filter Panel */}
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

              {/* By Furnishing checkbox */}
              <div className="flex flex-col space">
                <label className="text-lg">By Category</label>
                <label className="text-xs mb-4">
                  Choose from below options
                </label>
                {["Boys", "Girls"].map((e) => (
                  <div className="p-2 px-4  mb-3" key={e}>
                    <input
                      type="checkbox"
                      onClick={() =>
                        setAdvanceFilter((prev) => ({
                          ...prev,
                          subType: [...prev.subType, e],
                        }))
                      }
                      className="mr-2"
                    />

                    {e}
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-400 my-2"></div>
              {/* By Sharing */}
              <div className="flex flex-col space">
                <label className="text-lg">Sharing</label>
                <label className="text-xs mb-4">
                  Choose from below options
                </label>
                {[
                  "Single Sharing",
                  "Double Sharing",
                  "Three Sharing",
                  "Four Sharing",
                ].map((e) => (
                  <div
                    className={`p-2 px-4 border-[.5px] border-gray-950 mb-3 rounded-lg hover:border-blue-500 cursor-pointer
                    ${
                      advanceFilter.sharing === e
                        ? "bg-[#bedbfe] border-blue-500"
                        : ""
                    }`}
                    onClick={() =>
                      setAdvanceFilter((prev) => ({ ...prev, sharing: e }))
                    }
                    key={e}
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div className="border-b border-gray-400 my-2"></div>

              {/* Sort By */}
              <div className="flex flex-col space">
                <label className="text-lg">Sort By</label>
                <label className="text-xs mb-4">
                  Choose from below options
                </label>
                {["Price: Low to High", "Price: High to Low"].map((e) => (
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
              <div className="flex justify-between mt-4">
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

            {/* Hostel Cards */}
            <div className={isFilterVisible ? "blur-sm" : ""}>
              <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {HostelsList.length > 0 ? (
                  <>
                    {HostelsList.slice(0, visibleItems).map((hostel, index) => (
                      <div key={index}>
                        <ProductCard
                          title={hostel?.hostelName}
                          desc={hostel?.description}
                          img={hostel?.images[0]}
                          price={hostel?.rent}
                          location={hostel?.location}
                          link={`/Hostel/${hostel?._id}`}
                          verified={hostel?.uid?.verified}
                          isFeatureListing={hostel?.uid?.isFeatureListing}
                          isWishlisted={wishlist?.includes(hostel?._id)}
                          toggleWishlist={() => toggleWishlist(hostel._id)}
                          distance={hostel.distance}
                        />
                      </div>
                    ))}
                    {visibleItems < HostelsList.length && (
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
                    No Hostels Found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

export default HostelsPage;
