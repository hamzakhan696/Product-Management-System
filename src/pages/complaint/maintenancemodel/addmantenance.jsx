import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";
import { CusButton } from "../../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";
import { useDisclosure } from "@mantine/hooks";
//Changes
function MantenaceModal() {
  const [name, setName] = useState("");
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // Function to handle the API call
  const ApiCall = async () => {
    // Basic validation for the input field
    if (name.trim() === "") {
      notifications.show({
        title: "Validation Error",
        message: "Maintenance name cannot be empty.",
        color: "red",
      });
      return;
    }

    try {
      const values = {
        name: name,
      };
      // Make the POST request to the API
      await axios.post(`${BASE_URL}${apiRoutes.addmaintenaces}`, values);
      notifications.show(success.DataInserted);
      closeModal(); // Close the modal after successful submission
      window.location.reload(); // Reload the page to reflect the changes
    } catch (err) {
      console.error(err);
      notifications.show(errors.DataNotInserted);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        mt={100}
        title="Add Maintenance"
        transitionProps={{
          transition: "fade",
          duration: 200,
          timingFunction: "linear",
        }}
      >
        <Divider size="md" />
        <Grid my={20} justify="center">
          <Grid.Col span={9}>
            <Container justify="center">
              <Title
                style={{
                  fontSize: "15px",
                  fontWeight: "300",
                  marginTop: "10px",
                }}
              >
                Add Maintenance <span style={{ color: "red" }}>*</span>
              </Title>
              <TextInput
                style={{
                  width: "246px",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter maintenance name"
              />
              <br />
              <Flex>
                <CusButton
                  variant="default"
                  type="submit"
                  style={{
                    backgroundColor: "#FFBC11",
                    color: "white",
                    width: "130px",
                    height: "34px",
                  }}
                  value={"Submit"}
                  onClick={ApiCall}
                />
                <CusButton
                  variant="default"
                  style={{
                    backgroundColor: "#9C9C9C",
                    color: "white",
                    width: "130px",
                    height: "34px",
                    marginLeft: "10px",
                  }}
                  onClick={closeModal}
                  value={"Cancel"}
                />
              </Flex>
            </Container>
          </Grid.Col>
        </Grid>
      </Modal>
      <Button
        style={{
          backgroundColor: "#FFBC11",
          color: "white",
          height: "33px",
        }}
        onClick={openModal}
      >
        Add
      </Button>
    </>
  );
}

export default MantenaceModal;
