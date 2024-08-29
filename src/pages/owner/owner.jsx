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
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { isNotEmpty, useForm } from "@mantine/form";
import {
  IconAddressBook,
  IconChevronDown,
  IconHome,
  IconMail,
  IconMessage,
} from "@tabler/icons-react";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { notifications } from "@mantine/notifications";
import { success } from "../../utils/cusnotification";
import { useState } from "react";
import axios from "axios";

function AddOwner() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const form = useForm({});

  const propertyAdd = (form) => {
    console.log(form);
  };

  const ApiCall = async () => {
    try {
      const values = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        addresses: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.addOwner}`, values);
      notifications.show(success.DataInserted);
    } catch (error) {
      console.log(error);
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
          <Text
            fw="700"
            style={{
              fontSize: "24px",
            }}
          >
            Add Owner
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
                    Firstname <span style={{ color: "red" }}>*</span>
                  </Text>
                  <TextInput
                    placeholder="Firstname"
                    style={{
                      width: "246px",
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
                  Lastname <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder="Lastname"
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
                      width: "246px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    rightSection={<IconMail size={17} />}
                  />
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Address <span style={{ color: "red" }}>*</span>
                  </Text>
                  <TextInput
                    placeholder="Address"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    rightSection={<IconHome size={17} />}
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </Group>
              </Grid.Col>
            </Flex>
          </Grid>
        </Container>

        <Group ml={160} mt={20}>
          <TextInput
            style={{
              width: "115px",
              height: "30px",
            }}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <TextInput
            style={{
              width: "115px",
              height: "30px",
            }}
            placeholder="Postal"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Group>

        <Group ml={160} mt={20}>
          <TextInput
            style={{
              width: "115px",
              height: "30px",
            }}
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <TextInput
            style={{
              width: "115px",
              height: "30px",
            }}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Group>
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

export default AddOwner;
