import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";
import getId from "./getId";

export default function register() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const id = getId();
  if (id) {
    router.push("/dashboard");
  }
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data);
    setLoading(true);

    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        name: dataObj.name,
        email: dataObj.email,
        password: dataObj.password,
        password2: dataObj.password2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (result.error) {
      setLoading(false);
      setError(result.error);
    } else {
      setLoading(false);
      setData(result);
      router.push("/login");
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl my-[5rem]">Register</h1>
      <form onSubmit={handleSubmit} className="my-5 text-center">
        <Input
          underlined
          size="xl"
          clearable
          type="email"
          color="default"
          name="email"
          placeholder="Enter your email"
          className="my-5"
        />{" "}
        <br />
        <Input
          underlined
          size="xl"
          labelLeft="username"
          clearable
          name="name"
          placeholder="Enter your name"
          className="my-5"
        />
        <br />
        <Input.Password
          size="xl"
          bordered
          clearable
          type="password"
          name="password"
          placeholder="Enter your password "
          className="my-5"
        />
        <br />
        <Input.Password
          size="xl"
          bordered
          clearable
          color="default"
          type="password"
          name="password2"
          placeholder="confirm password"
          className="my-5"
        />
        <br />
        <div className="flex justify-center my-5">
          <Button size="lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
