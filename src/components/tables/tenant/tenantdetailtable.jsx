import React, { memo } from "react";
import { Table, Checkbox, Group, Text, ScrollArea } from "@mantine/core";
import cx from "clsx";
import classes from "./tenantdetailtable.module.css";
import LeaseDetail from "../../../pages/lease/leasedetail";
import OccupantsDetail from "../../../pages/occupants/occupantsdetail";

const TenantTable = ({
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
        {/* <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              <CusButton
                variant={"outline"}
                color={"red"}
                style={{ color: "red" }}
                value={"Tenant"}
              />
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          {" "}
          <CusButton
            variant={"outline"}
            color={"red"}
            style={{ color: "red" }}
            value={"Renovate"}
          />
        </Table.Td> */}
        <Table.Td style={{ textAlign: "center" }}>
          {item.frist_name ? item.frist_name : "N/A"}
          {""}
          {""} {""}
          {item.last_name ? item.last_name : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.occupation ? item.occupation : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.date_of_brith ? item.date_of_brith.slice(0, 10) : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.email ? item.email : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          {item.contact ? item.contact : "N/A"}
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          <LeaseDetail />
        </Table.Td>
        <Table.Td style={{ textAlign: "center" }}>
          <OccupantsDetail />
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
            <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Occupation</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Date of Brith</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Email</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Contact</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Lease</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>Occupants</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default TenantTable;
