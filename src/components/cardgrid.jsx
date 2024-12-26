import { useEffect, useState } from "react";
import GridCardLike from "../components/CardLike"; // Import your GridCardLike component
import { axiosI } from "../axios";
import ProductCard from "../pages/Demo";

const GridComponent = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [wishlistData, setWishlistData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5); // Number of items to show initially

  // Fetch wishlist data from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosI.get("/wishlist");

        setWishlistData(response.data); // Store the response data
        setWishlist(
          Array.isArray(response.data.itemIds) ? response.data.itemIds : []
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    getData();
  }, []);

  // Handle toggling of wishlist
  const toggleWishlist = (id, itemType) => {
    const isWishlisted = wishlist.some((item) => item === id);

    axiosI
      .post("/wishlist/toggle", { itemId: id, itemType }) // Send the itemId and itemType
      .then((res) => {
        if (isWishlisted) {
          setWishlist((prev) => prev.filter((item) => item !== id));
        } else {
          setWishlist((prev) => [...prev, id]);
        }
      })
      .catch((err) => {
        console.error("Error toggling wishlist:", err);
      });
  };

  const loadMoreItems = () => {
    setItemsToShow((prev) => prev + 5); // Increase the number of items to show by 5
  };

  if (loading) {
    // Show loader while fetching data
    return (
      <div className="font-poppins px-4 sm:px-8 py-6 text-center">
        Loading wishlist...
      </div>
    );
  }

  if (!wishlistData || wishlist.length === 0) {
    // No data or empty wishlist
    return (
      <div className="font-poppins px-4 sm:px-8 py-6 text-center">
        No wishlist added.
      </div>
    );
  }

  return (
    <div className="font-poppins px-4 sm:px-8 py-6">
      {/* Grid Container */}
      <div>
        <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistData.populatedItems
            .slice(0, itemsToShow)
            .map((item, index) => {
              const { details, itemId, itemType } = item; // Destructure item details
              return (
                <ProductCard
                  key={index}
                  title={
                    details?.name ||
                    details?.bhojanalayName ||
                    details?.roomName ||
                    details?.officeName ||
                    details?.hostelName
                  }
                  desc={details?.description || "Description not available"}
                  // priceOfThali , monthlyMaintenance , rent
                  price={
                    details?.priceOfThali ||
                    details?.monthlyMaintenance ||
                    details?.rent ||
                    ""
                  }
                  occupation={details?.occupation || "Not specified"}
                  location={details?.location || "Location not specified"}
                  link={`/${details.type}/${itemId}`} // Example link, adjust according to your routing
                  img={details?.images[0] || "/default-image?.jpg"} // Placeholder image
                  verified={details?.uid?.verified || false}
                  isFeatureListing={details?.uid?.isFeatureListing || false}
                  isWishlisted={wishlist?.includes(itemId)}
                  toggleWishlist={() => toggleWishlist(itemId, itemType)}
                  distance={details?.distance}
                />
              );
            })}
        </div>
      </div>

      {/* View More Properties Button */}
      {itemsToShow < wishlistData.populatedItems.length && (
        <div className="w-full text-center mt-[40px]">
          <button
            onClick={loadMoreItems}
            className="bg-[#e4c1f9] w-[220px] sm:w-[370px] h-[60px] sm:h-[90px] rounded-[60px] font-normal text-lg sm:text-2xl border-b-4 border-gray-400 mb-[60px]"
          >
            View More Properties...
          </button>
        </div>
      )}
    </div>
  );
};

export default GridComponent;
