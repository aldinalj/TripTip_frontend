"use client";
import TripDropdown from "@/app/_components/TripDropDown";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { IActivityList } from "@/app/_types/IActivityList";


export default function CreateList() {
  const [list, setList] = useState<IActivityList>({
    name: "",
    trip_id: 0, 
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = sessionStorage.getItem("authToken");


  function handleListChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setList((prevData) => ({ ...prevData, [name]: name === "total" ? Number(value) : value }));
  }

  function handleTripSelection(tripId: number | null) {
    setList((prevData) => ({ ...prevData, trip_id: tripId ?? 0 }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!list.trip_id) {
      setError("Please select a trip.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8080/activities/lists/create", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(list),
    })
      .then((response) => {
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }

        alert("List created successfully!");
        router.push("/lists"); 
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
        <header className="text-4xl font-bold text-white text-center mb-6">Create a List</header>

        {error && <p className="text-red-700 text-center mb-4">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-6 text-cyan-900">
          <TripDropdown onTripSelect={handleTripSelection} />

    
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2 text-cyan-200">
              List Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={list.name}
              onChange={handleListChange}
              placeholder="E.g. food"
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
            {loading ? "Creating..." : "Create List"}
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
