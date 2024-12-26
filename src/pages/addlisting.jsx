import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Roomimg from '../assets/42.svg';
import hostelimg from '../assets/43.svg';
import bhojnalay from '../assets/44.svg';
import officeimg from '../assets/45.svg';
import flatmate from '../assets/47.svg';
import DownloadPromo from "../components/DownloadPromo";
import Footer from '../components/footer';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function AddListing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Check if the window is scrolled down
      setIsScrolled(window.scrollY > 0);
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Placeholder function for login button click
  const handleLoginClick = () => {
    // Define what should happen on login click
    console.log("Login button clicked");
  };

  const handleFlatClick = () => {
    navigate('/addrooms')
  };

  const handleFlatmateClick = () => {
    navigate('/addroommate')
  };

  const handleHostelClick = () => {
    navigate('/addhostel')
  };

  const handleOfficeClick = () => {
    navigate('/addoffice')
  };

  const handleBhojanalayClick = () => {
    navigate('/addbhojanalay')
  };

  return (
    <>
      <Navbar />
      {/* Requirement Section */}
      <div className="pt-32">

        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center">
          List Your Requirement
        </h1>
        <p className="text-gray-600 mb-8 text-center text-sm sm:text-base px-14">
          Get your connection or customers today! Post your needs, get it in your feeds.
        </p>
      </div>
      <div className="h-auto pb-10 flex flex-col items-center px-4">

        {/* Row 1 */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-6">
          {/* Flat/Room Card */}
          <div
            className="relative w-[100px] h-[130px] sm:w-[200px] sm:h-[230px] lg:w-[300px] lg:h-[330px] xl:w-[400px] xl:h-[430px] p-4 rounded-lg shadow-xl bg-[#E4C1F9] flex flex-col items-start cursor-pointer"
            onClick={handleFlatClick}
          >
            <h2 className="text-[#545454] mt-0 ml-1 sm:mt-2 sm:ml-4 xl:mt-6 xl:ml-8 text-start text-[8px] sm:text-base lg:text-xl xl:text-3xl font-semibold block">
              Want To List Your <br />
              <span className="text-[8px] sm:text-base lg:text-2xl xl:text-3xl font-bold">Flat/Room?</span>
            </h2>
            <img src={Roomimg} alt="Flat/Room" className="absolute bottom-0 right-2 h-2/3 w-2/3" />
          </div>

          {/* Flatmate Card */}
          <div
            className="relative w-[100px] h-[130px] sm:w-[200px] sm:h-[230px] lg:w-[300px] lg:h-[330px] xl:w-[400px] xl:h-[430px] p-4 rounded-lg shadow-xl bg-[#A9DEF9] flex flex-col items-start cursor-pointer"
            onClick={handleFlatmateClick}
          >
            <h2 className="text-[#545454] mt-0 ml-1 sm:mt-2 sm:ml-4 xl:mt-6 xl:ml-8 text-start text-[8px] sm:text-base lg:text-xl xl:text-3xl font-semibold block">
              Want To Become <br />
              <span className="text-[8px] sm:text-base lg:text-2xl xl:text-3xl font-bold">RoomMate?</span>
            </h2>
            <img src={flatmate} alt="Flatmate" className="absolute bottom-0 right-2 h-2/3 w-2/3" />
          </div>

          {/* Hostel/PG Card */}
          <div
            className="relative w-[100px] h-[130px] sm:w-[200px] sm:h-[230px] lg:w-[300px] lg:h-[330px] xl:w-[400px] xl:h-[430px] p-4 rounded-lg shadow-xl bg-[#FCF6BD] flex flex-col items-start cursor-pointer"
            onClick={handleHostelClick}
          >
            <h2 className="text-[#545454] mt-0 ml-1 sm:mt-2 sm:ml-4 xl:mt-6 xl:ml-8 text-start text-[8px] sm:text-base lg:text-xl xl:text-3xl font-semibold block">
              Want To List Your <br />
              <span className="text-[8px] sm:text-base lg:text-2xl xl:text-3xl font-bold">Hostel/PG</span>
            </h2>
            <img src={hostelimg} alt="Hostel/PG" className="absolute bottom-0 right-2 h-2/3 w-2/3" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-4 sm:gap-6">
          {/* Office Space Card */}
          <div
            className="w-[100px] h-[130px] sm:w-[200px] sm:h-[230px] lg:w-[300px] lg:h-[330px] xl:w-[400px] xl:h-[430px] p-4 rounded-lg shadow-xl bg-[#D0F4DE] flex flex-col items-start cursor-pointer relative"
            onClick={handleOfficeClick}
          >
            <h2 className="text-[#545454] mt-0 ml-1 sm:mt-2 sm:ml-4 xl:mt-6 xl:ml-8 text-start text-[8px] sm:text-base lg:text-xl xl:text-3xl font-semibold block">
              Want To List Your <br />
              <span className="text-[8px] sm:text-base lg:text-2xl xl:text-3xl font-bold">Office Space?</span>
            </h2>
            <img src={officeimg} alt="Office Space" className="absolute bottom-0 right-2 h-2/3 w-2/3" />
          </div>

          {/* Bhojanalay Card */}
          <div
            className="relative w-[100px] h-[130px] sm:w-[200px] sm:h-[230px] lg:w-[300px] lg:h-[330px] xl:w-[400px] xl:h-[430px] p-4 rounded-lg shadow-xl bg-[#FF99C8] flex flex-col items-start cursor-pointer"
            onClick={handleBhojanalayClick}
          >
            <h2 className="text-[#545454] mt-0 ml-1 sm:mt-2 sm:ml-4 xl:mt-6 xl:ml-8 text-start text-[8px] sm:text-base lg:text-xl xl:text-3xl font-semibold block">
              Want To List Your <br />
              <span className="text-[8px] sm:text-base lg:text-2xl xl:text-3xl font-bold">Bhojnalay?</span>
            </h2>
            <img src={bhojnalay} alt="Bhojnalay" className="absolute bottom-0 right-2 h-2/3 w-2/3" />
          </div>
        </div>

      </div>


      <DownloadPromo />
      <Footer />
    </>


  );
}

export default AddListing;
