import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Input,
  Group,
  Text,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { DropzoneButton } from "../../components/upload/dropzones";
import { CusButton } from "../../components/button";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { success } from "../../utils/cusnotification";
import MantenaceModal from "./maintenanceModel/addmantenance";

function RaiseComplaint() {
  const [reportDate, setReportDate] = useState("");
  const [complaintAbout, setComplaintAbout] = useState("");
  const [unitid, setUnitid] = useState("");
  const [serviceid, setServiceid] = useState("");
  const [detail, setDetail] = useState("");
  const [raisedby, setRaisedby] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [unit, setUnit] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [maintenanceOptions, setMaintenanceOptions] = useState([]);
  const [allManager, setAllManager] = useState([]);
  const [complaintid, setComplaintid] = useState(null);
  console.log(unitid, "unitid");
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setReportDate(currentDate);

    const fetchMaintenanceOptions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${apiRoutes.getmaintenaces}`
        );
        setMaintenanceOptions(response.data);
      } catch (error) {
        console.error("Error fetching maintenance options:", error);
      }
    };

    fetchMaintenanceOptions();
  }, []);

  const ApiCall = async () => {
    try {
      const values = {
        unitid: unitid,
        serviceid: serviceid,
        date_of_reporting: reportDate,
        subject: complaintAbout,
        detail: detail,
        raisedby: raisedby,
      };
      const response = await axios.post(
        `${BASE_URL}${apiRoutes.addcomplaint}`,
        values
      );

      const complaintId = response.data.complaintId; // Extract the complaint ID from the response
      setComplaintid(complaintId); // Update the state with the complaint ID

      notifications.show(success.DataInserted);
      return complaintId; // Return the complaint ID for further use
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDrop = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name); // Set the file name
    }
  };

  const handleImageUpload = async (complaintId) => {
    if (!file) {
      notifications.show({
        title: "Error",
        message: "Please select a file.",
        color: "red",
      });
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("complaintid", complaintId);

    try {
      const response = await axios.post(
        "http://192.168.18.156:3000/complaint-attachments/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response);
      notifications.show(success.DataInserted);
      setComplaintid(null);
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      notifications.show({ title: "Error", message: "Image upload failed" });
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const complaintId = await ApiCall(); // Get the complaint ID after API call
      if (complaintId) {
        await handleImageUpload(complaintId); // Pass the complaint ID to the image upload function
      }
    } catch (error) {
      console.error("Error during submission:", error);
      notifications.show({
        title: "Error",
        message:
          error.message ||
          "There was an error submitting the form. Please try again.",
        color: "red",
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allunit}`)
      .then((res) => {
        setUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (unitid) {
      axios
        .get(`${BASE_URL}${apiRoutes.getManagerByUnitId}${unitid}`)
        .then((res) => {
          setAllManager(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [unitid]);

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
            Raise Complaint
          </Text>
        </Box>
      </Container>
      <Container
        size={"xl"}
        bg={"grey-pms"}
        my="17"
        h={550}
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
                    Report Date <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    type="date"
                    value={reportDate}
                    readOnly
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
                  {unit.map((d, i) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Input>
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between" align="center">
                  <Text fw={600}>
                    Maintenance <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Group>
                    <Input
                      component="select"
                      style={{
                        width: "200px",
                        height: "30px",
                      }}
                      onChange={(e) => setServiceid(e.target.value)}
                    >
                      <option>- Select -</option>
                      {maintenanceOptions
                        .filter(
                          (option) => option.name && option.name.trim() !== ""
                        )
                        .map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                    </Input>
                    <MantenaceModal />
                  </Group>
                </Group>
                <Group mt={10}>
                  {maintenanceList.length > 0 && (
                    <Box>
                      <Text fw={600}>Added Maintenance:</Text>
                      <ul>
                        {maintenanceList.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  )}
                </Group>
              </Grid.Col>
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Complaint About <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <TextInput
                  placeholder="Complaint About"
                  style={{
                    width: "246px",
                    height: "30px",
                    marginLeft: "10px",
                  }}
                  value={complaintAbout}
                  onChange={(e) => setComplaintAbout(e.target.value)}
                />
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Add Image
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
              <Group mt={20} justify="space-between">
                <Text fw={600}>
                  Complaint Details <span style={{ color: "red" }}>*</span>{" "}
                </Text>
                <Textarea
                  size="md"
                  placeholder="Add Details"
                  style={{
                    width: "250px",
                    height: "50px",
                  }}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Group>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>
                    Complaint Raised By <span style={{ color: "red" }}>*</span>
                  </Text>
                  <Input
                    component="select"
                    style={{
                      width: "246px",
                      marginRight: "35px",
                      color: "black",
                      backgroundColor: "white",
                    }}
                    value={raisedby}
                    onChange={(e) => setRaisedby(e.target.value)}
                  >
                    <option value="">- Select -</option>{" "}
                    {allManager.map((d, i) => (
                      <option key={d.manager.id} value={d.manager.id}>
                        {d.manager.email}
                      </option>
                    ))}
                  </Input>
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
              onClick={handleSubmit}
            />
          </Group>
        </Box>
      </Container>
    </Container>
  );
}

export default RaiseComplaint;
