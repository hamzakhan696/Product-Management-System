import { useDisclosure } from "@mantine/hooks";
import {
  Paper,
  Title,
  Text,
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
import { CusButton } from "../../components/button";
import classes from "./unitdetail.module.css";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";

export function UnitEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [propertyid, setPropertyid] = useState("");
  const [blockid, setBlockid] = useState("");
  const [floorid, setFloorid] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [ownerid, setOwnerid] = useState("");
  const [managerid, setManagerid] = useState("");
  const [statusid, setStatusid] = useState("");
  const [data, setData] = useState([]);
  const [propertyName, setPropertyName] = useState([]);
  const [block, setBlock] = useState([]);
  const [floor, setFloor] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setState] = useState([]);

  const ApiCall = async () => {
    try {
      const values = {
        propertyid: propertyid,
        blockid: blockid,
        floorid: floorid,
        name: name,
        area: area,
        bedrooms: bedrooms,
        bathroom: bathroom,
        ownerid: ownerid,
        managerid: managerid,
        statusid: statusid,
      };
      const id = localStorage.getItem("unitdetailselection");
      await axios.patch(`${BASE_URL}${apiRoutes.editunitdetail}${id}`, values);
      notifications.show(success.DataInserted);
    } catch (error) {
      console.log(error);
      notifications.show(errors.DataNotInserted);
    }
  };

  const getData = async () => {
    try {
      const id = localStorage.getItem("unitdetailselection");
      const res = await axios.get(`${BASE_URL}${apiRoutes.allunit}${id}`);
      const UnitData = res.data[0];
      setData(UnitData);
      setName(UnitData.name || "");
      setPropertyid(UnitData.propertyid || "");
      setBlockid(UnitData.blockid || "");
      setFloorid(UnitData.floorid || "");
      setArea(UnitData.area || "");
      setBedrooms(UnitData.bedrooms || "");
      setBathroom(UnitData.bathrooms || "");
      setOwnerid(UnitData.ownerid || "");
      setManagerid(UnitData.managerid || "");
      setStatusid(UnitData.statusid || "");
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
    axios
      .get(`${BASE_URL}${apiRoutes.user}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => {
        setPropertyName(res.data.property);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.getblock}`)
      .then((res) => {
        setBlock(res.data.block);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.getfloor}`)
      .then((res) => {
        setFloor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.allunitstatus}`)
      .then((res) => {
        setState(res.data.unit);
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
        <Container size={600} my={30}>
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
              <InputWrapper ml={10} style={{ flex: 1 }} label="Unit Name *">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Block *">
                <Input
                  onChange={(e) => setBlockid(e.target.value)}
                  component="select"
                >
                  {block.map((d, i) => (
                    <option value={d.id}>{d.name}</option>
                  ))}
                </Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Floor *">
                <Input
                  onChange={(e) => setFloorid(e.target.value)}
                  component="select"
                >
                  {floor.map((d, i) => (
                    <option value={d.id}>{d.name}</option>
                  ))}
                </Input>
              </InputWrapper>
            </Flex>
            <Flex my={10}>
              <InputWrapper
                ml={10}
                style={{ flex: 1 }}
                label="Area (in Sq.ft) *"
              >
                <Input
                  onChange={(e) => setArea(e.target.value)}
                  value={area}
                ></Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Bedrooms *">
                <Input
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                ></Input>
              </InputWrapper>
            </Flex>
            <Flex my={10}>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Bathrooms	 *">
                <Input
                  onChange={(e) => setBathroom(e.target.value)}
                  value={bathroom}
                ></Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Amenities *">
                <Input value={"N/A"} onChange={""}></Input>
              </InputWrapper>
            </Flex>
            <Flex my={10}>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Property Name*">
                <Input
                  onChange={(e) => setPropertyid(e.target.value)}
                  component="select"
                >
                  {propertyName.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Owner Email *">
                <Input component="select" value={"N/A"} onChange={""}>
                  {users.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.email}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
            </Flex>
            <Flex my={10}>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Manager *">
                <Input component="select" value={"N/A"} onChange={""}>
                  {users.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.firstName}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
              <InputWrapper ml={10} style={{ flex: 1 }} label="Status*">
                <Input
                  onChange={(e) => setStatusid(e.target.value)}
                  component="select"
                >
                  {status.map((d, i) => (
                    <option value={d.id} key={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Input>
              </InputWrapper>
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
