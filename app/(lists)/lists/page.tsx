"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/_components/Navbar";
import { IActivityList } from "../../_types/IActivityList";
import { useRouter } from "next/navigation";


export default function ListPage() {
  const [lists, setLists] = useState<IActivityList[]>([]);
  const [error, setError] = useState<string>("");
  const token = sessionStorage.getItem("authToken");
  const router = useRouter();
  
  const navigateToCreateList = () => {
    router.push("/list/create")
    }

  useEffect(() => {
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetch("http://localhost:8080/activities/lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setLists)
      .catch(() => setError("Failed to load lists."));
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="max-w-sm mx-auto p-6 bg-cyan-700 shadow-md rounded-lg mt-10">
        <h1 className="text-xl font-bold text-center text-white mb-6">My Lists</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="my-8">

          {lists.length === 0 ? (
            <p className="text-center text-gray-300">No lists available.</p>
          ) : (
            <ul className="list-none">
              {lists.map((list) => (
                <li
                  key={list.trip_id}
                  className="my-2 p-4 bg-cyan-600 rounded-md shadow-lg"
                >
                  <h3 className="text-lg font-bold text-white">{list.name}</h3>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={navigateToCreateList}
          className="px-6 py-2 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-400">
              + Create new list
          </button>
      </div>
      
    </div>
  );
}
