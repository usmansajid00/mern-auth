import { useState } from "react";
import TextInput from "../../components/textInput/TextInput";
import signupSchema from "../../validation/signupSchema";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async () => {};

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  return (
    <div>
      <div>Sign Up here !</div>
      <TextInput
        type="text"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="First Name"
        error={errors.firstName && touched.firstName ? 1 : undefined}
        errormessage={errors.firstName}
      />
      <TextInput
        type="text"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Last Name"
        error={errors.lastName && touched.lastName ? 1 : undefined}
        errormessage={errors.lastName}
      />
      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm Password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
      <button
        disabled={
          !values.firstName ||
          !values.lastName ||
          !values.username ||
          !values.email ||
          !values.password ||
          !values.confirmPassword ||
          errors.firstName ||
          errors.lastName ||
          errors.username ||
          errors.email ||
          errors.password ||
          errors.confirmPassword
        }
        onClick={() => handleSignup()}
      >
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
