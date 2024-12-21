"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { ITrip } from "@/app/_types/ITrip";

export default function createTrip() {
  const [trip, setTrip] = useState<ITrip>({
    name: "",
    country: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const token = sessionStorage.getItem("authToken");

  const navLinks = [
    { label: "About", href: "/about" }
  ];

  function handleTripChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTrip((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    fetch("http://localhost:8080/trips/create", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify(trip),
    })
      .then((response) => {
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }

        alert("New trip created!");
        router.push("/trips/all");
      })

      .catch((error) => {
        if (error.response && error.response.status === 409) {
            setError("A trip with this name already exists.");
        }else
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
      });
  }

  return (
    <>
    <div>
      <Navbar links={navLinks} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-cyan-700 rounded-lg p-10 border-4 border-cyan-400 shadow-lg">
          <header className="text-4xl font-bold text-center text-sky-100 mb-6">
            Create Trip
          </header>
          <div className="text-sm text-sky-200 mb-6"></div>
          <section>
            <form onSubmit={onSubmit} className="space-y-4">
              <section>
                <label
                  htmlFor="tripName"
                  className="block text-sky-100 mb-1"
                >
                  Trip Name
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-cyan-700 border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300"
                  placeholder="Trip Name"
                  type="text"
                  name="name"
                  onChange={handleTripChange}
                />
              </section>

              <section>
                <label htmlFor="country" className="block text-sky-100 mb-1">
                  Country
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-cyan-700 border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300"
                  placeholder="Country"
                  type="text"
                  name="country"
                  onChange={handleTripChange}
                />
              </section>

              <section>
                <label htmlFor="startDate" className="block text-sky-100 mb-1">
                  Start Date
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-cyan-700 border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300"
                  placeholder="Start Date"
                  type="date"
                  name="start_date"
                  onChange={handleTripChange}
                />
              </section>

              <section>
                <label htmlFor="endDate" className="block text-sky-100 mb-1">
                  End Date
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-cyan-700 border-cyan-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300"
                  placeholder="End Date"
                  type="date"
                  name="end_date"
                  onChange={handleTripChange}
                />
              </section>

              <button
                type="submit"
                className="w-full bg-cyan-800 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Create Trip
              </button>

              {error && <p className="text-red-700">{error}</p>}
            </form>
          </section>
        </div>
      </div>
    </div>
  </>
);
}