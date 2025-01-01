import { useState, useEffect } from "react";
import { IFullTrip } from "../_types/Trip";

type TripDropdownProps = {
  onTripSelect: (tripId: number | null) => void;
};

export default function TripDropdown({ onTripSelect }: TripDropdownProps) {
  const [trips, setTrips] = useState<IFullTrip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const token = sessionStorage.getItem("authToken");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8080/trips/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data: IFullTrip[]) => setTrips(data))
      .catch((error) => setError(error.message || "Failed to load trips."));
  }, []);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const tripId = Number(event.target.value);
    setSelectedTrip(tripId);
    onTripSelect(tripId); 
  };

  return (
    <div className="flex flex-col items-center p-4">
      <label htmlFor="trip-dropdown" className="mb-2 text-lg font-medium text-cyan-200">
        Select a Trip
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <select
        id="trip-dropdown"
        className="w-full max-w-sm p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-cyan-800"
        value={selectedTrip ?? ""}
        onChange={handleSelection}
      >
        <option value="" disabled>
          -- Select a Trip --
        </option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select>
    </div>
  );
}
