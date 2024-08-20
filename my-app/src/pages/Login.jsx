import React, { useContext, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/App";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser, setToken, user, token, setIsAuth, isAuth } = useContext(AppContext);
  useEffect(() => {
    if(isAuth){
      navigate("/home");
    }
  },[])
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      setUser(loggedIn.user.username);
      setToken(loggedIn.token);
      localStorage.setItem("token", loggedIn.token);
      setIsAuth(true);
      navigate("/home");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter the credentials you were given
          </CardDescription>
        </CardHeader>
        <form
          className="p-6"
          onSubmit={(e) => handleSubmit(e, setUser, setToken)}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Username</Label>
              <Input name="username" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
