"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IFullTrip } from "@/app/_types/Trip";
import Navbar from "@/app/_components/Navbar";
import { IActivityList } from "@/app/_types/IActivityList";
import { IBudgetSummary } from "@/app/_types/IBudgetSummary";

export default function TripInfoPage() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<IFullTrip | null>(null);
  const [activityLists, setActivityLists] = useState<IActivityList[]>([]);
  const [budgetSummaries, setBudgetSummaries] = useState<IBudgetSummary[]>([]);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!tripId) return;
  
    const fetchTripData = async () => {
      setLoading(true);
      setError("");
  
      try {
        const tripResponse = await fetch(
          `http://localhost:8080/trips/trip/${tripId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!tripResponse.ok) {
          throw new Error("Failed to fetch trip details.");
        }
        const tripData = await tripResponse.json();
        setTrip(tripData);
  
        const activityListsResponse = await fetch(
          `http://localhost:8080/activities/lists/${tripId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!activityListsResponse.ok) {
          throw new Error("Failed to fetch activity lists.");
        }
        const activityListsData = await activityListsResponse.json();
        setActivityLists(activityListsData);
  
        const budgetSummariesResponse = await fetch(
          `http://localhost:8080/budgets/${tripId}/summaries`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!budgetSummariesResponse.ok) {
          throw new Error("Failed to fetch budget summaries.");
        }
        const budgetSummariesData = await budgetSummariesResponse.json();
        console.log(budgetSummariesData);
        setBudgetSummaries(budgetSummariesData.budgets); 
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTripData();
  }, [tripId, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!trip) {
    return <p>No trip found.</p>;
  }

  return (
    <main>
      <Navbar />
      <div className="p-8 grid gap-8 grid-cols-1">
        <div className="bg-cyan-900 rounded-lg p-6 text-center mx-auto max-w-2xl">
          <h2 className="text-2xl text-white">{trip.name}</h2>
          <p className="text-white">Country: {trip.country}</p>
          <p className="text-white">
            Duration: {trip.start_date} - {trip.end_date}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-cyan-800 rounded-lg p-4">
  <h2 className="text-xl text-white">Budgets</h2>
  {budgetSummaries.length > 0 ? (
    <ul>
      {budgetSummaries.map((summary) => (
        <li key={summary.budgetId} className="text-white mb-4">
          <p>
            <strong>{summary.budgetName}:</strong>
          </p>
          <p>{summary.moneySpent} / {summary.budgetTotal}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-white">No budgets found.</p>
  )}
</div>


          <div className="bg-cyan-800 rounded-lg p-4">
            <h2 className="text-xl text-white">Activity Lists</h2>
            {activityLists.length > 0 ? (
              <ul>
                {activityLists.map((list) => (
                  <li key={list.id} className="text-white">
                    {list.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No activity lists found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
