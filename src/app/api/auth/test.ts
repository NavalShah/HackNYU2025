"use client"; // Ensure the use of client-side rendering
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/"); // Redirect to login page if not authenticated
    }
  }, [router]);
}

  export default Dashboard;