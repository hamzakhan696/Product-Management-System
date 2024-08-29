import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
import classes from "./rentaldetail.module.css";
import RentalTable from "../../components/tables/rental/rental.detailtable";
import { CusMenu } from "../../components/menu";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { CusButton } from "../../components/button";
import { notifications } from "@mantine/notifications";
import { errors, success } from "../../utils/cusnotification";
import logo_File from "../../assets/pngs/logo_File.png";
import bar_png from "../../assets/pngs/bar_png.png";
import { RentalEditModal } from "./rentalmodel/editrentalmodal";

function RentalDetail() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null); // Ref to capture the table

  const handleSearch = () => setShowSearch(true);
  const handleClose = () => setShowSearch(false);
  const menuItems = [
    { label: "List", link: "/item1" },
    { label: "Add", link: "/item2" },
    { label: "Delete", link: "/item3" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}${apiRoutes.getRentalDetailAndLeaseDetail}`,
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
      localStorage.setItem("AmenitiesSelection", selection);
    }
  }, [selection, data]);

  const deleteData = async () => {
    try {
      await axios.delete(`${BASE_URL}${apiRoutes.deleteAmenities}`, {
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

  const convertToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const generatePDF = async () => {
    const selectedData = data.filter((item) => selection.includes(item.id));

    if (selectedData.length > 0) {
      const base64Logo = await convertToBase64(logo_File);
      const base64Bar = await convertToBase64(bar_png);
      const tableContent = selectedData.map((item) => [
        item.rent_amount || "",
        item.overdue_amount || "",
        item.paid_amount || "",
        item.unpaid_amount || "",
        item.status || "",
      ]);

      const selectedItem = selectedData[0];

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Unique Adventure", 10, 30);
      doc.setFontSize(12);
      doc.text("Business Center LLC", 10, 40);

      doc.addImage(base64Logo, "PNG", 10, 10, 50, 20);
      doc.addImage(base64Bar, "PNG", 10, 50, 180, 15);

      doc.setFontSize(12);
      doc.text(
        `Tenant: ${selectedItem.leasecontract.tenant.frist_name || ""}`,
        10,
        80
      );
      doc.text(
        `Email: ${selectedItem.leasecontract.tenant.email || ""}`,
        10,
        90
      );
      doc.text(
        `Phone: ${selectedItem.leasecontract.tenant.phone || ""}`,
        10,
        100
      );
      doc.text(
        `Property: ${selectedItem.leasecontract.property.name || ""}`,
        10,
        110
      );
      doc.text(`Unit: ${selectedItem.leasecontract.unit.name || ""}`, 10, 120);
      doc.text(
        `Owner: ${selectedItem.leasecontract.owner.first_name || ""}`,
        10,
        130
      );

      doc.text("Invoice Rental Detail", 10, 150);

      doc.autoTable({
        startY: 160,
        head: [
          [
            "Rent Amount",
            "Overdue Amount",
            "Paid Amount",
            "Unpaid Amount",
            "Status",
          ],
        ],
        body: tableContent,
        styles: { valign: "middle" },
      });

      doc.text(
        `Net Payable: ${selectedItem.net_payable || ""}`,
        10,
        doc.autoTable.previous.finalY + 10
      );

      doc.save("invoice.pdf");
    } else {
      notifications.show({
        title: "No Selection",
        message: "Please select some records to generate the PDF.",
        color: "red",
      });
    }
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
              <RentalEditModal />
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
              All Rental Details <span style={{ color: "red" }}>*</span>
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
            <CusButton
              variant="default"
              type="button"
              style={{
                backgroundColor: "#FFBC11",
                color: "Black",
                marginTop: "3px",
                width: "150px",
              }}
              value={"Generate PDF"}
              onClick={generatePDF}
            />
          </Group>
        </Flex>
      </Container>
      <br />
      {data.length > 0 ? (
        <div ref={tableRef}>
          <RentalTable
            data={data}
            selection={selection}
            toggleRow={toggleRow}
            toggleAll={toggleAll}
            scrolled={scrolled}
            setScrolled={setScrolled}
          />
        </div>
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

export default RentalDetail;
