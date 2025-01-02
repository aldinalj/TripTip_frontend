"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IFullTrip } from "@/app/_types/Trip";
import Navbar from "@/app/_components/Navbar";
import { IFullActivityList } from "@/app/_types/IActivityList";
import { IBudgetSummary } from "@/app/_types/IBudgetSummary";

export default function TripInfoPage() {
  const { tripId } = useParams();
  const router = useRouter();  

  const [trip, setTrip] = useState<IFullTrip | null>(null);
  const [activityLists, setActivityLists] = useState<IFullActivityList[]>([]);
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
        setBudgetSummaries(budgetSummariesData.budgets); 
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId, token]);

  const handleBudgetClick = (budgetId: number) => {
    router.push(`/spendings/${budgetId}`);
  };

  const handleListClick = (listId: number) => {
    router.push(`/activities/${listId}`);
  };

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

      <div className="bg-cyan-800 rounded-lg p-6 text-center mx-auto max-w-2xl m-3 border border-white">
          <h2 className="text-2xl text-white">{trip.name}</h2>
          <p className="text-white">Country: {trip.country}</p>
          <p className="text-white">
            Duration: {trip.start_date} - {trip.end_date}
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div className="rounded-lg p-4">
    <h2 className="text-xl text-white m-3">Budgets</h2>
    {budgetSummaries.length > 0 ? (
      <div className="space-y-4">
        {budgetSummaries.map((summary) => (
          <div
            key={summary.budgetId}
            className="bg-cyan-800 p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
            onClick={() => handleBudgetClick(summary.budgetId)}
          >
            <h1 className="text-4xl font-semibold text-white">
              {summary.budgetName}
            </h1>
            <p className="text-xl text-cyan-600">
              {summary.moneySpent} / {summary.budgetTotal}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-white">No budgets found.</p>
    )}
  </div>

  <div className="rounded-lg p-4">
    <h2 className="text-xl text-white m-3">Activity Lists</h2>
    {activityLists.length > 0 ? (
      <div className="space-y-4">
        {activityLists.map((list) => (
          <div
            key={list.trip_id}
            className="bg-cyan-800 p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
            onClick={() => handleListClick(list.id)}
          >
            <h1 className="text-4xl font-semibold text-white">{list.name}</h1>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-white">No activity lists found.</p>
    )}
  </div>
</div>
    </main>
  );
}
