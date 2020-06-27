import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//css
import "bootstrap/dist/css/bootstrap.min.css";

//pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";

//components
import Header from "./components/Header";

//utils
// import Authenitication from "./utils/Authenitication";

import axios from "axios";

axios.defaults.baseURL = "https://localhost:5000/api";

// const token = localStorage.DoctorAppIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     store.dispatch(logOut());
//     window.location.href = "/signin-signup";
//   } else {
//     const { uid, name } = decodedToken;
//     store.dispatch({ type: SET_AUTHENTICATED });
//     store.dispatch({ type: SET_USER, payload: { uid, name } });
//     axios.defaults.headers.common["Authorization"] = token;
//   }
// }

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/products" component={ProductsPage} />
          {/* <Route path="/profile" component={ProfilePage} />
        <Authenitication path="/signin-signup" component={SignInSignUpPage} /> */}
          <Route path="/contact" component={ContactPage} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
    // <Provider store={store}>

    // </Provider>
  );
}

export default App;
