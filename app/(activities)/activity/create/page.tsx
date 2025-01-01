"use client";
import ListDropDown from "@/app/_components/ListDropDown";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { IActivity } from "@/app/_types/IActivity";


export default function CreateActivty() {
  const [activity, setActivity] = useState<IActivity>({
    name: "",
    price_min: 0,
    price_max: 0,
    list_id: 0, 
    trip_id: 0
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = sessionStorage.getItem("authToken");

  


  function handleActivityChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity((prevData) => ({ ...prevData, [name]: name.includes("price") ? Number(value) : value }));
  }

  function handleListSelection(listId: number | null, tripId: number | null) {
    setActivity((prevData) => ({ ...prevData, list_id: listId ?? 0, trip_id: tripId ?? 0, }));
  }

  

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!activity.list_id) {
      setError("Please select a list.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8080/activities/create", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(activity),
    })
      .then((response) => {
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }

        alert("Activity created successfully!");
        router.push("/activities"); 
      })
      .catch((error) => {
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-cyan-700 rounded-lg shadow-lg p-8">
        <header className="text-4xl font-bold text-white text-center mb-6">Create an Activity</header>

        {error && <p className="text-red-700 text-center mb-4">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-6 text-cyan-900">
          <ListDropDown onListSelect={handleListSelection} />

    
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Activity Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={activity.name}
              onChange={handleActivityChange}
              placeholder="E.g. Sailing"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Minimum price
            </label>
            <input
              id="minprice"
              name="price_min"
              type="number"
              value={activity.price_min}
              onChange={handleActivityChange}
              placeholder="Minimum price"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              Maximum price
            </label>
            <input
              id="maxprice"
              name="price_max"
              type="number"
              value={activity.price_max}
              onChange={handleActivityChange}
              placeholder="Maximum price"
              required
              className="block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none placeholder-cyan-800 focus:ring-2 focus:ring-cyan-800"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm hover:bg-cyan-500 ${
              loading
                ? "bg-cyan-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-600"
            }`}
          >
            {loading ? "Creating..." : "Create Activity"}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
