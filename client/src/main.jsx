import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>
);
