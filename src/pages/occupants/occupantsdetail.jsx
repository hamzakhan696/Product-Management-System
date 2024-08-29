import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ActionIcon,
  Button,
  Center,
  CloseButton,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCopy, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import classes from "./occupantsdetail.module.css";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { CusButton } from "../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import { useDisclosure } from "@mantine/hooks";
import OccupiedTable from "../../components/tables/occupied/occupieddetailtable";

function OccupantsDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = () => setShowSearch(true);
  const handleClose = () => setShowSearch(false);
  const [opened, { open, close }] = useDisclosure(false);

  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const showModel = async () => {
    await getData();
    open();
  };

  const getData = async () => {
    try {
      const tenantid = localStorage.getItem("Tenantid");
      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getOccupantsByTenantId}${tenantid}`,
        {
          withCredentials: true,
        }
      );
      setData(res.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
    if (selection) {
      localStorage.setItem("Occupantsid", selection);
    }
  }, [selection]);

  const deleteData = async () => {
    try {
      await axios.delete(`${BASE_URL}${apiRoutes}`, {
        data: { ids: selection },
      });
      notifications.show(success.DataDeleted);
      getData();
      setSelection([]);
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

  const handleCloser = () => {
    localStorage.removeItem("Tenantid");
    close();
    if (data.length > 0) {
      window.location.reload();
    }
  };

  return (
    <>
      <Modal opened={opened} size="80%" onClose={handleCloser}>
        <Container size={"xl"} h={500}>
          <Container
            size={"xl"}
            bg={"grey-pms"}
            my={"15"}
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
                    textAlign: "center",
                    marginTop: "6px",
                  }}
                >
                  Occupants Detail{" "}
                  <span
                    style={{
                      color: "#FF0000",
                      fontSize: "12px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    Related to Tenant
                  </span>
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

          <OccupiedTable
            data={data}
            selection={selection}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
            scrolled={scrolled}
            setScrolled={setScrolled}
          />
        </Container>
      </Modal>
      <CusButton
        variant={"outline"}
        color={"red"}
        onClick={() => {
          showModel();
        }}
        style={{ color: "red" }}
        value={"View"}
      />
    </>
  );
}

export default OccupantsDetail;
