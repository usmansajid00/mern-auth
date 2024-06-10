import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "Use uppercase, lowercase, and digits.";

const signupSchema = yup.object().shape({
  firstName: yup.string().min(3).max(30).required("First name is required"),
  lastName: yup.string().min(3).max(30).required("Last name is required"),
  username: yup.string().min(5).max(30).required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default signupSchema;
