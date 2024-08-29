import {
  Box,
  Container,
  Flex,
  Grid,
  Input,
  Group,
  Text,
  Textarea,
  Center,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { DropzoneButton } from "../../components/upload/dropzones";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { success } from "../../utils/cusnotification";

function Policy() {
  // State for form fields
  const [name, setName] = useState("");
  const [terms, setTerms] = useState("");
  const [file, setFile] = useState(null);

  // Handle file drop
  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      console.log("Selected file:", files[0]); // Debugging statement
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !terms || !file) {
      notifications.show({
        title: "Error",
        message: "Please fill in all fields and select a file.",
        color: "red",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("terms", terms);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/policy/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Server response:", response); // Debugging statement
      notifications.show(success.DataInserted);
      // Reset form fields
      setName("");
      setTerms("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading policy:", error);
      notifications.show({
        title: "Error",
        message: "Failed to create policy.",
        color: "red",
      });
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
            Add Policy
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
                    Policy Name <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "246px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                  />
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Terms<span style={{ color: "red" }}>*</span>
                </Text>
                <Textarea
                  placeholder="Add Policy Detail"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  style={{
                    width: "246px",
                    height: "100px",
                    marginLeft: "10px",
                  }}
                />
              </Group>

              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Add Documents
                    <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Container
                    style={{
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
                      borderRadius: "8px",
                      padding: "20px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #eaeaea",
                      maxWidth: "600px",
                      height: "100px",
                      margin: "auto",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(0, 0, 0, 0.35)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(0, 0, 0, 0.25)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <DropzoneButton onDrop={handleFileDrop} />
                  </Container>
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
              onClick={() => {
                setName("");
                setTerms("");
                setFile(null);
              }}
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

export default Policy;
