import {
  TextInput,
  NumberInput,
  Select,
  Flex,
  Text,
  Container,
  Group,
  Box,
  Input,
} from "@mantine/core";
import { CusButton } from "../../components/button";
import { useForm } from "@mantine/form";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

const AddProperty = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [block, setBlock] = useState(0);
  const [managerid, setManagerid] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [manager, setManager] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [typeid, setTypeid] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    location: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}${apiRoutes.allManager}`)
      .then((res) => {
        setManager(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${BASE_URL}${apiRoutes.propertytype}`)
      .then((res) => {
        setPropertyType(res.data.propertyType);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Property name is required.";
      isValid = false;
    }
    if (!size || size <= 0) {
      newErrors.size = "Size must be greater than 0.";
      isValid = false;
    }
    if (!streetAddress.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }
    if (
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim() ||
      !country.trim()
    ) {
      newErrors.location = "Complete location details are required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const ApiCall = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data = {
        name: name,
        size: size,
        block: block,
        managerid: managerid,
        typeid: typeid,
        propertyaddress: {
          streetAddress: streetAddress,
          city: city,
          state: state,
          postalCode: postalCode,
          country: country,
        },
      };
      await axios.post(`${BASE_URL}${apiRoutes.addproperty}`, data);
      alert("Data Created");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container my={66}>
      <Flex
        bg={"grey-pms"}
        h={46}
        align="center"
        style={{ borderRadius: "9px" }}
      >
        <Text fw="700" size={"24px"} ml={"sm"}>
          ADD PROPERTY
        </Text>
      </Flex>
      <Container
        size={"xl"}
        bg={"grey-pms"}
        my="20"
        h={600}
        style={{ borderRadius: "9px" }}
      >
        <Flex my={10} direction="row" gap="md" w="100%">
          <Flex my={30} direction="column" gap="md" w="50%">
            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Property Name <span style={{ color: "red" }}>*</span>
              </Text>
              <TextInput
                w="100%"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <Text color="red">{errors.name}</Text>}
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Size (in Sq. ft.) <span style={{ color: "red" }}>*</span>
              </Text>
              <Input
                type="number"
                w="100%"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="#######"
              />
              {errors.size && <Text color="red">{errors.size}</Text>}
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Location/Area <span style={{ color: "red" }}>*</span>
              </Text>
              <Input w="100%" placeholder="Add Location" />
              {errors.location && <Text color="red">{errors.location}</Text>}
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Address <span style={{ color: "red" }}>*</span>
              </Text>
              <TextInput
                w="100%"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Street Address"
              />
              {errors.address && <Text color="red">{errors.address}</Text>}
            </Flex>

            <Flex ml={20} align="center" direction="column" w="100%">
              <Flex w="100%" gap="md" direction="row">
                <TextInput
                  placeholder="City/District"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextInput
                  placeholder="State/Province"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Flex>
            </Flex>

            <Flex ml={20} align="center" direction="column" w="100%">
              <Flex w="100%" gap="md" direction="row">
                <TextInput
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <TextInput
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="column" gap="md" w="50%">
            <Flex mt={30} direction="column" align="start">
              <Text fw={500} w="100%">
                Property Type
              </Text>
              <Input
                w="100%"
                component="select"
                onChange={(e) => setTypeid(e.target.value)}
              >
                <option value={""}>- Select -</option>
                {propertyType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Input>
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                No. of Blocks
              </Text>
              <Input
                type="number"
                w="100%"
                placeholder="#######"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
              />
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Manager
              </Text>
              <Input
                w="100%"
                component="select"
                rightSection={<IconChevronDown size={17} />}
                placeholder="- Select -"
                value={managerid}
                onChange={(e) => {
                  e.preventDefault();
                  setManagerid(e.target.value);
                }}
              >
                <option value="" disabled={managerid !== ""}>
                  - Select -
                </option>
                {manager.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.first_name} {manager.last_name}
                  </option>
                ))}
              </Input>
            </Flex>

            <Flex direction="column" align="start">
              <Text fw={500} w="100%">
                Policies
              </Text>
              <Select w="100%" placeholder="- Select -" />
            </Flex>
          </Flex>
        </Flex>

        <Flex justify="flex-end">
          <Group>
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
        </Flex>
      </Container>
    </Container>
  );
};

export default AddProperty;
