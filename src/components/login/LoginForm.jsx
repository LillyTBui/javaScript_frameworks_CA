import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BASE_URL, TOKEN_PATH } from "../../constants/Api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import axios from "axios";

//username: User1234
//password: Js-frameworks-ca-1234

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter a valid username"),
  password: yup.string().required("Please enter a valid passoword"),
});

function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let navigate = useNavigate();

  async function onSubmit(data) {
    setLoginError(null);
    console.log(data);
    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);

      //if login is a success, navigate to admin page
      navigate("/admin");
      reset();
    } catch (error) {
      console.log(error.response);
      setLoginError(error.toString());
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <div>
      {loginError && <Alert variant="danger">Login failed</Alert>}
      {(errors.userName || errors.password) && (
        <Alert variant="danger">Wrong username or password</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <Form.Group className="mb-3">
          <InputGroup>
            <InputGroup.Text id="username-icon" className="login-form__icon">
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Username"
              {...register("username")}
              aria-describedby="username-icon"
              className="login-form__input"
            ></Form.Control>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <InputGroup>
            <InputGroup.Text id="password-icon" className="login-form__icon">
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Password"
              aria-describedby="password-icon"
              className="login-form__input"
              {...register("password")}
            ></Form.Control>
          </InputGroup>
        </Form.Group>

        <Col className="text-center">
          <Button variant="dark" type="submit" className="login-btn">
            Login
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default LoginForm;
