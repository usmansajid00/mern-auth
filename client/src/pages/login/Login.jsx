import { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";
import loginSchema from "../../validation/loginSchema";
import { StoreContext } from "../../context/AuthContext";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { Login } = useContext(StoreContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await Login(values);
        navigate("/home");
      } catch (error) {
        setError(error.message);
      }
    },
  });
  return (
    <div className="login_wrapper">
      <div className="login_heading"> Login here !</div>
      <form className="login_form" onSubmit={formik.handleSubmit}>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className=""
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
          />
          <span style={{ fontSize: "20px" }} onClick={toggleShowPassword}>
            {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
          </span>
        </div>
        <button
          className="login_btn"
          type="submit"
          disabled={
            !formik.values.username ||
            !formik.values.password ||
            formik.errors.username ||
            formik.errors.password
          }
        >
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
      <p className="account">
        Don&apos;t have account?{" "}
        <span className="signup_navigate" onClick={() => navigate("/signup")}>
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
