import React from "react";

//components
import Footer from "../components/Footer";
import SignInSignUp from "../components/SignInSignUp";

function SignInSignUpPage() {
  return (
    <div className="home-page">
      <SignInSignUp />
      <Footer />
    </div>
  );
}

export default SignInSignUpPage;
