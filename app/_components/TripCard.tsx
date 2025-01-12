"use client";

import { useRouter } from "next/navigation";
import { IFullTrip } from "../_types/Trip";

export interface ITripCardProps {
  trip: IFullTrip;
}

const TripCard: React.FC<ITripCardProps> = ({ trip }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/trip/${trip.id}`);
  };

  return (
    <div
      className="trip-card relative p-6 m-4 rounded-lg w-80 h-60 bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 overflow-hidden"
      onClick={handleClick}
    >
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
    </div>
  );
};
export default TripCard;
