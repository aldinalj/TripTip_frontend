// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { IFullTrip } from "@/app/_types/IFullTrip";
// import TripCard from "@/app/_components/TripCard";
// import Navbar from "@/app/_components/Navbar";
// import CreateTripCard from "../../_components/CreateTripCard";
// import CreateTripModal from "../../_components/CreateTripModal";

// export default function AllTripsPage() {
//   const [trips, setTrips] = useState<IFullTrip[]>([]);
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const token = sessionStorage.getItem("authToken");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const router = useRouter();

//   const navLinks = [
//     { label: "Trips", href: "/trips" },
//     { label: "Budgets", href: "/budgets" },
//     { label: "Spendings", href: "/spendings" },
//     { label: "Lists", href: "/lists" },
//     { label: "Activities", href: "/trips" }
//   ];

//   useEffect(() => {
//     fetch("http://localhost:8080/budgets/all", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((errorData) => {
//             throw new Error(errorData.message);
//           });
//         }
//         return response.json();
//       })

//       .then((data: IFullTrip[]) => {
//         setTrips(data);
//       })

//       .catch((error) =>
//         setError(
//           error.message || "Something went wrong when fetching your trips."
//         )
//       )

//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleCreateTrip = (tripData: {
//     name: string;
//     country: string;
//     start_date: string;
//     end_date: string;
//   }) => {

//     fetch("http://localhost:8080/trips/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(tripData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to create trip");
//         }
//         return response.json();
//       })

//       .then((data) => {
//         setTrips((prevTrips) => [...prevTrips, data]);
//         alert("Trip created successfully!");
//       })

//       .catch((error) => setError(error.message || "Something went wrong"))

//       .finally(() => setIsModalOpen(false));
//   };

//   const handleTripClick = (tripId: number) => {
//     router.push(`/trip/${tripId}`); 
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main>
//   <Navbar links={navLinks} />
//   {token ? (
//     <div>
//       <h1 className="text-left p-8 mt-3 text-4xl text-white">My Trips</h1>

//       <div className="flex min-h-screen overflow-auto">
//         <div
//           className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
//         >
//           {trips.length > 0 ? (
//             trips.map((trip) => (
//               <div key={trip.id} onClick={() => handleTripClick(trip.id)}>
//                 <TripCard trip={trip} />
//               </div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-white">
//               No trips found.
//             </p>
//           )}

//           <CreateTripCard onClick={() => setIsModalOpen(true)} />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-white">
//         Log in or register to access this page
//       </h1>
//     </div>
//   )}
//   {error && <p className="text-red-500 text-center">{error}</p>}

//   <CreateTripModal
//     isOpen={isModalOpen}
//     onClose={() => setIsModalOpen(false)}
//     onSubmit={handleCreateTrip}
//   />
// </main>


//   );
// }
