import {
  Flex,
  Title,
  Text,
  Group,
  PasswordInput,
  TextInput,
  Container,
  Button,
  Divider,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const apiCall = async () => {
    try {
      const values = {
        email,
        password,
      };
      const res = await axios.post(`${BASE_URL}${apiRoutes.login}`, values, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const userId = res.data.id;
        localStorage.setItem("userId", userId);
        navigate("/dashboard");
        notifications.show({
          title: "Welcome!",
          message: "You've successfully logged in",
          color: "green",
        });
      }
    } catch (error) {
      notifications.show(errors.signInError);
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
            Sign in
          </Text>
          <Text size="lg" ml={"-0.3rem"}>
            to access
          </Text>
        </Group>
        <Text size="sm" align="center" c="orange-pms">
          Enter your email to sign in for this app
        </Text>

        <Flex direction="column" gap="sm" mt="lg">
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="black"
            onClick={() => {
              apiCall();
            }}
          >
            Sign In
          </Button>
        </Flex>

        <Group gap="xs" justify="center" mt="lg">
          <Text size="sm">Don't have an account yet?</Text>
          <Text component="a" href="sign-up" size="sm" fw={700} c="orange-pms">
            Sign Up
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

export default SignIn;
