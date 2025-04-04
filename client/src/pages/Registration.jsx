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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Registration = () => {
  const [adminInput, setAdminInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [customerInput, setCustomerInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "admin") {
      setAdminInput({ ...adminInput, [name]: value });
    } else {
      setCustomerInput({ ...customerInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "admin" ? adminInput : customerInput;

    const payload = {
      first_name: inputData.firstName,
      last_name: inputData.lastName,
      email: inputData.email,
      password: inputData.password,
      role: type,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        alert(`${type.toUpperCase()} registered successfully!`);
        if (type === "admin") {
          setAdminInput({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        } else {
          setCustomerInput({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin Signup</TabsTrigger>
              <TabsTrigger value="customer">Customer Signup</TabsTrigger>
            </TabsList>

            {/* Admin Signup */}
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Signup</CardTitle>
                  <CardDescription>Create an admin account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["firstName", "lastName", "email", "password"].map(
                    (field) => (
                      <div className="space-y-1" key={field}>
                        <Label htmlFor={field}>
                          {field.replace(/^\w/, (c) => c.toUpperCase())}
                        </Label>
                        <Input
                          type={field === "password" ? "password" : "text"}
                          name={field}
                          value={adminInput[field]}
                          onChange={(e) => changeInputHandler(e, "admin")}
                          placeholder={`Enter your ${field}`}
                          required
                        />
                      </div>
                    )
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRegistration("admin")}>
                    Signup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Customer Signup */}
            <TabsContent value="customer">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Signup</CardTitle>
                  <CardDescription>Create a customer account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["firstName", "lastName", "email", "password"].map(
                    (field) => (
                      <div className="space-y-1" key={field}>
                        <Label htmlFor={field}>
                          {field.replace(/^\w/, (c) => c.toUpperCase())}
                        </Label>
                        <Input
                          type={field === "password" ? "password" : "text"}
                          name={field}
                          value={customerInput[field]}
                          onChange={(e) => changeInputHandler(e, "customer")}
                          placeholder={`Enter your ${field}`}
                          required
                        />
                      </div>
                    )
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleRegistration("customer")}>
                    Signup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
