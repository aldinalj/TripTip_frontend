import React, { useState } from "react";
import { ITrip } from "../_types/Trip";

export interface ICreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripData: ITrip) => void;
}


const CreateTripModal: React.FC<ICreateTripModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [trip, setTrip] = useState<ITrip>({
    name: "",
    country: "",
    start_date: "",
    end_date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(trip);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center">
        <div className="p-8 rounded-lg w-96 bg-cyan-800 border-black border-2 ">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Create New Trip
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2 text-white">
                Trip Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={trip.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-lg mb-2 text-white"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={trip.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="start_date"
                className="block text-lg mb-2 text-white"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={trip.start_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="end_date"
                className="block text-lg mb-2 text-white"
              >
                End Date
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={trip.end_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-800 text-white px-4 py-2 rounded border-2 border-red-950"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-lime-800 text-white px-4 py-2 rounded border-2 border-lime-950"
              >
                Create Trip
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateTripModal;
