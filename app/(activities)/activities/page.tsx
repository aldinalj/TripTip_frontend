"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import LogInToAccess from "@/app/_components/LogInToAccess";
import { IActivity } from "@/app/_types/IActivity";

export default function AllActivitiesPage() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();

  const navigateToCreateActivity = () => {
    router.push("/activity/create");
  };

  useEffect(() => {
    fetch("http://localhost:8080/activities", {
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    
    <>
    <Navbar />
      {token ? (
        <>
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-white mb-6 m-3">
              All Activities
            </h1>

            {activities.length === 0 ? (
              <p className="text-center text-gray-300">No activities found.</p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-cyan-800 p-4 rounded-lg border border-gray-200"
                  >
                    <h1 className="text-4xl font-semibold text-white">
                      {activity.name}
                    </h1>
                
                    <p className="text-2xl text-cyan-500 font-bold">
                      Price range: {activity.price_min} - {activity.price_max}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={navigateToCreateActivity}
              className="px-6 py-4 m-4 bg-cyan-800 text-white font-medium rounded hover:bg-cyan-600 rounded-lg border border-gray-200"
            >
              + Create new activity
            </button>
          </div>
        </>
      ) : (
        <LogInToAccess />
      )}
    </>
  );
}
