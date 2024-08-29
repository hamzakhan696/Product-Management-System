import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import {
  Container,
  Divider,
  Flex,
  Grid,
  Modal,
  TextInput,
  Title,
} from "@mantine/core";
import { CusButton } from "../../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";

function AmenitiesModal({ opened, onClose }) {
  const [name, setName] = useState("");
  const ApiCall = async () => {
    try {
      const values = {
        name: name,
      };
      await axios.post(`${BASE_URL}${apiRoutes.addAmenities}`, values);
      notifications.show(success.DataInserted);
      window.location.reload();
    } catch (err) {
      console.log(err);
      notifications.show(errors.DataNotInserted);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        mt={100}
        title="Add Amenities"
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
                  marginTop: "10px",
                }}
              >
                Add Amenities<span style={{ color: "red" }}>*</span>
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

export default AmenitiesModal;
