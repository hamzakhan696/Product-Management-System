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
  Input,
  InputWrapper,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import classes from "./propertymodal.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";

export function PropertyEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [typeid, setTypeid] = useState("");
  const [users, setUsers] = useState([]);
  const [size, setSize] = useState("");
  const [block, setBlock] = useState("");
  const [floor, setFloor] = useState("");
  const [managerid, setManagerId] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState("");

  const ApiCall = async () => {
    try {
      const values = {
        name: propertyName,
        typeid: typeid,
        size: size,
        block: block,
        managerid: managerid,
        propertyaddress: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      };

      console.log("API Call Payload:", values);
      const id = localStorage.getItem("propertydetailselection");
      await axios.patch(`${BASE_URL}${apiRoutes.updateproperty}${id}`, values);
      notifications.show(success.DataInserted);
      closeModal();
    } catch (error) {
      console.error("Error in API Call:", error);
      notifications.show(errors.DataNotInserted);
    }
  };

  const getData = async () => {
    try {
      const id = localStorage.getItem("propertydetailselection");
      const res = await axios.get(`${BASE_URL}${apiRoutes.propertyid}${id}`);
      const propertyData = res.data[0];
      setData(propertyData);
      setPropertyName(propertyData.name || "");
      setTypeid(propertyData.typeid || "");
      setSize(propertyData.size || "");
      setBlock(propertyData.block || "");
      setFloor(propertyData.floor || "");
      setManagerId(propertyData.managerid || "");

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

  useEffect(() => {
    // Fetch users
    axios
      .get(`${BASE_URL}${apiRoutes.user}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch property types
    axios
      .get(`${BASE_URL}${apiRoutes.propertytype}`)
      .then((res) => {
        setPropertyType(res.data.propertyType);
      })
      .catch((err) => {
        console.log(err);
      });
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
            Edit Property Detail<span style={{ color: "red" }}>*</span>
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
                label="Property Name"
                placeholder="Property Name"
                required
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                style={{ flex: 1 }}
              />

              <InputWrapper
                label="Property Type"
                required
                ml={10}
                style={{ flex: 1 }}
              >
                <Input
                  onChange={(e) => setTypeid(e.target.value)}
                  component="select"
                >
                  {propertyType.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
            </Flex>
            <Flex my={10}>
              <TextInput
                label="Size (in Sq. ft.)"
                placeholder="########"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="No. of Blocks"
                placeholder="#########"
                required
                ml={10}
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <InputWrapper label="Manager" required style={{ flex: 1 }}>
                <Input
                  onChange={(e) => setManagerId(e.target.value)}
                  component="select"
                >
                  {users.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.email}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
              <TextInput
                label="Address"
                placeholder="Address"
                required
                ml={10}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="City"
                placeholder="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="State"
                placeholder="state"
                required
                ml={10}
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{ flex: 1 }}
              />
            </Flex>
            <Flex my={10}>
              <TextInput
                label="PostalCode"
                placeholder="postalcode"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Country"
                placeholder="country"
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
