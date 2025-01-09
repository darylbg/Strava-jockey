import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formState) => {
    console.log(formState);
    axios
      .post("http://localhost:3001/api/admin/login", {
        email: formState.email,
        password: formState.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("error posting to login", error.response.data.message);
      });
  };

  const getAllOrders = () => {
    axios.get("/api/admin/dashboard/orders")
    .then(function(result) {
        console.log(result);
    })
    .catch(function(error) {
        console.log("error getting order", error)
    });
  }
  return (
    <div>
      amdin login
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: "This field is required" })}
          type="text"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("password", { required: "This field is required" })}
          type="password"
        />
        <span>{errors.password?.message}</span>
        <button type="submit">submit form</button>
      </form>
      <button onClick={getAllOrders}>get orders</button>
    </div>
  );
}
