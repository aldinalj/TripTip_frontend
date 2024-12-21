"use client";
import { useEffect, useState } from "react";
import { IFullTrip } from "@/app/_types/IFullTrip";
import TripCard from "@/app/_components/TripCard";
import Navbar from "@/app/_components/Navbar";

export default function AllTripsPage() {
  const [trips, setTrips] = useState<IFullTrip[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("authToken");

  const navLinks = [{ label: "About", href: "/about" }];

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

      .then((data: IFullTrip[]) => {
        setTrips(data);
      })

      .catch((error) =>
        setError(
          error.message || "Something went wrong when fetching your trips."
        )
      )

      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Navbar links={navLinks} />
      {token ? (
        <div>
          <h1 className="text-center mt-3 text-4xl text-white">Trips</h1>

          <div className="flex min-h-screen overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
              {trips.length > 0 ? (
                trips.map((trip) => <TripCard key={trip.id} trip={trip} />)
              ) : (
                <p>No trips found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold mb-6">
            Log in or register to access this page
          </h1>
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </main>
  );
}
