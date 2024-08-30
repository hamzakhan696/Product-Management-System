import {
  Box,
  Container,
  Flex,
  Grid,
  NumberInput,
  Select,
  TextInput,
  Input,
  Group,
  Text,
  Center,
  Button,
  ActionIcon,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconBath, IconBedFlat, IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";

// add unit file
function Addunit() {
  const [propertyid, setPropertyid] = useState("");
  const [blockid, setBlockid] = useState("");
  const [floorid, setFloorid] = useState("");
  const [name, setName] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [amenities, setAmenites] = useState("");
  const [ownerid, setOwner] = useState("");
  const [managerid, setManager] = useState("");
  const [stateid, setStateid] = useState("");
  const [area, setArea] = useState("");
  const [allmanager, setAllmanager] = useState([]);
  const [allproperty, setAllproperty] = useState([]);
  const [allUnitStatus, setAllUnitStatus] = useState([]);
  const [allAmenities, setAllAmenities] = useState([]);
  const [allowner, setAllOwner] = useState([]);
  const [allblock, setAllblock] = useState([]);
  const [allfloor, setAllFloor] = useState([]);
  const [errors, setErrors] = useState({
    propertyid: "",
    blockid: "",
    name: "",
    ownerid: "",
    stateid: "",
  });

  console.log(stateid, "Ownerid");

  const validateForm = () => {
    let isValid = true;

    if (!propertyid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        propertyid: "Please select a property.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, propertyid: "" }));
    }

    if (!blockid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        blockid: "Please select a block.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, blockid: "" }));
    }

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Unit name is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    if (!ownerid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        owner: "Owner Select is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, owner: "" }));
    }

    if (!stateid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Status: "Unit name is required.",
      }));
      isValid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, Status: "" }));
    }

    return isValid;
  };

  const ApiCall = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const values = {
        propertyid: propertyid,
        blockid: blockid,
        floorid: floorid,
        name: name,
        area: area,
        bedrooms: bedrooms,
        bathroom: bathroom,
        ownerid: ownerid,
        amenitieid: amenities,
        managerid: managerid,
        statusid: stateid,
      };
      await axios.post(`${BASE_URL}${apiRoutes.addunit}`, values);
      alert("Data Created");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allManager}`)
      .then((res) => {
        setAllmanager(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.allproperty}`)
      .then((res) => {
        setAllproperty(res.data.property);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.allunitstatus}`)
      .then((res) => {
        setAllUnitStatus(res.data.unit);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.getAmenities}`)
      .then((res) => {
        setAllAmenities(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.allOwner}`)
      .then((res) => {
        setAllOwner(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.getblock}`)
      .then((res) => {
        setAllblock(res.data.block);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BASE_URL}${apiRoutes.getfloor}`)
      .then((res) => {
        setAllFloor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <Container my={30}>
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
            Add Unit Details
          </Text>
        </Box>
      </Container>
      <form onSubmit={form.onSubmit((values) => propertyAdd(values))}>
        <Container
          size={"xl"}
          bg={"grey-pms"}
          my="17"
          style={{ borderRadius: "9px", minHeight: "650px" }}
        >
          <Container>
            <Grid>
              <Flex
                mt={32}
                gap="sm"
                justify="space-between"
                direction="row"
                wrap="wrap"
              >
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Property Name <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      value={propertyid}
                      onChange={(e) => {
                        setPropertyid(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          propertyid: "",
                        }));
                      }}
                      rightSection={<IconChevronDown size={17} />}
                    >
                      <option value={""}>- Select -</option>
                      {allproperty.map((d, i) => (
                        <option key={d.id} value={d.id}>
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
                  <Text fw={600}>Manager Email </Text>
                  <Input
                    component="select"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    value={managerid}
                    onChange={(e) => setManager(e.target.value)}
                    rightSection={<IconChevronDown size={17} />}
                  >
                    <option value={""}>- Select -</option>
                    {allmanager.map((d, i) => (
                      <option key={d.id} value={d.id}>
                        {d.email}
                      </option>
                    ))}
                  </Input>
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Unit Name <span style={{ color: "red" }}>*</span>
                    </Text>
                    <TextInput
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          name: "",
                        }));
                      }}
                    />
                    {errors.name && <Text color="red">{errors.name}</Text>}
                  </Group>
                </Grid.Col>

                <Group mt={20} justify="space-between">
                  <Text fw={600}>Amenities</Text>
                  <Input
                    rightSection={<IconChevronDown size={17} />}
                    component="select"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    onChange={(e) => setAmenites(e.target.value)}
                  >
                    <option>- Select -</option>
                    {allAmenities.map((d, i) => (
                      <option value={d.id} key={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </Input>
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>Block</Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      placeholder="Add Block"
                      onChange={(e) => setBlockid(e.target.value)}
                    >
                      <option>- Select -</option>
                      {allblock.map((d, i) => (
                        <option>{d.name}</option>
                      ))}
                    </Input>
                  </Group>
                </Grid.Col>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>Area (in Sq. ft.) </Text>
                  <Input
                    type="number"
                    placeholder="#####"
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>Floor</Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      placeholder="- Select -"
                      onChange={(e) => setAllFloor(e.target.value)}
                    >
                      <option>- Select -</option>
                      {allfloor.map((d, i) => (
                        <option key={i} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </Input>
                  </Group>
                </Grid.Col>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>Bedrooms </Text>
                  <Input
                    rightSection={<IconBedFlat size={20} />}
                    pointer
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    placeholder="Bedroom"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  ></Input>
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      {" "}
                      Owner Email <span style={{ color: "red" }}>*</span>{" "}
                    </Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      placeholder="- Select -"
                      onChange={(e) => {
                        setOwner(e.target.value);
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          owner: "",
                        }));
                      }}
                    >
                      <option>- Select -</option>
                      {allowner.map((owner) => (
                        <option value={owner.id} key={owner.id}>
                          {owner.email}
                        </option>
                      ))}
                    </Input>
                    {errors.owner && <Text color="red">{errors.owner}</Text>}
                  </Group>
                </Grid.Col>
                <Group mt={20} justify="space-between">
                  <Text fw={600}>Bathrooms</Text>
                  <TextInput
                    rightSection={<IconBath size={17} />}
                    pointer
                    style={{
                      width: "246px",
                      height: "30px",
                      marginLeft: "10px",
                    }}
                    placeholder="Bathrooms"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                  ></TextInput>
                </Group>
                <Grid.Col span={6}>
                  <Group mt={20} justify="space-between">
                    <Text fw={600}>
                      Status <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      component="select"
                      style={{
                        width: "246px",
                        height: "30px",
                        marginRight: "35px",
                      }}
                      onChange={(e) => setStateid(e.target.value)}
                    >
                      <option>- Select -</option>
                      {allUnitStatus.map((d, i) => (
                        <option value={d.id} key={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </Input>
                    {errors.Status && <Text color="red">{errors.Status}</Text>}
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
                onClick={ApiCall}
              />
            </Group>
          </Box>
        </Container>
      </form>
    </Container>
  );
}

export default Addunit;
