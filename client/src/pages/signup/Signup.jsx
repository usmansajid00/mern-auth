import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";
import signupSchema from "../../validation/signupSchema";
import { StoreContext } from "../../context/AuthContext";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

import "./signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  const { Signup } = useContext(StoreContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        await Signup(values);
        navigate("/login");
      } catch (error) {
        setError(error.message);
      }
    },
  });

  return (
    <div className="signup_wrapper">
      <div className="signup_heading">Sign Up here !</div>
      <form className="signup_form" onSubmit={formik.handleSubmit}>
        <TextInput
          type="text"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="First Name"
          error={
            formik.errors.firstName && formik.touched.firstName ? 1 : undefined
          }
          errormessage={formik.errors.firstName}
        />
        <TextInput
          type="text"
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Last Name"
          error={
            formik.errors.lastName && formik.touched.lastName ? 1 : undefined
          }
          errormessage={formik.errors.lastName}
        />
        <TextInput
          type="text"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Username"
          error={
            formik.errors.username && formik.touched.username ? 1 : undefined
          }
          errormessage={formik.errors.username}
        />
        <TextInput
          type="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          error={formik.errors.email && formik.touched.email ? 1 : undefined}
          errormessage={formik.errors.email}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextInput
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            error={
              formik.errors.password && formik.touched.password ? 1 : undefined
            }
            errormessage={formik.errors.password}
            style={{ paddingRight: "30px" }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              fontSize: "20px",
              paddingTop: "18px",
            }}
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
          </span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextInput
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Confirm Password"
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? 1
                : undefined
            }
            errormessage={formik.errors.confirmPassword}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              fontSize: "20px",
              paddingTop: "18px",
            }}
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? <IoIosEyeOff /> : <IoMdEye />}
          </span>
        </div>
        <button
          className="signup_btn"
          type="submit"
          disabled={
            !formik.values.firstName ||
            !formik.values.lastName ||
            !formik.values.username ||
            !formik.values.email ||
            !formik.values.password ||
            !formik.values.confirmPassword ||
            formik.errors.firstName ||
            formik.errors.lastName ||
            formik.errors.username ||
            formik.errors.email ||
            formik.errors.password ||
            formik.errors.confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
      {error && <p>{error}</p>}
      <p className="account_navigate">
        Already have an account?{" "}
        <span className="login_navigate" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
