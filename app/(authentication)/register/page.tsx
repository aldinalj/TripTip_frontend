"use client";
import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function register() {
  const [user, setUser] = useState<IUser>({display_name: "", username: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();



  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(user),
    })

    .then((response) => {
      setLoading(false);

      if(!response.ok) {
        return response.json().then((errorData) => {

          throw new Error(errorData.message)
          
        })
      }

      alert("Registration successful!");
      router.push("/login");
    })

    .catch((error) => {
      
        setError(error.message || "An error occurred. Please try again.");
        setLoading(false);
  
    });

  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md bg-emerald-700 rounded-lg p-10 border-4 border-emerald-400 shadow-lg">
          <header className="text-4xl font-bold text-center text-sky-100 mb-6">
            Register
          </header>
          <div className="text-sm text-sky-200 mb-6"></div>
          <section>
            <form onSubmit={onSubmit} className="space-y-4">


              <section>
                <label htmlFor="display_name" className="block text-sky-100 mb-1">
                  Display name
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-emerald-700 border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                  placeholder="Display name"
                  type="text"
                  name="display_name"
                  onChange={(event) => handleUserChange(event)}
                />
              </section>

              <section>
                <label htmlFor="username" className="block text-sky-100 mb-1">
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-emerald-700 border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={(event) => handleUserChange(event)}
                />
              </section>

              <section>
                <label htmlFor="password" className="block text-sky-100 mb-1">
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 border-2 text-emerald-700 border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={(event) => handleUserChange(event)}
                />
              </section>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Register
              </button>

              {error && <p className="text-red-700">{error}</p>}

            </form>
          </section>
        </div>
      </div>
    </>
  );
}
