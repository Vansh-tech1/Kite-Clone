import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./login.css"; // Make sure this file has the required styling
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!userName) newErrors.userName = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!gender) newErrors.gender = "Gender is required";
    if (!termsAgreed) newErrors.terms = "You must agree to the terms";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      axios.post("http://localhost:3001/signup", {
        email: email,
        username: userName,
        password: password,
        gender: gender,
        termsAgreed: termsAgreed,
      });
      // You would send this data to your backend server here
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Signup</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isInvalid={!!errors.userName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.userName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password + Gender on one row */}
          <Form.Group className="mb-3 d-flex justify-content-between gap-3">
            <div style={{ flexBasis: "50%" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </div>

            <div style={{ flexBasis: "40%" }}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                isInvalid={!!errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          {/* Terms and Conditions */}
          <Form.Group className="mb-3" controlId="formBasicTerms">
            <Form.Check
              type="checkbox"
              label="I agree to all terms and conditions"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
