import {
  Box,
  Container,
  Flex,
  Grid,
  NumberInput,
  Select,
  TextInput,
  Input,
  Group,
  Text,
  Center,
  Textarea,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { useForm } from "@mantine/form";
import { IconHome, IconMail } from "@tabler/icons-react";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { notifications } from "@mantine/notifications";
import { success } from "../../utils/cusnotification";
import { useEffect, useState } from "react";
import axios from "axios";

function Visitor() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [parking, setParking] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [managerid, setManagerid] = useState("");
  const [unitid, setUnitid] = useState("");
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState([]);

  const form = useForm({});
  const propertyAdd = (form) => {
    console.log(form);
  };
  const ApiCall = async () => {
    try {
      const values = {
        unitid: unitid,
        managerid: managerid,
        checkin: currentDate,
        visitor: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          contact: contact,
          parking: parking,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.addVisitor}`, values);
      notifications.show(success.DataInserted);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  };

  useEffect(() => {
    getCurrentDate();
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allManager}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getunitByManager}${managerid}`
      );
      setUnit(res.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (managerid) {
      getData();
    }
  }, [managerid]);

  return (
    <Container my={66}>
      <Container
        bg={"grey-pms"}
        h={46}
        size={"xl"}
        style={{ borderRadius: "9px" }}
      >
        <Box>
          <Text
            fw="700"
            style={{
              fontSize: "24px",
            }}
          >
            Add Visitors
          </Text>
        </Box>
      </Container>
      <Container
        size={"xl"}
        bg={"grey-pms"}
        my="17"
        h={500}
        style={{ borderRadius: "9px" }}
      >
        <Container>
          <Grid>
            <Flex
              mih={50}
              mt={32}
              gap="sm"
              justify="space-between"
              direction="row"
              wrap="wrap"
            >
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Person to Meet <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    component="select"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    onChange={(e) => setManagerid(e.target.value)}
                  >
                    <option>- Select -</option>
                    {data.map((d, i) => (
                      <option key={d.id} value={d.id}>
                        {d.first_name}
                      </option>
                    ))}
                  </Input>
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Unit Name <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <Input
                  component="select"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  onChange={(e) => setUnitid(e.target.value)}
                >
                  <option>- Select -</option>
                  {unit.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Input>
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    First Name <span style={{ color: "red" }}>*</span>
                  </Text>
                  <TextInput
                    placeholder="First Name"
                    style={{
                      width: "243px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Last Name <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder="Last Name"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Email <span style={{ color: "red" }}>*</span>
                  </Text>
                  <TextInput
                    placeholder="Email"
                    style={{
                      width: "243px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Contact Number <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder=" Contact Number"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Parking <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    component="select"
                    placeholder="Parking"
                    style={{
                      width: "243px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    onChange={(e) => setParking(e.target.value)}
                  >
                    <option value={"1"}>Yes</option>
                    <option value={"0"}>No</option>
                  </Input>
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  No. of Visitors <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder="No. of Visitors"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                />
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Check in <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    style={{
                      width: "243px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    readOnly
                  />
                </Group>
              </Grid.Col>
            </Flex>
          </Grid>
        </Container>

        <Box
          style={{
            marginLeft: "126px",
            marginTop: "30px",
          }}
        >
          <Group justify="flex-end">
            <CusButton
              variant="default"
              style={{
                backgroundColor: "#9C9C9C",
                color: "white",
                width: "130px",
                height: "34px",
              }}
              value={"Reset"}
            />
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
          </Group>
        </Box>
      </Container>
    </Container>
  );
}

export default Visitor;
