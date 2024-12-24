import React, { useState } from "react";
import { Crown, Heart, MessageSquare, CheckCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ProductCard({
  _id,
  title,
  desc,
  price,
  location,
  link,
  img,
  verified,
  isFeatureListing,
  isWishlisted,
  toggleWishlist,
  distance,
  type,
}) {
  const navigate = useNavigate();
  const [animateHeart, setAnimateHeart] = useState(false);
  const paramLocation = useLocation();
  const isMyListingsPage = paramLocation.pathname.includes("mylisting");

  const handleHeartClick = () => {
    setAnimateHeart(true);
    toggleWishlist();
    setTimeout(() => setAnimateHeart(false), 300);
  };

  const handleEdit = (id) => {
    const routes = {
      Bhojnalaya: "/addbhojanalay",
      Hostel: "/addhostel",
      Office: "/addoffice",
      Room: "/addrooms",
      Roommate: "/addroommate",
    };
    navigate(routes[type], { state: { id, update: true } });
  };

  return (
    <>
        <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-lg">
          {/* Featured Badge */}
          {isFeatureListing && (
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-[#FFF9C4] p-2 rounded-lg">
                <Crown className="w-5 h-5 text-[#FFD700]" />
              </div>
            </div>
          )}

          {/* Product Image */}
          <div className="relative aspect-[4/3] bg-gray-100">
            <img src={img} alt={title} className="object-cover w-full h-full" />
            {isMyListingsPage && (
              <button
                className="absolute bottom-4 right-4 bg-blue-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
                onClick={() => handleEdit(_id)}
              >
                Edit
              </button>
            )}
          </div>

          {/* Content Container */}
          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-medium text-gray-800">{title}</h3>
              <div className="flex items-center gap-2">
                <button
                  className={`hover:scale-110 transition-transform ${
                    isWishlisted ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={handleHeartClick}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                {verified && <CheckCircle className="w-6 h-6 text-blue-500 " />}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {desc.length>20 ? desc.slice(0, 20)+"..." : desc
            
              }

            </p>

            {/* Price and Location */}
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-baseline gap-1">
                {price && <span className="text-2xl font-bold">₹{price}</span>}
                {/* <span className="text-gray-500">+</span> */}
              </div>
              <span className="text-gray-500 text-sm">
                {location.slice(0, 25) + "..."}
              </span>
            </div>

            {/* Contact Button */}
            <Link
              to={link}
              className="w-full py-3 px-6 bg-[#E0F2E9] hover:bg-[#D0E8D9] text-gray-700 rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              <span>Contact Now</span>
              <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
    </>
  );
}

// export default ProductCard;
export default ProductCard;
