import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Flex, Modal, Text } from "@mantine/core";
import LeaseDetailReceipt from "../../components/tables/lease/leasedetailtable";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { CusButton } from "../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import { useDisclosure } from "@mantine/hooks";

function LeaseDetail() {
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

  const getData = async () => {
    try {
      const tenantid = localStorage.getItem("Tenantid");
      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getleasedetailBytenantId}${tenantid}`,
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
      localStorage.setItem("leaseDetail", selection);
    }
  }, [selection]);
  useEffect(() => {
    if (opened) {
      toggleAll();
    }
  }, [opened]);

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
        {/* <Container
          size={"xl"}
          bg={"grey-pms"}
          style={{
            borderRadius: "9px",
          }}
          my={"15"} */}

        <Text fw={600} style={{ fontSize: "30px" }} mb="sm">
          Lease Detail
        </Text>
        <Divider color="red" size="sm" mb={"md"} />
        <LeaseDetailReceipt
          data={data}
          selection={selection}
          toggleRow={toggleRow}
          toggleAll={toggleAll}
          scrolled={scrolled}
          setScrolled={setScrolled}
        />
        <Flex justify={"flex-end"}>
          <CusButton
            variant={"outline"}
            color={"red"}
            onClick={open}
            style={{ color: "red", right: "10px" }}
            value={"Edit"}
          />
          <CusButton
            variant={"outline"}
            color={"red"}
            onClick={open}
            style={{ color: "red" }}
            value={"Delete"}
          />
        </Flex>
      </Modal>
      <CusButton
        variant={"outline"}
        color={"red"}
        onClick={open}
        style={{ color: "red" }}
        value={"View"}
      />
    </>
  );
}

export default LeaseDetail;
