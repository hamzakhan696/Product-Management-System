import React, { memo } from "react";
import { Table, Checkbox, Group, Text, ScrollArea } from "@mantine/core";
import cx from "clsx";
import classes from "./ownerdetailtable.module.css";

const OwnerTable = ({
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
              {item.first_name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td> {item.last_name} </Table.Td>
        <Table.Td> {item.email} </Table.Td>
        <Table.Td>
          {" "}
          {item.address.streetAddress},{item.address.city},{item.address.state},
          {item.address.postalCode},{item.address.country}
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
            <Table.Th>Firstname</Table.Th>
            <Table.Th>Lastname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Address</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default OwnerTable;
