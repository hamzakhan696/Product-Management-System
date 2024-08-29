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
import {
  IconCopy,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./unitdetail.module.css";
import UnitTable from "../../components/tables/unittable/unitdetailtable";
import React, { useEffect, useState } from "react";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import axios from "axios";
import { CusButton } from "../../components/button";
import { UnitEditModal } from "./editunit";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import { UnitAddModal } from "./addunit";
import { useNavigate } from "react-router-dom";

function UnitDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleClose = () => {
    setShowSearch(false);
  };

  const search = (word) => {
    const arr = tempData;
    const filter = arr.filter((item) =>
      item.name?.toLowerCase().includes(word.toLowerCase())
    );
    setData(filter);
  };

  const handleOpen = () => {
    navigate("/unit");
  };

  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiRoutes.allunit}`);
      setData(res.data);
      setTempData(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    if (selection) {
      localStorage.setItem("unitdetailselection", selection);
    }
  }, []);

  const deleteData = async () => {
    try {
      await axios.delete(`${BASE_URL}${apiRoutes.deleteunit}`, {
        data: { ids: selection },
      });
      notifications.show(success.DataDeleted);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting records:", error);
      notifications.show(errors.DataDeleted);
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

  return (
    <Container size={"xl"} my="30">
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
              <UnitEditModal disabled={selection.lenght > 1} />
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
                All Unit Details <span style={{ color: "red" }}>*</span>
              </Text>
            </>
          )}
          <Group
            spacing="lg"
            style={{ flexGrow: 1, justifyContent: "flex-end" }}
          >
            <UnitAddModal />
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

            <CusMenu shadow="md" width={120} items={menuItems} />
          </Group>
        </Flex>
      </Container>
      <br />
      {data.length > 0 ? (
        <UnitTable
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

export default UnitDetail;
