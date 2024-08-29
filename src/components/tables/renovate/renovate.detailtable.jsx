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
import classes from "./vacantdetailtable.module.css";
import { CusButton } from "../../button";

const RenovateTable = ({
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
        <Table.Td>
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
        </Table.Td>
        <Table.Td>{item.name ? item.name : "N/A"}</Table.Td>
        <Table.Td>{item.block ? item.block : "N/A"}</Table.Td>
        <Table.Td>{item.floor ? item.floor : "N/A"}</Table.Td>
        <Table.Td>{item.area ? item.area : "N/A"}</Table.Td>
        <Table.Td>{item.bedrooms ? item.bedrooms : "N/A"}</Table.Td>
        <Table.Td>{item.bathrooms}</Table.Td>
        <Table.Td>{item.amenities ? item.amenities.name : "N/A"}</Table.Td>
        <Table.Td>{item.owner ? item.owner.name : "N/A"}</Table.Td>
        <Table.Td>{item.manager ? item.manager.name : "N/A"}</Table.Td>
        <Table.Td>
          {" "}
          <CusButton
            variant={"outline"}
            color={"red"}
            style={{
              color: "red",
            }}
            value={"Complaint"}
          />
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
            <Table.Th>Add Tenant</Table.Th>
            <Table.Th>Renovate</Table.Th>
            <Table.Th>Unit Name</Table.Th>
            <Table.Th>Block</Table.Th>
            <Table.Th>Floor</Table.Th>
            <Table.Th>Area(in Sq.ft)</Table.Th>
            <Table.Th>Bedrooms</Table.Th>
            <Table.Th>Bathroom</Table.Th>
            <Table.Th>Amenities</Table.Th>
            <Table.Th>Owner Email</Table.Th>
            <Table.Th>Manager Email</Table.Th>
            <Table.Th>Complaint</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default RenovateTable;
