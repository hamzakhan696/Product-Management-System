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
  Select,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import classes from "./compalaintmodal.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { DropzoneButton } from "../../../components/upload/dropzones";

export function ComplaintEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [serviceName, setServiceName] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitId, setUnitId] = useState(null);
  const [reportDate, setReportDate] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState("");
  const [rentalId, setRentalId] = useState(null);
  const [raisedBy, setRaisedBy] = useState(null);
  const [complaintid, setcomplaintid] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [complaintAttachmentid, setComplaintAttachmentid] = useState(null);
  const [units, setUnits] = useState([]);

  console.log("Current COmplaint id:", complaintAttachmentid);
  // console.log("Current unitid", unitId);
  // console.log("Current RAISEID", raisedBy);
  // console.log("Current serviceId", serviceId);

  const getData = async () => {
    try {
      const selection = localStorage.getItem("ComplaintSelection");
      console.log("complaintselection:", selection);

      const res = await axios.get(`${BASE_URL}${apiRoutes.getcomplaint}`, {
        withCredentials: true,
      });

      console.log("API Response Data:", res.data);
      const flattenedData = res.data.flat();
      const selectionId = parseInt(selection, 10);
      const rentalData = flattenedData.find((item) => item.id === selectionId);

      console.log("Matched Rental Data:", rentalData);

      if (rentalData) {
        setRentalId(rentalData.id);
        setServiceName(rentalData.service?.name || "");
        setUnitName(rentalData.unit.name || "");
        setUnitId(rentalData.unit.id || null);
        setReportDate(
          rentalData.date_of_reporting || new Date().toISOString().split("T")[0]
        );
        setSubject(rentalData.subject || "");
        setDetails(rentalData.detail || "");
        setRaisedBy(rentalData.raisedby || null);
        setServiceId(rentalData.serviceid);
        console.log("Complaint attachments:", rentalData.complaintattachments);

        const complaintAttachment = rentalData.complaintattachments?.[0];
        if (complaintAttachment) {
          setFile(complaintAttachment.name || "");
          setcomplaintid(complaintAttachment.complaintid);
          setComplaintAttachmentid(complaintAttachment.id);
          console.log(
            "Complaint ID set in state:",
            complaintAttachment.complaintid
          );
        } else {
          console.log("No complaint attachments found.");
        }
      } else {
        console.log("No matching rental data found for selection:", selection);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiRoutes.allunit}`, {
        withCredentials: true,
      });

      const unitsData = res.data.map((unit) => ({
        value: unit.id.toString(), // Convert the ID to a string
        label: unit.name, // The name displayed in the select box
      }));

      setUnits(unitsData);
    } catch (error) {
      console.error("Error fetching units:", error);
      notifications.show({
        message: "Failed to fetch units!",
        color: "red",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const updateComplaintData = {
        unitid: unitId,
        serviceid: rentalId,
        date_of_reporting: reportDate,
        raisedby: raisedBy,
        maintaince: {
          name: serviceName,
        },
      };

      console.log("UpdateComplaintData:", updateComplaintData);

      await axios.patch(
        `${BASE_URL}${apiRoutes.updateComplaint}${complaintAttachmentid}`,
        updateComplaintData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // if (file) {
      //   await handleImageUpload(complaintid, file);
      // }

      notifications.show({
        message: "Data updated successfully!",
        color: "green",
      });
      closeModal();
    } catch (error) {
      console.error("Error in API Call:", error);
      notifications.show({ message: "Failed to update data!", color: "red" });
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("complaintid", complaintid);
      console.log(
        "FormData:",
        formData.get("file"),
        formData.get("complaintid")
      );

      const selection = localStorage.getItem("ComplaintSelection");

      await axios.patch(
        `${BASE_URL}${apiRoutes.uploadComplaint}${selection}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error in image upload:", error);
      notifications.show({ message: "Failed to upload image!", color: "red" });
    }
  };

  useEffect(() => {
    // Set the current date as default when the component loads
    setReportDate(new Date().toISOString().split("T")[0]);
    getData();
    fetchUnits();
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
            Edit Complaint Detail<span style={{ color: "red" }}>*</span>
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Please complete the form below to update the complaint information
          </Text>

          <Paper
            style={{ width: "100%" }}
            withBorder
            shadow="md"
            p={30}
            radius="md"
            mt="lg"
          >
            <Flex direction="column" gap="lg">
              <TextInput
                label="Service Name"
                placeholder="Service Name"
                required
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <Select
                label="Unit Name"
                placeholder="Select Unit"
                required
                data={units} // The units data with IDs as strings
                value={unitId} // The selected value will be the stringified unit ID
                onChange={setUnitId} // Updates the unitId state when a unit is selected
              />

              <Flex direction="column" gap="sm">
                <TextInput
                  label="Date of Reporting"
                  placeholder="Date of Reporting"
                  required
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  readOnly // This makes the field read-only
                />

                <TextInput
                  label="Subject"
                  placeholder="Subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextInput
                  label="Details"
                  placeholder="Details"
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  style={{ paddingBottom: "12px" }}
                />
              </Flex>
              <Flex direction="column" gap="sm">
                <Text fz="sm">Image</Text>
                <DropzoneButton imageName={file} setImage={setFile} />
              </Flex>
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
                    Back to the Rental Detail
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
                  handleSubmit(), openModal(), handleImageUpload();
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
