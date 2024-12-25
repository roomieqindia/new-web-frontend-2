const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-80 h-80 bg-gray-200 rounded-lg overflow-hidden relative"
          >
            <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-white to-gray-200" />
            <div className="h-40 bg-gray-300 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-2/3" />
            </div>
          </div>
        ))}
    </div>
  );
};
export default Shimmer;
