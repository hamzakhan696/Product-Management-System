import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
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

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      const base65Bar = await convertToBase64(bar_png);
      const tableContent = selectedData.map((item) => [
        item.rent_amount || "",
        item.overdue_amount || "",
        item.paid_amount || "",
        item.unpaid_amount || "",
        item.status || "",
      ]);

      const selectedItem = selectedData[0];

      const docDefinition = {
        content: [
          {
            text: "Unique Adventure",
            style: "header",
            alignment: "left",
            margin: [0, 90, 0, 5],
          },
          {
            text: "Busniess Center LLC",
            style: "subtitle",
            alignment: "left",
          },
          {
            columns: [
              [
                {
                  text: `Tenant: ${
                    selectedItem.leasecontract.tenant.frist_name || ""
                  }`,
                  style: "titlename",
                  margin: [0, 20, 0, 10],
                },
                {
                  text: `Email: ${
                    selectedItem.leasecontract.tenant.email || ""
                  }`,
                  style: "titlename",
                  margin: [0, 0, 0, 10],
                },
                {
                  text: `Phone: ${
                    selectedItem.leasecontract.tenant.phone || ""
                  }`,
                  style: "titlename",
                  margin: [0, 0, 0, 10],
                },
              ],
              [
                {
                  text: `Property: ${
                    selectedItem.leasecontract.property.name || ""
                  }`,
                  style: "titlenameright",
                  margin: [0, 20, 50, 10],
                },
                {
                  text: `Unit: ${selectedItem.leasecontract.unit.name || ""}`,
                  style: "titlenameright",
                  margin: [0, 0, 50, 10],
                },
                {
                  text: `Owner: ${
                    selectedItem.leasecontract.owner.first_name || ""
                  }`,
                  style: "titlenameright",
                  margin: [0, 0, 50, 10],
                },
              ],
            ],
            columnGap: 30,
          },
          {
            image: base65Bar,
            width: 500,
            height: 15,
          },
          {
            text: "Invoice Rental Detail",
            style: "header",
            margin: [0, 40, 0, 20],
          },
          {
            table: {
              headerRows: 1,
              widths: ["*", "*", "*", "*", "*"],
              body: [
                [
                  "Rent Amount",
                  "Overdue Amount",
                  "Paid Amount",
                  "Unpaid Amount",
                  "Status",
                ],
                ...tableContent,
              ],
            },
            layout: "lightHorizontalLines",
            margin: [0, 0, 0, 0],
          },
          {
            canvas: [
              {
                type: "rect",
                x: 350,
                y: 85,
                w: 190,
                h: 40,
                r: 10,
                lineWidth: 1,
                lineColor: "black",
                shadow: {
                  x: 3,
                  y: 3,
                  color: "rgba(0, 0, 0, 0.5)",
                  blur: 5,
                },
              },
            ],
          },
          {
            text: `Net Payable: ${selectedItem.net_payable || ""}`,
            style: "netpayable",
            absolutePosition: { x: 400, y: 487 },
          },
        ],
        defaultStyle: {
          fontSize: 12,
        },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          netpayable: {
            fontSize: 15,
            bold: true,
            color: "black",
          },
          titlename: {
            fontSize: 12,
            color: "black",
            alignment: "left",
          },
          titlenameright: {
            fontSize: 12,
            color: "black",
            alignment: "right",
          },
          subtitle: {
            fontSize: 10,
            color: "black",
          },
        },
        header: function (currentPage, pageCount, pageSize) {
          return [
            {
              columns: [
                {
                  image: base64Logo,
                  width: 100,
                  height: 100,
                },
              ],
              margin: [40, 10],
            },
          ];
        },
        footer: function (currentPage, pageCount, pageSize) {
          return [
            {
              text: "Address: ",
              alignment: "right",
              margin: [0, 10, 20],
            },
          ];
        },
      };

      pdfMake.createPdf(docDefinition).open();
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
