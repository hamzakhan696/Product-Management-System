import {
  ActionIcon,
  Center,
  CloseButton,
  Container,
  Flex,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCopy, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import classes from "./propertydetail.module.css";
import DataTable from "../../components/tables/propertytable/propertydetailtable";
import React, { useEffect, useState } from "react";
import { PropertyAddModal } from "./PropertyModal/propertymodal";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import axios from "axios";
import { CusButton } from "../../components/button";
import { PropertyEditModal } from "./PropertyModal/editpropertymodal";
import { notifications } from "@mantine/notifications";
import { errors } from "../../utils/cusnotification";
import { useNavigate } from "react-router-dom";

function PropertyDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [tempDate, setTempData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleClose = () => {
    setShowSearch(false);
  };

  const search = (word) => {
    const arr = tempDate;
    const filter = arr.filter((item) => {
      return item.name?.toLowerCase().includes(word.toLowerCase());
    });
    setData(filter);
  };

  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiRoutes.property}`, {
        withCredentials: true,
      });
      setData(res.data);
      setTempData(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    if (selection) {
      localStorage.setItem("propertydetailselection", selection);
    }
  }, [selection]);

  const deleteData = async () => {
    try {
      await axios.delete(`${BASE_URL}${apiRoutes.deleteproperty}`, {
        data: { ids: selection },
      });
      alert("Selected records deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting records:", error);
      alert("Failed to delete selected records.");
    }
  };

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const handleOpen = () => {
    navigate("/property");
  };

  // useEffect(() => {
  //   if (selection.length !== 1) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [selection]);

  // useEffect(() => {
  //   if (showAlert) {
  //     notifications.show(errors.Notproperselection);
  //   }
  // }, [showAlert]);

  return (
    <Container size={"xl"} my="66">
      <Container
        size={"xl"}
        bg={"grey-pms"}
        style={{
          borderRadius: "9px",
        }}
      >
        <Flex justify="space-between" direction="row" wrap="wrap">
          {selection.length > 0 ? (
            <>
              <CusButton
                variant="default"
                type="submit"
                style={{
                  backgroundColor: "#FFBC11",
                  color: "Black",
                  marginTop: "3px",
                  width: "100px",
                }}
                value={"Delete"}
                leftSection={<IconTrash size="1rem" />}
                onClick={deleteData}
              />
              <PropertyEditModal disabled={selection.length > 1} />
              <CusButton
                variant="default"
                type="submit"
                style={{
                  backgroundColor: "#FFBC11",
                  color: "Black",
                  marginTop: "3px",
                  marginLeft: "5px",
                  width: "120px",
                }}
                value={"Duplicate"}
                leftSection={<IconCopy size="1rem" />}
              />
            </>
          ) : (
            <>
              <Text
                fw="700"
                style={{
                  fontSize: "24px",
                }}
              >
                All Property Details <span style={{ color: "red" }}>*</span>
              </Text>
            </>
          )}
          <Group
            spacing="lg"
            style={{ flexGrow: 1, justifyContent: "flex-end" }}
          >
            {!showSearch && (
              <ActionIcon
                size="xl"
                className={classes.buttonAction}
                variant="default"
                aria-label="Search"
                onClick={handleSearch}
              >
                <IconSearch />
              </ActionIcon>
            )}

            {showSearch && (
              <>
                <TextInput
                  bg={"Black"}
                  radius="8px"
                  placeholder="Search..."
                  onChange={(e) => search(e.target.value)}
                />
                <CloseButton
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",

                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                />
              </>
            )}

            <PropertyAddModal />

            <CusMenu shadow="md" width={120} items={menuItems} />
          </Group>
        </Flex>
      </Container>

      <br />
      {data.length > 0 ? (
        <DataTable
          data={data}
          selection={selection}
          toggleRow={toggleRow}
          toggleAll={toggleAll}
          scrolled={scrolled}
          setScrolled={setScrolled}
        />
      ) : (
        <React.Fragment>
          <Text
            style={{
              textAlign: "center",
              marginTop: "100px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            You haven't added any records yet!
          </Text>
          <Center my={10}>
            <CusButton
              style={{
                backgroundColor: "#FFBC11",
                color: "white",
                width: "150px",
                height: "40px",
              }}
              type="submit"
              value={"ADD"}
              leftSection={<IconPlus size={20} />}
              onClick={handleOpen}
            />
          </Center>
        </React.Fragment>
      )}
    </Container>
  );
}

export default PropertyDetail;
