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
import classes from "./block.module.css";
import BlockTable from "../../components/tables/block/blockdetailtable";
import React, { useEffect, useState } from "react";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import axios from "axios";
import { CusButton } from "../../components/button";
import BlockModal from "./BlockModel/blockmodel";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";

function BlockDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleClose = () => {
    setShowSearch(false);
  };

  const search = (data) => {
    return data.filter((item) =>
      item.propertytype.toLowerCase().includes(query)
    );
  };

  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiRoutes.getblock}`);
      setData(res.data.block);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpen = () => {};

  //   const deleteData = async () => {
  //     try {
  //       await axios.delete(`${BASE_URL}${apiRoutes.deleteproperty}`, {
  //         data: { ids: selection },
  //       });
  //       alert("Selected records deleted successfully.");
  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Error deleting records:", error);
  //       alert("Failed to delete selected records.");
  //     }
  //   };

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  console.log(data);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

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
              <CusButton
                variant="default"
                type="submit"
                style={{
                  backgroundColor: "#FFBC11",
                  color: "Black",
                  marginTop: "3px",
                  marginLeft: "5px",
                  width: "100px",
                }}
                value={"Edit"}
                leftSection={<IconEdit size="1rem" />}
              />
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
                All Block Details <span style={{ color: "red" }}>*</span>
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
            <BlockModal
              opened={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
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
        <BlockTable
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
              onClick={() => setIsModalOpen(true)}
            />
          </Center>
        </React.Fragment>
      )}
    </Container>
  );
}

export default BlockDetail;
