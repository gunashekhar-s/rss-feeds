import { Container, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { loginToggle } from "./redux/actions/userAction";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loginToggle())
    }
  })
  return (
    <Container maxWidth="sm" >
      <CssBaseline />
      <NavBar />
      <Route path="/" component={Home} exact />
      <Route path="/login" component={SignIn} exact />
      <Route path="/register" component={SignUp} exact />
    </Container>
  );
}

export default App;
