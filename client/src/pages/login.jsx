import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 🔐 Admin Login
export const AdminLogin = () => {
  const [adminInput, setAdminInput] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    const payload = {
      email: adminInput.email,
      password: adminInput.password,
      role: "admin",
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Admin logged in successfully!");
        console.log("Token/Response:", result);
        // TODO: Store token in localStorage/sessionStorage if needed
        // Reset form
        setAdminInput({ email: "", password: "" });
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Login with your admin credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={adminInput.email}
              onChange={(e) =>
                setAdminInput({ ...adminInput, email: e.target.value })
              }
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={adminInput.password}
              onChange={(e) =>
                setAdminInput({ ...adminInput, password: e.target.value })
              }
              placeholder="Enter password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Login as Admin
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// 🙋‍♂️ Customer Login
export const CustomerLogin = () => {
  const [customerInput, setCustomerInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const payload = {
      email: customerInput.email,
      password: customerInput.password,
      role: "customer",
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Customer logged in successfully!");
        console.log("Token/Response:", result);
        // TODO: Store token in localStorage/sessionStorage if needed
        setCustomerInput({ email: "", password: "" });
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Customer Login</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="customer-email">Email</Label>
            <Input
              id="customer-email"
              type="email"
              value={customerInput.email}
              onChange={(e) =>
                setCustomerInput({ ...customerInput, email: e.target.value })
              }
              placeholder="customer@example.com"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="customer-password">Password</Label>
            <Input
              id="customer-password"
              type="password"
              value={customerInput.password}
              onChange={(e) =>
                setCustomerInput({
                  ...customerInput,
                  password: e.target.value,
                })
              }
              placeholder="Enter password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Login as Customer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
