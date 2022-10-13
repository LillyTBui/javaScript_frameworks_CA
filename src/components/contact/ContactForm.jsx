import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MINIMUM_FIRSTNAME_CHARACTERS,
  MINIMUM_LASTTNAME_CHARACTERS,
  MINIMUM_MESSAGE_CHARACTERS,
} from "../../constants/ConstantsForm";
import ValidationError from "./ValidationError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(
      MINIMUM_FIRSTNAME_CHARACTERS,
      `First name must be at least ${MINIMUM_FIRSTNAME_CHARACTERS} characters`
    ),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(
      MINIMUM_LASTTNAME_CHARACTERS,
      `Last name must be at least ${MINIMUM_LASTTNAME_CHARACTERS} characters`
    ),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("Please select a subject"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(
      MINIMUM_MESSAGE_CHARACTERS,
      `The message must be at least ${MINIMUM_MESSAGE_CHARACTERS} characters`
    ),
});

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    console.log(data);
    setSubmitted(true);
    reset();
  }

  console.log(errors);

  return (
    <div>
      {submitted && (
        <Alert variant="success">Your submission has been sent!</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <Form.Group className="mb-3">
          <Form.Label className="form__label">First name</Form.Label>
          <Form.Control
            placeholder="First name"
            {...register("firstName")}
          ></Form.Control>
          <Form.Text className="text-muted">
            At least {MINIMUM_FIRSTNAME_CHARACTERS} characters
          </Form.Text>
          {errors.firstName && (
            <ValidationError>{errors.firstName.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form__label">Last name</Form.Label>
          <Form.Control
            placeholder="Last name"
            {...register("lastName")}
          ></Form.Control>
          <Form.Text className="text-muted">
            At least {MINIMUM_LASTTNAME_CHARACTERS} characters
          </Form.Text>
          {errors.lastName && (
            <ValidationError>{errors.lastName.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form__label">Email</Form.Label>
          <Form.Control
            placeholder="Email"
            {...register("email")}
          ></Form.Control>
          <Form.Text className="text-muted">Must be a valid email</Form.Text>
          {errors.email && (
            <ValidationError>{errors.email.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form__label">Subject</Form.Label>
          <Form.Select defaultValue="Subject" {...register("subject")}>
            <option></option>
            <option value="delivery">Delivery</option>
            <option value="Feedback">Feedback</option>
            <option value="refund">Refund</option>
          </Form.Select>
          <Form.Text className="text-muted">Choose a subject</Form.Text>
          {errors.subject && (
            <ValidationError>{errors.subject.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form__label">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Message"
            {...register("message")}
          ></Form.Control>
          <Form.Text className="text-muted">
            At least {MINIMUM_MESSAGE_CHARACTERS} characters
          </Form.Text>
          {errors.message && (
            <ValidationError>{errors.message.message}</ValidationError>
          )}
        </Form.Group>

        <Col className="text-center">
          <Button className="contact-form__btn" type="submit">
            Send
          </Button>
        </Col>
      </Form>
    </div>
  );
}

export default ContactForm;
