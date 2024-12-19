"use client";
import { IAuthResponse } from "@/app/_types/IAuthResponse";
import { IUser } from "@/app/_types/IUser";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/_components/Navbar";

export default function LogIn() {
  const [user, setUser] = useState<IUser>({
    display_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const navLinks = [
    { label: "Register", href: "/register" },
    { label: "About", href: "/about" }
  ];

  function handleUserChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (!user.username || !user.password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout: number = 10_000;
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        setLoading(false);

        if (!response.ok) {
          return response.json().then((errData) => {
            setError("Invalid username or password.");
            throw new Error(errData.message);
          });
        }
        console.log("Login successfull!");
        return response.json();
      })

      .then((data: IAuthResponse) => {
        const token = data.token;
        const role = data.role;

        if (!token) {
          setError("No token recieved from server.");
          return;
        }
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("role", role);

        role.match("USER") && router.push("/");
        role.match("ADMIN") && router.push("/admin");
      })

      .catch((error) => {
        if (error.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(error.message || "An error occurred. Please try again.");
        }
        setLoading(false);
      });
  }

  return (

    <div>
    <Navbar links={navLinks} />
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-cyan-900 rounded-lg shadow-lg p-8">
        <header className="text-4xl font-bold text-white flex items-center justify-center">
          Log In
        </header>
        <form onSubmit={onSubmit} className="space-y-4 text-white">

          <div>
            <label htmlFor="username" className="block text-white">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Username"
              required
              className="mt-1 block w-full p-2  rounded-md shadow-sm text-cyan-950 focus:outline-none bg-cyan-200 placeholder-cyan-900"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Password"
              required
              className="mt-1 block w-full p-2 rounded-md shadow-sm text-cyan-950 focus:outline-none bg-cyan-200 placeholder-cyan-900"
            />
          </div>
          <p className="text-sm">
            Don't have an account? {"  "}
            <a href="/register" className="text-cyan-600 hover:underline">
              Register
            </a>
          </p>

          {error && <p className="text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
              loading
                ? "bg-cyan-600 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
