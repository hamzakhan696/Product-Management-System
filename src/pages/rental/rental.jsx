import {
  Box,
  Container,
  Flex,
  Grid,
  TextInput,
  Input,
  Group,
  Text,
  Tooltip,
  Radio,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { isNotEmpty, useForm } from "@mantine/form";
import classes from "./rentaldetail.module.css";
import { IconChevronDown } from "@tabler/icons-react";
import { apiRoutes } from "../../utils/PrivateRoute";
import { BASE_URL } from "../../utils/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { notifications, showNotification } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import {
  validateEmail,
  validateName,
  validateNumber,
  validateSelectBox,
} from "../../utils/cusvalidation";
// rental file added
function AddRental() {
  const [propertyid, setPropertyid] = useState("");
  const [unitid, setUnitid] = useState("");
  const [netpayable, setNetpayable] = useState("");
  const [owner, setOwner] = useState("");
  const [tenant, setTenant] = useState("");
  const [overdue, setOverdue] = useState("");
  const [toamountpaid, setToAmountpaid] = useState("");
  const [amountpaid, setAmountpaid] = useState("");
  const [nextdue, setNextdue] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [property, setProperty] = useState([]);
  const [leasecontractid, setLeaseContractId] = useState("");
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState([]);
  const [other, setOther] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    propertyid: "",
    unitid: "",
    owner: "",
    tenant: "",
    startingDate: "",
  });

  console.log("overdue", overdue);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", location: "", addresses: "" },
    validate: {
      name: isNotEmpty("Add property name *"),
      location: isNotEmpty("Add location"),
      addresses: isNotEmpty("Field is Empty"),
    },
  });

  const propertyAdd = (form) => {
    console.log(form);
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => setProperty(res.data.property))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (propertyid) {
      setLoading(true);
      axios
        .get(`${BASE_URL}${apiRoutes.getunitByPropertyId}${propertyid}`)
        .then((res) => {
          const rentalData = res.data[0];
          setData(rentalData);

          const units = rentalData.map((item) => ({
            id: item.unit.id,
            name: item.unit.name,
          }));

          setUnit(units);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    if (unitid) {
      setLoading(true);
      axios
        .get(`${BASE_URL}${apiRoutes.getownertenantleaseByUnitId}${unitid}`)
        .then((res) => {
          const otherData = res.data[0];
          setOther(otherData);
          setNetpayable(otherData.lease.netPayable || "");
          setOwner(otherData.owner.first_name || "");
          setTenant(otherData.tenant.frist_name || "");
          setLeaseContractId(otherData.id);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [propertyid, unitid]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      setCurrentDate(formattedDate);
    };
    getCurrentDate();
  }, []);
  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.currentTarget.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!propertyid || propertyid === "- Select -") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        propertyid: "Please select a property.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, propertyid: "" }));
    }

    if (!unitid || unitid === "- Select -") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        unitid: "Please select a unit.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, unitid: "" }));
    }

    if (!owner) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        owner: "Owner name is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, owner: "" }));
    }

    if (!tenant) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tenant: "Tenant name is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, tenant: "" }));
    }

    if (!currentDate) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startingDate: "Starting date is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, startingDate: "" }));
    }

    return isValid;
  };

  const ApiCall = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const value = {
        leasecontractid: leasecontractid,
        rent_amount: netpayable,
        overdue_amount: overdue,
        paid_amount: amountpaid,
        unpaid_amount: toamountpaid,
        mode_of_payment: paymentMode,
        status: status,
      };
      await axios.post(`${BASE_URL}${apiRoutes.addRental}`, value);
      notifications.show(success.DataInserted);
    } catch (err) {
      console.log(err);
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
          <Text
            fw="700"
            style={{
              fontSize: "24px",
            }}
          >
            Add Rental Payment
          </Text>
        </Box>
      </Container>
      <form onSubmit={form.onSubmit((values) => propertyAdd(values))}>
        <Container
          size={"xl"}
          bg={"grey-pms"}
          my="17"
          h={650}
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
                      Property Name
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      onChange={(e) => {
                        setPropertyid(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          propertyid: "",
                        }));
                      }}
                    >
                      <option>- Select -</option>
                      {property.map((d) => (
                        <option value={d.id} key={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </Input>
                    {errors.propertyid && (
                      <Text color="red">{errors.propertyid}</Text>
                    )}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Rent Amount</Text>
                  <TextInput
                    classNames={{ input: classes.inputFeild }}
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    placeholder="0"
                    {...form.getInputProps("name")}
                    value={netpayable}
                    onChange={(e) => setNetpayable(e.target.value)}
                  />
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Unit Name <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      onChange={(e) => {
                        setUnitid(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          unitid: "",
                        }));
                      }}
                    >
                      <option>- Select -</option>
                      {unit.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </Input>
                    {errors.unitid && <Text color="red">{errors.unitid}</Text>}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Overdue Amount</Text>
                  <TextInput
                    placeholder="0"
                    classNames={{ input: classes.inputFeild }}
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    value={overdue}
                    onChange={(e) => setOverdue(e.target.value)}
                  />
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Owner Name <span style={{ color: "red" }}>*</span>
                    </Text>
                    <TextInput
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      value={owner}
                      onChange={(e) => {
                        setOwner(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          owner: "",
                        }));
                      }}
                    />
                    {errors.owner && <Text color="red">{errors.owner}</Text>}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Amount to be Paid</Text>
                  <TextInput
                    classNames={{ input: classes.inputFeild }}
                    placeholder="0"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    value={toamountpaid}
                    onChange={(e) => setToAmountpaid(e.target.value)}
                  />
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Tenant Name <span style={{ color: "red" }}>*</span>
                    </Text>
                    <TextInput
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      value={tenant}
                      onChange={(e) => {
                        setTenant(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          tenant: "",
                        }));
                      }}
                    />
                    {errors.tenant && <Text color="red">{errors.tenant}</Text>}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Amount Paid</Text>
                  <TextInput
                    classNames={{ input: classes.inputFeild }}
                    placeholder="0"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    value={amountpaid}
                    onChange={(e) => setAmountpaid(e.target.value)}
                  />
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Starting Date <span style={{ color: "red" }}>*</span>
                    </Text>
                    <TextInput
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      value={currentDate}
                      readOnly
                    />
                    {errors.startingDate && (
                      <Text color="red">{errors.startingDate}</Text>
                    )}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Next Due</Text>
                  <Tooltip label={"Select from Next Due Date"}>
                    <TextInput
                      placeholder="##############"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginLeft: "10px",
                      }}
                      readOnly={true}
                      value={nextdue}
                    />
                  </Tooltip>
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>Next Due Date</Text>
                    <Input
                      type="Date"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      {...form.getInputProps("name")}
                      value={nextdue}
                      onChange={(e) => setNextdue(e.target.value)}
                    />
                  </Group>
                </Grid.Col>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>Mode of Payment</Text>

                  <Radio
                    label="DD"
                    value={"DD"}
                    checked={paymentMode === "DD"}
                    onChange={handlePaymentModeChange}
                  ></Radio>
                  <Radio
                    label="Cash"
                    value={"Cash"}
                    checked={paymentMode === "Cash"}
                    onChange={handlePaymentModeChange}
                  ></Radio>
                  <Radio
                    label="Cheque"
                    value={"Cheque"}
                    checked={paymentMode === "Cheque"}
                    onChange={handlePaymentModeChange}
                  ></Radio>
                </Group>
              </Flex>
              <Grid.Col span={6}>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>Status</Text>
                  <Input
                    component="select"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginRight: "35px",
                    }}
                    {...form.getInputProps("name")}
                    onChange={(e) => setStatus(e.target.value)}
                    rightSection={<IconChevronDown size={17} />}
                  >
                    <option>- Select -</option>
                    <option value={"Not Paid"}>Not Paid</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Overdue"}> Overdue</option>
                  </Input>
                </Group>
              </Grid.Col>
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
                onClick={ApiCall}
              />
            </Group>
          </Box>
        </Container>
      </form>
    </Container>
  );
}

export default AddRental;
