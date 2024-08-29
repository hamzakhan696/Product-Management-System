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
import classes from "./editamenities.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";

export function AmenitiesEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  console.log(data);
  const ApiCall = async () => {
    try {
      const values = {
        name,
      };
      const id = localStorage.getItem("AmenitiesSelection");
      await axios.patch(`${BASE_URL}${apiRoutes.editAmenities}${id}`, values);
      notifications.show(success.DataInserted);
      closeModal();
    } catch (error) {
      console.error("Error in API Call:", error);
      notifications.show(errors.DataNotInserted);
    }
  };

  const getData = async () => {
    try {
      const id = localStorage.getItem("AmenitiesSelection");
      if (!id) {
        throw new Error("ID not found in localStorage");
      }

      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getAmenitiesByID}${id}`
      );
      const amenities = res.data[0];
      setData(amenities);
      setName(amenities.name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const delay = 1000;
    const timeout = setTimeout(() => {
      getData();
    }, delay);

    return () => clearTimeout(timeout);
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
            Edit Amenities Detail<span style={{ color: "red" }}>*</span>
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Please complete the form below to update the user's information
          </Text>

          <Paper
            style={{ width: "100%" }}
            withBorder
            shadow="md"
            p={30}
            radius="md"
            mt="lg"
          >
            <Flex>
              <TextInput
                label="Amenities"
                placeholder="Amenities"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ flex: 1 }}
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
                    Back to the Property Detail
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
                onClick={() => {
                  ApiCall(), openModal();
                }}
                value={"submit"}
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
