import PlacementCard from "./PlacementCard";

const PlacementGrid = ({ heading, data }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-10">
        {heading}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
        {data.map((item) => (
          <PlacementCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PlacementGrid;
