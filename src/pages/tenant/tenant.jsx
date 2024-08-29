import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  TextInput,
  Group,
  Text,
  Divider,
  Select,
  Input,
  Flex,
  Radio,
  Loader,
  Center,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { IconMail, IconTrash, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import classes from "./tenantdetail.module.css";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";

function AddTenant() {
  const [loading, setLoading] = useState(false);
  const [totalNet, setTotalNet] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_brith, setDate_of_brith] = useState("");
  const [base_rent, setBaseRent] = useState("");
  const [taxes, setTaxes] = useState("");
  const [insurance, setInsurance] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [additional_charges, setAdditionalCharges] = useState("");
  const [cycle, setCycle] = useState(null);
  const [starting_date, setStarting_date] = useState("");
  const [propertyid, setPropertyid] = useState("");
  const [unitid, setUnitid] = useState("");
  const [ownerid, setOwnerid] = useState("");
  const [property, setProperty] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [propertyunit, setPropertyunit] = useState([]);
  const [unitowner, setUnitowner] = useState([]);
  const [errors, setErrors] = useState({});

  console.log(inputFields, "Tenant Occupation");
  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => setProperty(res.data.property))
      .catch((err) => console.log(err));
    if (propertyid) {
      axios
        .get(`${BASE_URL}${apiRoutes.getunitByproperty}${propertyid}`)
        .then((res) => setPropertyunit(res.data))
        .catch((err) => console.log(err));
    }
    if (unitid) {
      axios
        .get(`${BASE_URL}${apiRoutes.getownerByunit}${unitid}`)
        .then((res) => setUnitowner(res.data))
        .catch((err) => console.log(err));
    }
  }, [propertyid, unitid]);

  //Calculation for NetPayable
  const netTotal = () => {
    const numBaseRent = parseFloat(base_rent) || 0;
    const numTaxes = parseFloat(taxes) || 0;
    const numInsurance = parseFloat(insurance) || 0;
    const numMaintenance = parseFloat(maintenance) || 0;
    const numAdditionalCharges = parseFloat(additional_charges) || 0;

    const total =
      numBaseRent +
      numTaxes +
      numInsurance +
      numMaintenance +
      numAdditionalCharges;
    setTotalNet(total.toFixed(2));
  };

  useEffect(() => {
    netTotal();
  }, [base_rent, taxes, insurance, maintenance, additional_charges]);

  const handleCycleChange = (value) => {
    setLoading(true);
    setTimeout(() => {
      setCycle(value);
      setLoading(false);
    }, 500);
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!propertyid) {
      errors.propertyid = "Property Name is required.";
      isValid = false;
    }
    if (!unitid) {
      errors.unitid = "Unit Name is required.";
      isValid = false;
    }
    if (!ownerid) {
      errors.ownerid = "Owner Name is required.";
      isValid = false;
    }
    if (!first_name) {
      errors.first_name = "First Name is required.";
      isValid = false;
    }
    if (!last_name) {
      errors.last_name = "Last Name is required.";
      isValid = false;
    }
    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }
    if (!gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }
    if (!occupation) {
      errors.occupation = "Occupation is required.";
      isValid = false;
    }
    if (!date_of_brith) {
      errors.date_of_brith = "Date of Birth is required.";
      isValid = false;
    }
    if (!base_rent) {
      errors.base_rent = "Base Rent is required.";
      isValid = false;
    }
    if (!taxes) {
      errors.taxes = "Taxes are required.";
      isValid = false;
    }
    if (!maintenance) {
      errors.maintenance = "Maintenance is required.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const values = {
        first_name,
        last_name,
        gender,
        occupation,
        email,
        date_of_brith,
        leasedetail: {
          base_rent,
          taxes,
          insurance,
          maintenance,
          additional_charges,
          cycle,
          starting_date,
        },
        occupants: inputFields,
        leasecontract: {
          propertyid: propertyid,
          unitid: unitid,
          ownerid: ownerid,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.addTenants}`, values);
      notifications.show(success.DataInserted);
      window.location.reload();
    } catch (error) {
      console.log(error);
      notifications.show(errors.DataNotInserted);
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const handleReset = () => {
    window.location.reload();
  };

  const initialFields = {
    first_name: "",
    last_name: "",
    gender: "",
    occupation: "",
    date_of_birth: "",
    email: "",
  };

  const addRows = () => {
    setInputFields((prevFields) => [
      ...prevFields,
      {
        id: Date.now(),
        ...initialFields,
      },
    ]);
  };

  const handleInputChange = (id, fieldName, event) => {
    const { value } = event.target;
    setInputFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [fieldName]: value } : field
      )
    );
  };

  const removeRow = (id) => {
    setInputFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  return (
    <Container my={40} size="xl">
      <Box
        mt="md"
        bg="grey-pms"
        style={{ borderRadius: "9px", padding: "16px" }}
      >
        <Text fw={600} mb="sm">
          Add Tenant
        </Text>
        <Divider color="red" size="sm" mb="md" />

        <Grid>
          <Grid.Col span={6}>
            <Group mb="md" position="apart">
              <Text fw={600}>
                Property Name <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                onChange={(e) => {
                  setPropertyid(Number(e.target.value));
                  setErrors((prev) => ({ ...prev, propertyid: "" }));
                }}
                component="select"
                style={{ width: "100%" }}
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

          <Grid.Col span={6}>
            <Group mb="md" position="apart">
              <Text fw={600}>
                Unit Name <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                onChange={(e) => {
                  setUnitid(e.target.value);
                  setErrors((prev) => ({ ...prev, unitid: "" }));
                }}
                component="select"
                style={{ width: "100%" }}
              >
                <option>- Select -</option>
                {propertyunit.map((property) =>
                  property.unit.map((unit) => (
                    <option value={unit.id} key={unit.id}>
                      {`${unit.name} `}
                    </option>
                  ))
                )}
              </Input>
              {errors.unitid && <Text color="red">{errors.unitid}</Text>}
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group mb="md" position="apart">
              <Text fw={600}>
                Owner Name <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                onChange={(e) => {
                  setOwnerid(e.target.value);
                  setErrors((prev) => ({ ...prev, ownerid: "" }));
                }}
                component="select"
                placeholder="Select owner"
                style={{ width: "100%" }}
              >
                <option value="">- Select -</option>
                {unitowner.map((unit) =>
                  unit.owner.map((owner) => (
                    <option value={owner.id} key={owner.id}>
                      {`${owner.first_name} ${owner.last_name}  `}
                    </option>
                  ))
                )}
              </Input>
              {errors.ownerid && <Text color="red">{errors.ownerid}</Text>}
            </Group>
          </Grid.Col>
        </Grid>
      </Box>

      <Flex direction="row" gap="md">
        <Box
          mt="md"
          bg="grey-pms"
          style={{ borderRadius: "9px", padding: "16px", flex: 1 }}
        >
          <Text fw={600} mb="sm">
            Tenant Details
          </Text>
          <Divider color="red" size="sm" mb="md" />

          <Grid>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  First Name <span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                  placeholder="First Name"
                  style={{ width: "100%" }}
                  value={first_name}
                  onChange={(e) => {
                    setFirst_name(e.target.value);
                    setErrors((prev) => ({ ...prev, first_name: "" }));
                  }}
                  rightSection={<IconUser size={17} />}
                />
                {errors.first_name && (
                  <Text color="red">{errors.first_name}</Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Last Name <span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                  placeholder="Last Name"
                  style={{ width: "100%" }}
                  value={last_name}
                  onChange={(e) => {
                    setLast_name(e.target.value);
                    setErrors((prev) => ({ ...prev, last_name: "" }));
                  }}
                  rightSection={<IconUser size={17} />}
                />
                {errors.last_name && (
                  <Text color="red">{errors.last_name}</Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Email <span style={{ color: "red" }}>*</span>
                </Text>
                <TextInput
                  placeholder="Enter Email"
                  style={{ width: "100%" }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  rightSection={<IconMail size={17} />}
                />
                {errors.email && <Text color="red">{errors.email}</Text>}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Gender <span style={{ color: "red" }}>*</span>
                </Text>
                <Select
                  placeholder="Select Gender"
                  style={{ width: "100%" }}
                  data={["Male", "Female", "Other"]}
                  value={gender}
                  onChange={(value) => {
                    setGender(value);
                    setErrors((prev) => ({ ...prev, gender: "" }));
                  }}
                />
                {errors.gender && <Text color="red">{errors.gender}</Text>}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Occupation<span style={{ color: "red" }}>*</span>
                </Text>
                <Select
                  placeholder="Select Occupation"
                  style={{ width: "100%" }}
                  data={["Occupation 1", "Occupation 2", "Occupation 3"]}
                  value={occupation}
                  onChange={(value) => {
                    setOccupation(value);
                    setErrors((prev) => ({ ...prev, occupation: "" }));
                  }}
                />
                {errors.occupation && (
                  <Text color="red">{errors.occupation}</Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  type="date"
                  style={{ width: "100%" }}
                  value={date_of_brith}
                  onChange={(e) => {
                    setDate_of_brith(e.target.value);
                    setErrors((prev) => ({ ...prev, date_of_brith: "" }));
                  }}
                />
                {errors.date_of_brith && (
                  <Text color="red">{errors.date_of_brith}</Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>
        </Box>

        <Box
          mt="md"
          ml="md"
          bg="grey-pms"
          style={{ borderRadius: "9px", padding: "16px", flex: 1 }}
        >
          <Text fw={600} mb="sm">
            Lease Details
          </Text>
          <Divider color="red" size="sm" mb="md" />

          <Grid>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Base Rent <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  min={0}
                  style={{ width: "100%" }}
                  value={base_rent}
                  onChange={(e) => {
                    setBaseRent(e.target.value);
                    setErrors((prev) => ({ ...prev, base_rent: "" }));
                  }}
                />
                {errors.base_rent && (
                  <Text color="red">{errors.base_rent}</Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Taxes <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  min={0}
                  style={{ width: "100%" }}
                  value={taxes}
                  onChange={(e) => {
                    setTaxes(e.target.value);
                    setErrors((prev) => ({ ...prev, taxes: "" }));
                  }}
                />
                {errors.taxes && <Text color="red">{errors.taxes}</Text>}
              </Group>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Insurance <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  min={0}
                  style={{ width: "100%" }}
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>
                  Maintenance <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  min={0}
                  style={{ width: "100%" }}
                  value={maintenance}
                  onChange={(e) => {
                    setMaintenance(e.target.value);
                    setErrors((prev) => ({ ...prev, maintenance: "" }));
                  }}
                />
                {errors.maintenance && (
                  <Text color="red">{errors.maintenance}</Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>Additional Charges</Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  min={0}
                  style={{ width: "100%" }}
                  value={additional_charges}
                  onChange={(e) => setAdditionalCharges(e.target.value)}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>Net Payable</Text>
                <Input
                  type="number"
                  placeholder="0"
                  classNames={{ input: classes.inputFeild }}
                  disabled
                  min={0}
                  style={{ width: "100%" }}
                  value={totalNet}
                />
              </Group>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              {loading ? (
                <Flex
                  justify="center"
                  align="center"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  <Loader color="#FFBC11" size="lg" />
                </Flex>
              ) : (
                <Group mb="md" position="apart">
                  <Text fw={600}>Cycle</Text>
                  <Flex direction="column" gap="xs">
                    <Radio
                      color="#FFBC11"
                      label="Month"
                      checked={cycle === "Month"}
                      onChange={() => handleCycleChange("Month")}
                    />
                    <Radio
                      color="#FFBC11"
                      label="Year"
                      checked={cycle === "Year"}
                      onChange={() => handleCycleChange("Year")}
                    />
                  </Flex>
                </Group>
              )}

              {cycle === "Month" && (
                <Box>
                  <Text>Month wise</Text>
                  <Select
                    placeholder="Select month"
                    style={{ width: "100%" }}
                    data={[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                    ]}
                  />
                </Box>
              )}

              {cycle === "Year" && (
                <Box>
                  <Text>Year wise</Text>
                  <Input
                    type="number"
                    placeholder="YYYY"
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Group mb="md" position="apart">
                <Text fw={600}>Starting Date</Text>
                <Input
                  type="date"
                  placeholder="Starting Date"
                  style={{ width: "100%" }}
                  value={starting_date}
                  onChange={(e) => setStarting_date(e.target.value)}
                />
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </Flex>
      <Box
        mt="md"
        bg="grey-pms"
        style={{ borderRadius: "9px", padding: "16px" }}
      >
        <Text fw={600} mb="sm">
          Other Occupants Details
        </Text>
        <Divider color="red" size="sm" mb="md" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {inputFields.map((field) => (
            <Group key={field.id} spacing="md" style={{ marginBottom: "10px" }}>
              <TextInput
                value={field.first_name}
                onChange={(e) => handleInputChange(field.id, "first_name", e)}
                placeholder="First Name"
                style={{ flex: 1 }}
              />
              <TextInput
                value={field.last_name}
                onChange={(e) => handleInputChange(field.id, "last_name", e)}
                placeholder="Last Name"
                style={{ flex: 1 }}
              />
              <TextInput
                value={field.gender}
                onChange={(e) => handleInputChange(field.id, "gender", e)}
                placeholder="Gender"
                style={{ flex: 1 }}
              />
              <TextInput
                value={field.occupation}
                onChange={(e) => handleInputChange(field.id, "occupation", e)}
                placeholder="Occupation"
                style={{ flex: 1 }}
              />
              <TextInput
                type="date"
                value={field.date_of_birth}
                onChange={(e) =>
                  handleInputChange(field.id, "date_of_birth", e)
                }
                style={{ flex: 1 }}
              />
              <TextInput
                value={field.email}
                onChange={(e) => handleInputChange(field.id, "email", e)}
                placeholder="Email"
                style={{ flex: 1 }}
              />
              <IconTrash
                size={24}
                color="black"
                onClick={() => removeRow(field.id)}
                style={{ cursor: "pointer" }}
              />
            </Group>
          ))}
        </div>
        <Center>
          <CusButton
            onClick={addRows}
            style={{ marginTop: "20px" }}
            value={"Add News"}
          />
        </Center>
      </Box>
      <Flex mt="lg" justify="flex-end">
        <Group>
          <CusButton
            variant="default"
            style={{
              backgroundColor: "#9C9C9C",
              color: "white",
              width: "130px",
              height: "34px",
            }}
            value="Reset"
            onClick={handleReset}
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
            value="Submit"
            onClick={handleSubmit}
          />
        </Group>
      </Flex>
    </Container>
  );
}

export default AddTenant;
