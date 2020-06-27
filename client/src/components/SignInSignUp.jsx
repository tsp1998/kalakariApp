import React from "react";

//components
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function SignInSignUp(props) {
  const pathname = window.location.pathname;
  return (
    <div className="container">
      {pathname === "/signin-signup/signup" ? <SignUp /> : <SignIn />}
    </div>
  );
}

export default SignInSignUp;
