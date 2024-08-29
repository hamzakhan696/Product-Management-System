import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  TextInput,
  Input,
  Group,
  Text,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { notifications } from "@mantine/notifications";
import { success, errors } from "../../utils/cusnotification";
import axios from "axios";
import {
  validateEmail,
  validateName,
  validateNumber,
  validateSelectBox,
} from "../../utils/cusvalidation";

function Visitor() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [parking, setParking] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [managerid, setManagerid] = useState("");
  const [unitid, setUnitid] = useState("");
  const [numberOfVisitors, setNumberOfVisitors] = useState("");
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);

    axios
      .get(`${BASE_URL}${apiRoutes.allManager}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (managerid) {
      axios
        .get(`${BASE_URL}${apiRoutes.getunitByManager}${managerid}`)
        .then((res) => setUnit(res.data))
        .catch((err) => console.log(err));
    }
  }, [managerid]);

  const handleValidation = (e, validationFn, setFieldState) => {
    const value = e.target.value;
    setFieldState(value);
  };

  const handleSubmit = async () => {
    // Validate all fields before submitting
    const firstNameError = validateName(firstname);
    const lastNameError = validateName(lastname);
    const emailError = validateEmail(email);
    const contactError = validateNumber(contact);
    const parkingError = validateSelectBox(parking);
    const managerIdError = validateSelectBox(managerid);
    const unitIdError = validateSelectBox(unitid);
    const numberOfVisitorsError = validateNumber(numberOfVisitors);

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      contactError ||
      parkingError ||
      managerIdError ||
      unitIdError ||
      numberOfVisitorsError
    ) {
      notifications.show(errors.ValidationError);
      return;
    }

    try {
      const values = {
        unitid,
        managerid,
        checkin: currentDate,
        visitor: {
          first_name: firstname,
          last_name: lastname,
          email,
          contact,
          parking,
          number_of_visitors: numberOfVisitors,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.addVisitor}`, values);
      notifications.show(success.DataInserted);
      window.location.reload();
    } catch (error) {
      console.log(error);
      notifications.show(errors.DataNotInserted);
    }
  };

  return (
    <Container my={66}>
      <Container
        bg={"grey-pms"}
        h={46}
        size={"xl"}
        style={{ borderRadius: "9px" }}
      >
        <Box>
          <Text fw="700" style={{ fontSize: "24px" }}>
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
                    onChange={(e) =>
                      handleValidation(e, validateSelectBox, setManagerid)
                    }
                  >
                    <option>- Select -</option>
                    {data.map((d) => (
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
                  onChange={(e) =>
                    handleValidation(e, validateSelectBox, setUnitid)
                  }
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
                    onChange={(e) =>
                      handleValidation(e, validateName, setFirstname)
                    }
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
                  onChange={(e) =>
                    handleValidation(e, validateName, setLastname)
                  }
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
                    onChange={(e) =>
                      handleValidation(e, validateEmail, setEmail)
                    }
                  />
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Contact Number <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder="Contact Number"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  value={contact}
                  onChange={(e) =>
                    handleValidation(e, validateNumber, setContact)
                  }
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
                    onChange={(e) =>
                      handleValidation(e, validateSelectBox, setParking)
                    }
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
                  value={numberOfVisitors}
                  onChange={(e) =>
                    handleValidation(e, validateNumber, setNumberOfVisitors)
                  }
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
              onClick={() => window.location.reload()}
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
              onClick={handleSubmit}
            />
          </Group>
        </Box>
      </Container>
    </Container>
  );
}

export default Visitor;
