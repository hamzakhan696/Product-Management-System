import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Input,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "../floor.module.css";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import axios from "axios";

function FloorModal({ opened, onClose }) {
  const [property, setProperty] = useState([]);
  const [block, setBlock] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => {
        setProperty(res.data.property);
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
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        mt={100}
        title="Add Floor"
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
              >
                {property.map((d, i) => (
                  <option value={d.id} key={d.id}>
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
              <Input
                style={{
                  width: "246px",
                }}
                component="select"
                rightSection={<IconChevronDown size={17} />}
              >
                {block.map((d, i) => (
                  <option value={d.id} key={d.id}>
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
                Add Floor<span style={{ color: "red" }}>*</span>
              </Title>
              <TextInput
                style={{
                  width: "246px",
                }}
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
                  onClick={""}
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
                  onClick={() => setNoTransitionOpened(false)}
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

export default FloorModal;
