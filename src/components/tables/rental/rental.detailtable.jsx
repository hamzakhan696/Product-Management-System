import React, { memo } from "react";
import {
  Table,
  Checkbox,
  Group,
  Text,
  ScrollArea,
  Button,
} from "@mantine/core";
import cx from "clsx";
import classes from "./rental.module.css";
import { CusButton } from "../../button";

const RentalTable = ({
  data,
  selection,
  toggleRow,
  toggleAll,
  scrolled,
  setScrolled,
}) => {
  const rows = data.map((item) => {
    const selected = selection.includes(item.id);

    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.rent_amount ? item.rent_amount : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.overdue_amount ? item.overdue_amount : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.unpaid_amount ? item.unpaid_amount : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.paid_amount ? item.paid_amount : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.mode_of_payment ? item.mode_of_payment : "N/A"}
        </Table.Td>
        <Table.Td
          style={{
            backgroundColor:
              item.status === "Paid"
                ? "#a9f099"
                : item.status === "Not Paid"
                ? "#f09999"
                : "#faa6a0",
            borderRadius: "50px",
            textAlign: "center",
            width: "100px",
          }}
        >
          <strong>{item.status ? item.status : "N/A"}</strong>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea
      h={650}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th style={{ width: 40 }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Rent Amount</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Overdue</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Unpaid Amount</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Paid Amount</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Payment Method</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default RentalTable;
