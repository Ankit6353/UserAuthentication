import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const WelcomePage = ({ role }) => {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center gap-4 min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            Welcome {role === "admin" ? "Admin" : "Customer"}
          </CardTitle>
          <CardDescription>
            {role === "admin"
              ? "You have full access to manage the system."
              : "You have limited access to raise and track tickets."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {role === "admin"
              ? "As an admin, you can manage users, view system stats, and configure the platform."
              : "As a customer, you can raise issues, check the status of your requests, and communicate with support."}
          </p>
          <Button onClick={handleLogout} className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
