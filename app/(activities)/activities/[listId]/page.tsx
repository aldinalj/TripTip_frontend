"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { ISpending } from "@/app/_types/ISpending";
import LogInToAccess from "@/app/_components/LogInToAccess";
import { IActivity } from "@/app/_types/IActivity";

export default function TripInfoPage() {
  const { listId } = useParams();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!listId) {
      setError("List ID is missing.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/activities/${listId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data: IActivity[]) => {
        setActivities(data);
      })
      .catch((error) =>
        setError(
          error.message || "Something went wrong when fetching your activities."
        )
      )
      .finally(() => {
        setLoading(false);
      });
  }, [listId, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      {token ? (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              Activities
            </h1>

            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : activities.length === 0 ? (
              <p className="text-center text-gray-300">No activities found.</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-cyan-800 p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <h1 className="text-4xl font-semibold text-white">
                      {activity.name}
                    </h1>
                    <p className="text-xl text-cyan-600">Price range: {activity.price_min} - {activity.price_max}</p>
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <LogInToAccess />
      )}
    </>
  );
}
