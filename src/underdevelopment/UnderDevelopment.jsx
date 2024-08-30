import { Title, Text, Container, Group } from "@mantine/core";
import classes from "./UnderDevelopment.module.css";
import { useNavigate } from "react-router-dom";
import { CusButton } from "../components/button";

export function UnderDevelopment() {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate("/dashboard");
  };

  return (
    <Container className={classes.root}>
      <div className={classes.label}>🚧</div>
      <Title className={classes.title}>This page is under development.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        We're working hard to bring this feature to you. Please check back
        later, or return to the dashboard page.
      </Text>
      <Group justify="center">
        <CusButton
          onClick={() => {
            handleNav();
          }}
          variant="subtle"
          size="md"
          value={"Take me back to dashboard page"}
        />
      </Group>
    </Container>
  );
}
