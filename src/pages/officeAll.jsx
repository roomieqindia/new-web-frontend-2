import GridCardLike from "../components/CardLike";
import Category from "../assets/category.svg";
import House from "../assets/House.svg";
import Filter from "../assets/filter.png";
import Footer from "../components/footer";
import AppStore from "../assets/AppStore.svg";
import GooglePlay from "../assets/GooglePlay.svg";
import SecondPhone from "../assets/SecondPhone.svg";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { axiosI } from "../axios";
import { useLocation } from "../../utils/LocationContext";
import PriceRangeSlider from "../components/PriceRangeSlider";
import ProductCard from "./Demo";
import Overlay from "../components/Overlay";

function OfficePage() {
  const [OfficeList, setOfficeList] = useState([]);
  const [filteredOfficeList, setFilteredOfficeList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { userLocation, fetchLocation } = useLocation();
  const [advanceFilter, setAdvanceFilter] = useState({
    priceRange: {
      min: 0,
      max: 0,
    },
    furnishing: [],
    listedBy: [],
    superBuildArea: {
      min: "",
      max: "",
    },
    sortBy: "",
    lat: userLocation?.lat,
    lng: userLocation?.lng,
  });
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (location) {
      localStorage.setItem("location", location);
    }
    setLoading(false);
  }, [location]);

  useEffect(() => {
    const l = localStorage.getItem("location");
    setLocation(l);
  }, []);

  const handleFilter = async () => {
    // Filter offices with advanceFilter
    const { data } = await axiosI.post("/filter/offices", advanceFilter);
    setOfficeList(data);
    console.log(data);
  };

  const handleClearFilter = () => {
    setAdvanceFilter({
      budget: {
        min: 0,
        max: 0,
      },
      furnishing: [],
      listedBy: [],
      superBuildArea: {
        min: "",
        max: "",
      },
      sortBy: "",
    });

    // Fetch office with filter and userLocation
    fetchOffice();
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
  const handleSuperBuildAreaChange = (range) => {
    setAdvanceFilter((prev) => ({
      ...prev,
      superBuildArea: {
        min: range[0],
        max: range[1],
      },
    }));
  };
  const fetchOffice = () => {
    axiosI
      .get("/office-listings", {
        params: {
          filter,
          lat: userLocation?.lat,
          lng: userLocation?.lng,
        },
      })
      .then((res) => {
        setOfficeList(res.data);
        setLoading(false);
      });
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

    })
    fetchOffice();
    axiosI.get("/wishlist").then((res) => {
      setWishlist(Array.isArray(res.data.itemIds) ? res.data.itemIds : []);
    });
  }, [filter, userLocation]);
  const toggleWishlist = (id) => {
    console.log("Toggling wishlist for: ", id);

    const isWishlisted = wishlist.includes(id);
    console.log("isWishlisted: ", isWishlisted);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType: "Office" })
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

  // useEffect(() => {
  //   const filtered = OfficeList.filter((office) => {
  //     return (
  //       office.officeName.toLowerCase().includes(filter.toLowerCase()) ||
  //       office.location.toLowerCase().includes(filter.toLowerCase())
  //     );
  //   });
  //   const sorted = filtered.sort((a, b) => {
  //     if (b.uid.isFeatureListing && !a.uid.isFeatureListing) return 1;
  //     if (a.uid.isFeatureListing && !b.uid.isFeatureListing) return -1;
  //     return 0;
  //   });
  //   setFilteredOfficeList(sorted);
  // }, [filter, OfficeList]);

  return (
    <>
      <Navbar />
      {!location && <Overlay setLocation={setLocation} location={location} />}
      <div className="mb-[20px]">
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
              Offices
            </h1>
            <p className="text-lg sm:text-2xl font-light font-poppins text-gray-700">
              Find the perfect office for you
            </p>
            <img
              className="w-[100px] sm:w-[171px] h-[140px] sm:h-[340px] opacity-90 mt-4"
              src={Category}
              alt="Category Icon"
            />
          </div>

          {/* Footer Section */}
          <div className="card-section relative z-50 -mt-20 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-16 py-8 space-y-4 sm:space-y-0">
            <p className="text-sm sm:text-lg font-poppins text-gray-600">
              Home \ Offices
            </p>
            <div className="flex items-center bg-white gap-4">
              {location?.split(",").slice(0, 3).join(", ")}
              <button
                className="text-gray-500 hover:text-white bg-gray-100 hover:bg-slate-500 px-3 py-1 border border-gray-500 rounded-md transition duration-200"
                onClick={() => {
                  localStorage.removeItem("location");
                  setLocation(null);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black mx-auto w-[85%] sm:w-[94%] h-[1px] ml-[6] mt-3"></div>
      </div>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : (
        <>
          <div className="px-4">
            <div className="font-poppins py-6 flex gap-2">
              <div className="flex flex-col mx-6 w-1/5 border-[.5px] p-4 rounded-lg border-gray-900 filter-cnt ">
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
                  <label className="text-lg">By Furnishing</label>
                  <label className="text-xs mb-4">
                    Choose from below options
                  </label>
                  {["Furnished", "Semi-furnished", "Unfurnished"].map((e) => (
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
                  {["Owner", "Broker"].map((e) => (
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
                  <label className="text-lg">By Super Build Area</label>
                  <label className="text-xs mb-4">Choose a range below</label>
                  <div className="flex items-center space-x-2">
                    <PriceRangeSlider
                      min={0}
                      max={100000}
                      step={100}
                      defaultValue={[0, 100000]}
                      onRangeChange={handleSuperBuildAreaChange}
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
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
              {/* Grid Container */}
              <div>
                <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {OfficeList.map((office, index) => (
                    <div key={index}>
                      <ProductCard
                        title={office.title}
                        desc={office.description}
                        img={office.images[0]}
                        price={office.monthlyMaintenance}
                        location={office.location}
                        link={`/office/${office._id}`}
                        verified={office.uid.verified}
                        isFeatureListing={office.uid.isFeatureListing}
                        isWishlisted={wishlist.includes(office._id)}
                        toggleWishlist={() => toggleWishlist(office._id)}
                        distance={office.distance}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full text-center">
            <button className="mt-[40px] bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]">
              View More Properties...
            </button>
          </div> */}
        </>
      )}

      {/* Eighth Division  */}
      <div className="bg-[#f8f8f8] flex flex-col items-center justify-center py-12 px-4 sm:px-8 lg:flex-row lg:py-16">
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

      <Footer />
    </>
  );
}

export default OfficePage;
