import { ITripCardProps } from "../_types/ITripCardProps";

const TripCard: React.FC<ITripCardProps> = ({ trip }) => {
  return (
    <div className="trip-card relative p-6 m-4 rounded-lg w-80 h-60 bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950 to-transparent opacity-70 pointer-events-none"></div>

      <h2 className="text-3xl font-bold text-left text-white mb-4 z-10 relative">
        {trip.name}
      </h2>

      <p className="text-lg text-cyan-100 text-left mb-4 z-10 relative">
        {trip.country}
      </p>

      <p className="text-sm text-cyan-200 text-left font-light z-10 relative">
        <span className="font-medium">{trip.start_date}</span>
        <span className="mx-2">-</span>
        <span className="font-medium">{trip.end_date}</span>
      </p>

      <button className="absolute bottom-4 left-4 bg-cyan-800 border-2 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300">
        View Details
      </button>
    </div>
  );
};
export default TripCard;
