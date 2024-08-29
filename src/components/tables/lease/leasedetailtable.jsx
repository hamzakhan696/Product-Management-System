import React, { useState } from "react";
import {
  Checkbox,
  Container,
  Flex,
  ScrollArea,
  Text,
  Paper,
  Button,
} from "@mantine/core";
import classes from "./leasedetail.module.css";
import cx from "clsx";

function LeaseDetailReceipt({ data, selection, toggleRow, toggleAll }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((item) => (
    <Paper
      key={item.id}
      className={cx(classes.receiptItem, {
        [classes.selected]: selection.includes(item.id),
      })}
      onClick={() => toggleRow(item.id)}
      withBorder
      shadow="md"
      p="md"
      mb="sm"
      style={{
        cursor: "pointer",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: "#f9f9f9",
      }}
    >
      {[
        { label: "Base Rent", value: item.lease.base_rent },
        { label: "Tax", value: item.lease.taxes },
        { label: "Insurance", value: item.lease.insurance },
        { label: "Maintenance", value: item.lease.maintenance },
        { label: "Additional Charges", value: item.lease.additional_charges },
        { label: "Net Payable", value: item.lease.netPayable },
        { label: "Cycle", value: item.lease.cycle },
        { label: "Starting Date", value: item.starting_date },
      ].map((field, index) => (
        <Flex justify="space-between" mb="sm" key={index}>
          <Text fw="700" style={{ color: "#333" }}>
            {field.label}:
          </Text>
          <Text fw="500" style={{ color: "#666" }}>
            {field.value}
          </Text>
        </Flex>
      ))}
    </Paper>
  ));

  return (
    <ScrollArea
      h={450}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      style={{ padding: "20px" }}
    >
      <Container miw={400} className={classes.receiptContainer}>
        <Flex direction="column">
          <Flex justify="space-between" mb="md" align="center">
            <Text fw="700" style={{ fontSize: "20px", color: "#444" }}>
              Select All:
            </Text>
            <Checkbox
              onChange={toggleAll}
              checked={selection.length === data.length}
              indeterminate={
                selection.length > 0 && selection.length !== data.length
              }
            />
          </Flex>
          {rows}
        </Flex>
      </Container>
    </ScrollArea>
  );
}

export default LeaseDetailReceipt;
