import React, { useState } from "react";
import {
  Flex,
  TextInput,
  Button,
  Container,
  Group,
  Title,
  Text,
  Divider,
  PasswordInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowBarRight } from "@tabler/icons-react";
import { isEmail, useForm } from "@mantine/form";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { notifications } from "@mantine/notifications";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [emailError, setEmailError] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstname: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      street: "",
    },
    validate: {
      password: (value) =>
        value !== confirmPassword ? "Passwords do not match" : null,
      confirmPassword: (value) =>
        value !== password ? "Passwords do not match" : null,
    },
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleNextClick = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const loginUser = (form) => {
    console.log(form);
  };

  const ApiCall = async () => {
    try {
      const values = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.userSignUp}`, values);
      notifications.show({
        title: "Sign Up Successful",
        message: "Please check your email to verify",
        color: "green",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex justify="center" align="center" direction="column" h={"100%"}>
      <Group gap="xs" justify="center">
        <Title>Property</Title>
        <Title c="orange-pms">Management</Title>
      </Group>
      <Container maw="400px">
        <Group gap="xs" justify="center" mt="lg">
          <Text size="lg" fw={700}>
            Sign Up
          </Text>
        </Group>
        <Text size="sm" align="center" c="orange-pms">
          Please complete the following fields to sign up
        </Text>
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
          <Flex direction="column" gap="sm" mt="lg">
            {currentStep === 0 && (
              <>
                <TextInput
                  label="First Name"
                  {...form.getInputProps("firstname")}
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <TextInput
                  label="Last Name"
                  {...form.getInputProps("lastname")}
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  onFocus={() => setCurrentStep(0)}
                />
                {email && !emailError ? (
                  <Button type="submit" color="black" onClick={handleNextClick}>
                    NEXT <IconArrowBarRight style={{ marginLeft: "8px" }} />
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    style={{ backgroundColor: "#d1d1d1", color: "#636363" }}
                  >
                    NEXT
                  </Button>
                )}
              </>
            )}
            {currentStep === 1 && (
              <>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <Text c="red" size="sm">
                      Passwords do not match
                    </Text>
                  )}
                {password && confirmPassword && password === confirmPassword ? (
                  <Button type="submit" color="black" onClick={handleNextClick}>
                    NEXT <IconArrowBarRight style={{ marginLeft: "8px" }} />
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    style={{ backgroundColor: "#d1d1d1", color: "#636363" }}
                  >
                    NEXT
                  </Button>
                )}
              </>
            )}
            {currentStep === 2 && (
              <>
                <TextInput
                  label="Street Address"
                  {...form.getInputProps("address")}
                  placeholder="Enter your street address"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <TextInput
                  label="City"
                  {...form.getInputProps("city")}
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextInput
                  label="State"
                  {...form.getInputProps("street")}
                  placeholder="Enter your state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <TextInput
                  label="Postal Code"
                  {...form.getInputProps("street")}
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />

                <TextInput
                  label="Country"
                  {...form.getInputProps("street")}
                  placeholder="Enter your country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {country ? (
                  <Button onClick={ApiCall} type="submit" color="black">
                    SIGN UP
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    style={{ backgroundColor: "#d1d1d1", color: "#636363" }}
                  >
                    Sign Up
                  </Button>
                )}
              </>
            )}
          </Flex>
        </form>
        <Group gap="xs" justify="center" mt="lg">
          <Text size="sm">Already have an account?</Text>
          <Text component="a" href="/" size="sm" fw={700} c="orange-pms">
            Sign in here
          </Text>
        </Group>
        <Divider
          size="md"
          my="lg"
          label="or continue with"
          labelPosition="center"
        />
        <Button fullWidth color="#EEEEEE" c="black">
          Google
        </Button>
        <Text size="sm" align="center" mt="xs">
          By clicking above, you agree to our{" "}
          <Text component="a" href="#" fw={500}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text component="a" href="#" fw={500}>
            Privacy Policy
          </Text>
        </Text>
      </Container>
    </Flex>
  );
};

export default SignUp;
