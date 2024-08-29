import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import {
  ActionIcon,
  Container,
  Divider,
  Flex,
  Grid,
  Input,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";

function BlockModal({ opened, onClose }) {
  const [property, setProperty] = useState([]);
  const [name, setName] = useState("");
  const [addproperty, setAddProperty] = useState("");

  const ApiCall = async () => {
    try {
      const values = {
        propertyid: addproperty,
        name: name,
      };
      await axios.post(`${BASE_URL}${apiRoutes.block}`, values);
      notifications.show(success.DataInserted);
    } catch (err) {
      console.log(err);
      notifications.show(errors.DataNotInserted);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => {
        setProperty(res.data.property);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        mt={100}
        title="Add Block"
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
                }}
              >
                Add Property<span style={{ color: "red" }}>*</span>
              </Title>
              <Input
                style={{
                  width: "246px",
                }}
                component="select"
                rightSection={<IconChevronDown size={17} />}
                onChange={(e) => setAddProperty(e.target.value)}
              >
                <option>- Select -</option>
                {property.map((d, i) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </Input>
              <Title
                style={{
                  fontSize: "15px",
                  fontWeight: "300",
                  marginTop: "10px",
                }}
              >
                Add Block<span style={{ color: "red" }}>*</span>
              </Title>
              <TextInput
                style={{
                  width: "246px",
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextInput>
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
                  onClick={onClose}
                  value={"Reset"}
                />
              </Flex>
            </Container>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}

export default BlockModal;
