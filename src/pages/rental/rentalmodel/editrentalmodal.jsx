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
  Radio,
} from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import { CusButton } from "../../../components/button";
import classes from "./rentalmodal.module.css";
import { BASE_URL } from "../../../utils/constants";
import { apiRoutes } from "../../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../../utils/cusnotification";

export function RentalEditModal({ disabled }) {
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [rentAmount, setRentAmount] = useState(0);
  const [overdueAmount, setOverdueAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [rentalId, setRentalId] = useState(null);
  const [user, setUsers] = useState([]);

  const getData = async () => {
    try {
      const selection = localStorage.getItem("AmenitiesSelection");
      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getRentalDetailAndLeaseDetail}`,
        {
          withCredentials: true,
        }
      );

      const rentalData = res.data.find(
        (item) => item.id === parseInt(selection)
      );

      if (rentalData) {
        setRentalId(rentalData.id);
        setModeOfPayment(rentalData.mode_of_payment || "");
        setRentAmount(parseFloat(rentalData.rent_amount) || 0);
        setOverdueAmount(parseFloat(rentalData.overdue_amount) || 0);
        setPaidAmount(parseFloat(rentalData.paid_amount) || 0);
        setUnpaidAmount(parseFloat(rentalData.unpaid_amount) || 0);
        setStatus(rentalData.status || "");

        console.log("Matched Rental Data:", rentalData);
      } else {
        console.log("No matching rental data found for selection:", selection);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const ApiCall = async () => {
    try {
      const selection = localStorage.getItem("AmenitiesSelection");
      const response = await axios.get(
        `${BASE_URL}${apiRoutes.getRentalDetailAndLeaseDetail}`,
        {
          withCredentials: true,
        }
      );
      const rentalData = response.data.find(
        (item) => item.id === parseInt(selection)
      );

      console.log("leasecontractid:", rentalData.leasecontractid);

      if (rentalData) {
        const values = {
          mode_of_payment: modeOfPayment,
          rent_amount: parseFloat(rentAmount) || 0,
          overdue_amount: parseFloat(overdueAmount) || 0,
          paid_amount: parseFloat(paidAmount) || 0,
          unpaid_amount: parseFloat(unpaidAmount) || 0,
          status: status,
        };

        console.log("API Call Payload:", values);
        await axios.patch(
          `${BASE_URL}${apiRoutes.rentalUpdatebyid}${rentalData.leasecontractid}`,
          values,
          {
            withCredentials: true,
          }
        );

        notifications.show({
          message: "Data updated successfully!",
          color: "green",
        });
        //window.location.reload();

        closeModal();
      } else {
        console.error("The selection does not match any rental ID.");
        notifications.show({
          message: "Selection does not match any rental ID.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error in API Call:", error);
      notifications.show({ message: "Failed to update data!", color: "red" });
    }
  };

  const handlePaymentModeChange = (e) => {
    setModeOfPayment(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    getData();
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
            Edit Rental Detail<span style={{ color: "red" }}>*</span>
          </Title>
          <Text c="dimmed" fz="sm" ta="center">
            Please complete the form below to update the rental information
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
              <Flex direction="column" gap="sm">
                <Text fw={600}>Mode of Payment</Text>
                <Group>
                  <Radio
                    label="DD"
                    value="DD"
                    checked={modeOfPayment === "DD"}
                    onChange={handlePaymentModeChange}
                  />
                  <Radio
                    label="Cash"
                    value="Cash"
                    checked={modeOfPayment === "Cash"}
                    onChange={handlePaymentModeChange}
                  />
                  <Radio
                    label="Cheque"
                    value="Cheque"
                    checked={modeOfPayment === "Cheque"}
                    onChange={handlePaymentModeChange}
                  />
                </Group>
              </Flex>

              <TextInput
                label="Rent Amount"
                placeholder="Rent Amount"
                required
                value={rentAmount}
                onChange={(e) => setRentAmount(parseFloat(e.target.value) || 0)}
              />

              <Flex direction="column" gap="sm">
                <TextInput
                  label="Overdue Amount"
                  placeholder="Overdue Amount"
                  required
                  value={overdueAmount}
                  onChange={(e) =>
                    setOverdueAmount(parseFloat(e.target.value) || 0)
                  }
                />
                <TextInput
                  label="Paid Amount"
                  placeholder="Paid Amount"
                  required
                  value={paidAmount}
                  onChange={(e) =>
                    setPaidAmount(parseFloat(e.target.value) || 0)
                  }
                />
              </Flex>

              <Flex direction="column" gap="sm">
                <TextInput
                  label="Unpaid Amount"
                  placeholder="Unpaid Amount"
                  required
                  value={unpaidAmount}
                  onChange={(e) =>
                    setUnpaidAmount(parseFloat(e.target.value) || 0)
                  }
                />
                <Flex direction="column" gap="sm">
                  <Text fw={600}>Status</Text>
                  <Group>
                    <Radio
                      label="Paid"
                      value="Paid"
                      checked={status === "Paid"}
                      onChange={handleStatusChange}
                    />
                    <Radio
                      label="Unpaid"
                      value="Unpaid"
                      checked={status === "Unpaid"}
                      onChange={handleStatusChange}
                    />
                    <Radio
                      label="Pending"
                      value="Pending"
                      checked={status === "Pending"}
                      onChange={handleStatusChange}
                    />
                  </Group>
                </Flex>
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
