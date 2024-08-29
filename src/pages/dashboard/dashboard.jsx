import {
  Text,
  Flex,
  Paper,
  ActionIcon,
  Group,
  AspectRatio,
  Divider,
} from "@mantine/core";
import {
  IconUsers,
  IconBox,
  IconCashBanknoteFilled,
  IconMessageFilled,
} from "@tabler/icons-react";
import classes from "./dashboard.module.css";
import { Charts } from "../../components/charts/chart";
import { CusBarChart } from "../../components/charts/barchart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRoutes } from "../../utils/PrivateRoute";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [totaloccupied, setTotalOccupied] = useState([]);
  const [totalvacant, setTotalVacant] = useState([]);
  const [totalrenovation, setTotalRenovation] = useState([]);
  const [totalrent, setTotalRent] = useState([]);
  const [totalpaid, setTotalPaid] = useState([]);
  const [totaloverdue, setTotalOverdue] = useState([]);

  const handleNavigation = (label) => {
    switch (label) {
      case "Add Property":
        navigate("/add-property");
        break;
      case "Add Unit Details":
        navigate("/add-unit-details");
        break;
      case "Add New Tenants":
        navigate("/add-new-tenants");
        break;
      case "Add Owner":
        navigate("/add-owner");
        break;
      case "Add Complaint":
        navigate("/add-complaint");
        break;
      case "Add Contact":
        navigate("/add-contact");
        break;
      case "Add Payment":
        navigate("/add-payment");
        break;
      case "Add Policy":
        navigate("/add-policy");
        break;
      default:
        navigate("/");
        break;
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalOccupied}`)
      .then((res) => {
        setTotalOccupied(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalVacant}`)
      .then((res) => {
        setTotalVacant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalRenovation}`)
      .then((res) => {
        setTotalRenovation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalRent}`)
      .then((res) => {
        setTotalRent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalOverdue}`)
      .then((res) => {
        setTotalOverdue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.gettotalPaid}`)
      .then((res) => {
        setTotalPaid(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Flex
        gap="xl"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
        style={{ width: "100%" }}
      >
        <Text
          fw="700"
          mt={20}
          style={{
            fontSize: "32px",
          }}
        >
          Dashboard
        </Text>
        <Group spacing="lg" style={{ flexGrow: 1, justifyContent: "flex-end" }}>
          {/* Add your existing buttons and search here */}
        </Group>
      </Flex>

      <Flex
        mih={50}
        mt={30}
        gap="lg"
        justify="space-between"
        align="start"
        direction="row"
        wrap="wrap"
      >
        <Flex direction="column" gap="lg">
          {/* Left side - Visitors and Properties */}
          <Paper className={classes.PaperAction}>
            <Group justify="space-between" align="center">
              <ActionIcon variant="filled" color="#ffb6c1" size="xl">
                <IconUsers
                  style={{
                    backgroundColor: "#ff9aa2",
                    width: "30px",
                  }}
                />
              </ActionIcon>
              <Text
                style={{
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Visitors
                <br />
                <Divider size={2} />
              </Text>
            </Group>
            <br />
            <Group justify="space-between" align="center">
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Today
                <Text
                  style={{
                    color: "#fa848e",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                This Week
                <Text
                  style={{
                    color: "#b6c24a",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                This Month
                <Text
                  style={{
                    color: "#80cfed",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
            </Group>
          </Paper>

          <Paper className={classes.PaperAction}>
            <Group justify="space-between" align="center">
              <ActionIcon variant="filled" color="#b6e3f4" size="xl">
                <IconBox
                  style={{
                    backgroundColor: "#a0d8ef",
                    width: "30px",
                  }}
                />
              </ActionIcon>
              <Text
                style={{
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Properties
                <br />
                <Divider size={2} />
              </Text>
            </Group>
            <br />
            <Group justify="space-between" align="center">
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Vacant
                <Text
                  style={{
                    color: "#fa848e",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totalvacant}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Renovation
                <Text
                  style={{
                    color: "#b6c24a",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totalrenovation}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Occupied
                <Text
                  style={{
                    color: "#80cfed",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totaloccupied}
                </Text>
              </Text>
            </Group>
          </Paper>
        </Flex>

        <Flex direction="column" gap="lg">
          {/* Right side - Revenue and Complaints */}
          <Paper className={classes.PaperAction}>
            <Group justify="space-between" align="center">
              <ActionIcon variant="filled" color="#d4e157" size="xl">
                <IconCashBanknoteFilled
                  style={{
                    backgroundColor: "#c0ca33",
                    width: "30px",
                  }}
                />
              </ActionIcon>
              <Text
                style={{
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Revenue
                <br />
                <Divider size={2} />
              </Text>
            </Group>
            <br />
            <Group justify="space-between" align="center">
              <Text
                style={{
                  fontSize: "18px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Rent
                <Text
                  style={{
                    color: "#fa848e",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totalrent}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "18px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Overdue
                <Text
                  style={{
                    color: "#b6c24a",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totaloverdue}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "18px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Received
                <Text
                  style={{
                    color: "#80cfed",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  {totalpaid}
                </Text>
              </Text>
            </Group>
          </Paper>

          <Paper className={classes.PaperAction}>
            <Group justify="space-between" align="center">
              <ActionIcon variant="filled" color="#ffab91" size="xl">
                <IconMessageFilled
                  style={{
                    backgroundColor: "#ff7043",
                    width: "30px",
                  }}
                />
              </ActionIcon>
              <Text
                style={{
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Complaint
                <br />
                <Divider size={2} />
              </Text>
            </Group>
            <br />
            <Group justify="space-between" align="center">
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Reported
                <Text
                  style={{
                    color: "#fa848e",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Overdue
                <Text
                  style={{
                    color: "#b6c24a",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: "17px",
                  color: "#A59995",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Completed
                <Text
                  style={{
                    color: "#80cfed",
                    fontSize: "17px",
                    fontWeight: "700",
                  }}
                >
                  20
                </Text>
              </Text>
            </Group>
          </Paper>
        </Flex>

        {/* Center - Pie Chart in a Card */}
        <Paper
          className={classes.PaperActionChart}
          style={{ flexGrow: 1, padding: "20px", overflow: "none" }}
        >
          <div>
            <Text fw={700} mb="md">
              Property Statistics
            </Text>

            <Charts />
          </div>
        </Paper>
      </Flex>
      <Flex>
        <Paper
          className={classes.PaperActionChart2}
          style={{ flexGrow: 1, padding: "20px", overflow: "none" }}
        >
          <div>
            <Text fw={700} mb="md">
              Complaint Statistics
            </Text>
            <CusBarChart />
          </div>
        </Paper>
        <Paper
          className={classes.PaperActionQuick}
          style={{
            flexGrow: 1,
            padding: "20px",
            overflow: "none",
            marginLeft: "10px",
          }}
        >
          <div>
            <Text style={{ cursor: "pointer" }} fw={700} mb="md">
              Quick Tabs
            </Text>

            <Text
              style={{ cursor: "pointer" }}
              onClick={() => handleNavigation("Add Property")}
            >
              Add Property
            </Text>
            <Divider size={1} />
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Unit Details")}
            >
              Add Unit Details
              <Divider size={1} />
            </Text>

            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add New Tenants")}
            >
              Add New Tenants
              <Divider size={1} />
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Owner")}
            >
              Add Owner
              <Divider size={1} />
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Complaint")}
            >
              Add Complaint
              <Divider size={1} />
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Contact")}
            >
              Add Contact
              <Divider size={1} />
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Payment")}
            >
              Add Payment
              <Divider size={1} />
            </Text>
            <Text
              style={{ cursor: "pointer" }}
              my={13}
              onClick={() => handleNavigation("Add Policy")}
            >
              Add Policy
              <Divider size={1} />
            </Text>
          </div>
        </Paper>
      </Flex>
    </>
  );
}

export default Dashboard;
