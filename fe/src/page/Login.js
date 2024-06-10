import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";
import "../style/login.style.css";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = (event) => {
    event.preventDefault();
    dispatch(userActions.loginWithEmail({ email, password }))
  };

  const handleGoogleLogin = async (googleData) => {
    dispatch(userActions.loginWithGoogle(googleData.credential))
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(userActions.deleteError());
    }
  },
    [])

  return (
    <>
      <Container className="login-area">
        {error && (
          <div className="error-message">
            <Alert variant="danger">{error}</Alert>
          </div>
        )}
        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <div className="display-space-between login-button-area">
            <Button variant="danger" type="submit">
              Login
            </Button>
            <div>
            Do you not have an account yet?
            <Link to="/register">Sign Up</Link>{" "}
            </div>
          </div>

          <div className="text-align-center mt-2">
            <p>-Log in with an external account.-</p>
            <div className="display-center"><GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
              }}
            /></div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Login;
