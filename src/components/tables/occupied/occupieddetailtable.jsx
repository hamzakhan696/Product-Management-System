import React, { memo } from "react";
import {
  Table,
  Checkbox,
  Group,
  Text,
  ScrollArea,
  Button,
  Modal,
} from "@mantine/core";
import cx from "clsx";
import classes from "./occupied.module.css";
import { CusButton } from "../../button";

const OccupiedTable = ({
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
        <Table.Td>{item.first_name ? item.first_name : "N/A"}</Table.Td>
        <Table.Td>{item.last_name ? item.last_name : "N/A"}</Table.Td>
        <Table.Td>{item.gender ? item.gender : "N/A"}</Table.Td>
        <Table.Td>{item.occupation ? item.occupation : "N/A"}</Table.Td>
        <Table.Td>{item.date_of_brith ? item.date_of_brith : "N/A"}</Table.Td>
        <Table.Td>{item.email ? item.email : "N/A"}</Table.Td>
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
                checked={selection?.length === data?.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Last Name</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Occupation</Table.Th>
            <Table.Th>Date of Brith</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default OccupiedTable;
