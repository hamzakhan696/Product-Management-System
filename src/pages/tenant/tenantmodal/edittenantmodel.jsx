import { useDisclosure } from "@mantine/hooks";
import {
  Paper,
  Title,
  Text,
  TextInput,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Modal,
  Flex,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import classes from "../tenantmodal/tenant.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

function TenantEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(null);
  const [tenantId, setTenantId] = useState(null);

  const getData = async () => {
    try {
      const selection = localStorage.getItem("Tenantid");
      const res = await axios.get(`${BASE_URL}${apiRoutes.getTenants}`, {
        withCredentials: true,
      });

      const tenantData = res.data.find(
        (item) => item.id === parseInt(selection)
      );
      console.log("getapi:", tenantData);

      if (tenantData) {
        setTenantId(tenantData.id);
        setFirstName(tenantData.frist_name || "");
        setLastName(tenantData.last_name || "");
        setOccupation(tenantData.occupation || "");

        const date = new Date(tenantData.date_of_brith);
        const formattedDate = date.toISOString().slice(0, 16);

        setDateOfBirth(formattedDate);
        setEmail(tenantData.email || "");
        setContact(tenantData.contact || null);

        console.log("Matched Tenant Data:", tenantData);
      } else {
        console.log("No matching tenant data found for selection:", selection);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const ApiCall = async () => {
    try {
      const selection = localStorage.getItem("Tenantid");
      const response = await axios.get(`${BASE_URL}${apiRoutes.getTenants}`, {
        withCredentials: true,
      });
      const tenantData = response.data.find(
        (item) => item.id === parseInt(selection)
      );
      console.log("tanantdata:", tenantData);

      if (tenantData) {
        const values = {
          frist_name: firstName,
          last_name: lastName,
          occupation,
          date_of_brith: new Date(dateOfBirth).toISOString(),
          email,
          contact,
        };

        console.log("API Call Payload:", values);
        await axios.patch(
          `${BASE_URL}${apiRoutes.updateTenants}${tenantData.id}`,
          values,
          {
            withCredentials: true,
          }
        );

        notifications.show({
          message: "Data updated successfully!",
          color: "green",
        });

        closeModal();
      } else {
        console.error("The selection does not match any tenant ID.");
        notifications.show({
          message: "Selection does not match any tenant ID.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error in API Call:", error);
      notifications.show({ message: "Failed to update data!", color: "red" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        style={{ overflowY: "auto" }}
        transitionProps={{ transition: "fade", duration: 200 }}
        size="lg"
      >
        <Container size={560} my={30}>
          <Title className={classes.title} ta="center">
            Edit Tenant Information<span style={{ color: "red" }}>*</span>
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Please complete the form below to update the tenant information
          </Text>

          <Paper
            style={{ width: "100%" }}
            withBorder
            shadow="md"
            p={30}
            radius="md"
            mt="lg"
          >
            <Flex direction="column" gap="lg">
              <TextInput
                label="First Name"
                placeholder="Enter First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <TextInput
                label="Occupation"
                placeholder="Enter Occupation"
                required
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />

              <TextInput
                label="Date of Birth"
                placeholder="Enter Date of Birth"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                type="datetime-local"
              />

              <TextInput
                label="Email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextInput
                label="Contact"
                placeholder="Enter Contact Number"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Flex>

            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box
                    onClick={() => {
                      closeModal();
                    }}
                    ml={5}
                  >
                    Back to the Tenant Details
                  </Box>
                </Center>
              </Anchor>
              <CusButton
                variant="default"
                type="submit"
                style={{
                  backgroundColor: "#FFBC11",
                  color: "black",
                  marginTop: "3px",
                  marginLeft: "5px",
                  width: "150px",
                  flex: "1",
                }}
                onClick={ApiCall}
                value={"Submit"}
              />
            </Group>
          </Paper>
        </Container>
      </Modal>

      <CusButton
        disabled={disabled}
        variant="default"
        type="submit"
        style={{
          backgroundColor: "#FFBC11",
          color: "Black",
          marginTop: "3px",
          marginLeft: "5px",
          width: "100px",
        }}
        onClick={openModal}
        value={"Edit"}
        leftSection={<IconEdit size="1rem" />}
      />
    </>
  );
}

export default TenantEditModal;
