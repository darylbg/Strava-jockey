import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { authService } from "../services/authServices";

export default function LoginPrompt() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      setUser(response.user);
      reset();
      localStorage.setItem("StravaJockey user", JSON.stringify(response.user));
      navigate("/admin/dashboard");
    } catch (error) {
      handleLoginError(error, setError);
    }
  };

  const handleLoginError = (error, setError) => {
    if (!error.response) {
      setError("root", {
        type: "Server",
        message: "Unable to connect to server. Please try again later.",
      });
      return;
    }

    const errorMessage = error.response.data.message;

    switch (true) {
      case errorMessage.includes("User not found"):
        setError("email", {
          type: "Server",
          message: "User not found.",
        });
        break;

      case errorMessage.includes("Incorrect password"):
        setError("password", {
          type: "Server",
          message: "Incorrect password.",
        });
        break;

      default:
        setError("root", {
          type: "Server",
          message: "An unexpected error occurred. Please try again.",
        });
        console.error("Unhandled server error:", errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <div>{errors.root.message}</div>}

        <div>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="text"
            placeholder="Email"
            disabled={isSubmitting}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            disabled={isSubmitting}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
