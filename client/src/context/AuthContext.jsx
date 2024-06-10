import { createContext } from "react";

export const StoreContext = createContext();

export const AuthContext = (props) => {
  const contextValues = {};
  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default AuthContext;
