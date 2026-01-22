const PlacementCard = ({ title, placement, image }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48 bg-black flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-3 border border-red-500 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
        {title}
      </div>
      

      <p className="text-sm text-gray-600 mt-1">
        {placement} Placement
      </p>
    </div>
  );
};

export default PlacementCard;
