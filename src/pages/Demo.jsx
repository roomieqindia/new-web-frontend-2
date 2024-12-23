import React from "react";
import { Crown, Heart, MessageSquare, CheckCircle } from "lucide-react";

function ProductCard({
  title,
  description,
  price,
  location,
  imageUrl = "https://images.unsplash.com/photo-1734217673456-f93860a3fd23?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  isFeatured = false,
  isVerified = false,
}) {
  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-lg">
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[#FFF9C4] p-2 rounded-lg">
            <Crown className="w-5 h-5 text-[#FFD700]" />
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-4">
        {/* Title and Icons */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-medium text-gray-800">{title}</h3>
          <div className="flex items-center gap-2">
            <button className="hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-gray-500" />
            </button>
            {isVerified && (
              <CheckCircle className="w-6 h-6 text-blue-500 " />
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

        {/* Price and Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-gray-500">+</span>
          </div>
          <span className="text-gray-500 text-sm">{location}</span>
        </div>

        {/* Contact Button */}
        <button className="w-full py-3 px-6 bg-[#E0F2E9] hover:bg-[#D0E8D9] text-gray-700 rounded-full flex items-center justify-center gap-2 transition-colors">
          <span>Contact Now</span>
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const Demo = () => {
  return (
    <div>
      <div className="p-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0,1,2,3].map(() => (
          <ProductCard
            title="Title of the post"
            description='2020 Apple MacBook Air Laptop: Apple M1 Chip, 13" Retina Display'
            price={1024.99}
            location="Ashoka Garden, Bhopal"
            isFeatured={true}
            isVerified={true}
          />
        ))}
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

// export default ProductCard;
export default Demo;
