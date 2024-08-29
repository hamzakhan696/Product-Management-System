import React, { memo } from "react";
import { Table, Checkbox, Group, Text, ScrollArea } from "@mantine/core";
import cx from "clsx";
import classes from "./propertydetailtable.module.css";

const DataTable = ({
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
              {item.propertyType ? item.propertyType.name : "N/A"}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.name} </Table.Td>
        <Table.Td>{item.size}</Table.Td>
        <Table.Td>{item.block}</Table.Td>
        <Table.Td>{item.userrole ? item.userrole.email : "NA"}</Table.Td>
        <Table.Td>
          {item.addresses.length > 0
            ? item.addresses[0].address.streetAddress
            : "N/A"}
        </Table.Td>
        <Table.Td>
          {item.addresses.length > 0
            ? item.addresses[0].address.streetAddress
            : "N/A"}
          ,{item.addresses.length > 0 ? item.addresses[0].address.city : "N/A"},
          {item.addresses.length > 0 ? item.addresses[0].address.state : "N/A"},
          {item.addresses.length > 0
            ? item.addresses[0].address.postalCode
            : "N/A"}
          ,
          {item.addresses.length > 0
            ? item.addresses[0].address.country
            : "N/A"}
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
            <Table.Th>Property Type</Table.Th>
            <Table.Th>Property Name</Table.Th>
            <Table.Th>Size (in Sq.ft)</Table.Th>
            <Table.Th>No. of Blocks</Table.Th>
            <Table.Th>Manager</Table.Th>
            <Table.Th>Location/Area</Table.Th>
            <Table.Th>Address</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default memo(DataTable);
