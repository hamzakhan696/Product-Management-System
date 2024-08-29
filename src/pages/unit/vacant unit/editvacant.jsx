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
import classes from "./vacant.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { success } from "../../../utils/cusnotification";

export function VacantEditModal() {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [propertyName, setPropertyName] = useState("");
  const [typeName, setTypeName] = useState("");
  const [size, setSize] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [manager, setManagerId] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState("");

  const ApiCall = async () => {
    try {
      const values = {
        propertyName: propertyName,
        typeName: typeid,
        size: size,
        block: block,
        floor: floor,
        manager: manager,
        propertyaddress: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      };
      const id = localStorage.getItem("propertydetailselection");
      await axios.put(`${BASE_URL}${apiRoutes.propertyupdate}${id}`, values);
      notifications.show(success.DataInserted);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const id = localStorage.getItem("propertydetailselection");
      const res = await axios.get(`${BASE_URL}${apiRoutes.propertyid}${id}`);

      const propertyData = res.data[0];
      setData(propertyData);
      setPropertyName(propertyData.name || "");
      setTypeName(propertyData.propertyType?.name || "");
      setSize(propertyData.size || "");
      setBlock(propertyData.block || "");
      setFloor(propertyData.floor || "");
      setManagerId(propertyData.userrole?.email || "");
      const address = propertyData.addresses?.[0]?.address || {};
      setStreetAddress(address.streetAddress || "");
      setCity(address.city || "");
      setState(address.state || "");
      setPostal(address.postalCode || "");
      setCountry(address.country || "");
    } catch (error) {
      console.log(error);
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
            Edit Unit Detail<span style={{ color: "red" }}>*</span>
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
                label="Unit Name"
                placeholder="Unit Name"
                required
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                style={{ flex: 1 }}
              />

              <TextInput
                label="No. of Blocks"
                placeholder="#########"
                required
                ml={10}
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="Floor"
                placeholder="########"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Area (in Sq.ft)"
                placeholder="#########"
                required
                ml={10}
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="Bedrooms"
                placeholder="Bedrooms"
                required
                value={manager}
                onChange={(e) => setManagerId(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Bathrooms"
                placeholder="Bathrooms"
                required
                ml={10}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="Amenities"
                placeholder="Amenities"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Owner Email"
                placeholder="Owner Email"
                required
                ml={10}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="Manager Email"
                placeholder="Manager Email"
                required
                ml={10}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
