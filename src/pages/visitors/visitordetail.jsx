import React, { useEffect, useState } from "react";
import axios from "axios";
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
import classes from "./visitordetail.module.css";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { CusButton } from "../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import VisitorDetailTable from "../../components/tables/visitor /visitordetailtable";

function VisitorDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = () => setShowSearch(true);
  const handleClose = () => setShowSearch(false);
  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiRoutes}`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    if (selection) {
      localStorage.setItem("AmenitiesSelection", selection);
    }
  }, [selection]);

  const deleteData = async () => {
    try {
      await axios.delete(`${BASE_URL}${apiRoutes.deleteAmenities}`, {
        data: { ids: selection },
      });
      notifications.show(success.DataDeleted);
      getData(); // Refresh data after deletion
      setSelection([]); // Clear selection after deletion
    } catch (error) {
      notifications.show(errors.DataNotDeleted);
    }
  };

  const toggleRow = (id) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  };

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
                type="button"
                style={{
                  backgroundColor: "#FFBC11",
                  color: "Black",
                  marginTop: "3px",
                  width: "100px",
                }}
                value={"Delete"}
                onClick={deleteData}
                leftSection={<IconTrash size="1rem" />}
              />
              {/* <AmenitiesEditModal disabled={selection.length > 1} /> */}
              <CusButton
                variant="default"
                type="button"
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
            <Text
              fw="700"
              style={{
                fontSize: "24px",
              }}
            >
              All Visitors <span style={{ color: "red" }}>*</span>
            </Text>
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
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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

            {/* <AmenitiesModal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            /> */}

            <ActionIcon
              className={classes.buttonAction}
              size="xl"
              aria-label="Notification"
              variant="default"
              onClick={() => setIsModalOpen(true)}
            >
              <IconPlus />
            </ActionIcon>
            <CusMenu shadow="md" width={120} items={menuItems} />
          </Group>
        </Flex>
      </Container>
      <br />
      {data.length > 0 ? (
        <VisitorDetailTable
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
              type="button"
              value={"ADD"}
              leftSection={<IconPlus size={20} />}
              onClick={() => setIsModalOpen(true)}
            />
          </Center>
        </React.Fragment>
      )}
    </Container>
  );
}

export default VisitorDetail;
