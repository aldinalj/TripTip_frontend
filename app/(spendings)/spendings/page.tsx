"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import LogInToAccess from "@/app/_components/LogInToAccess";
import { ISpending } from "@/app/_types/ISpending";

export default function AllSpendingsPage() {
  const [spendings, setSpendings] = useState<ISpending[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();

  const navigateToCreateSpending = () => {
    router.push("/spending/create");
  };

  useEffect(() => {
    fetch("http://localhost:8080/spendings", {
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

      .then((data: ISpending[]) => {
        setSpendings(data);
      })

      .catch((error) =>
        setError(
          error.message || "Something went wrong when fetching your spendings."
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
            <h1 className="text-3xl font-bold text-center text-white mb-6">
              All Spendings
            </h1>

            {spendings.length === 0 ? (
              <p className="text-center text-gray-300">No spendings found.</p>
            ) : (
              <div className="space-y-4">
                {spendings.map((spending, index) => (
                  <div
                    key={index}
                    className="bg-cyan-800 p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <h1 className="text-4xl font-semibold text-white">
                      {spending.name}
                    </h1>
                    <p className="text-xl text-cyan-600">{spending.desc}</p>
                    <p className="text-2xl text-cyan-950 font-bold">
                      Money Spent: {spending.money_spent}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={navigateToCreateSpending}
              className="px-6 py-4 m-4 bg-cyan-800 text-white font-medium rounded hover:bg-cyan-600 rounded-lg border border-gray-200"
            >
              + Create new spending
            </button>
          </div>
        </>
      ) : (
        <LogInToAccess />
      )}
    </>
  );
}
