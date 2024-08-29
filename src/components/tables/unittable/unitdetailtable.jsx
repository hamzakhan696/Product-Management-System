import React, { memo } from "react";
import { Table, Checkbox, Group, Text, ScrollArea } from "@mantine/core";
import cx from "clsx";
import classes from "./unitdetailtable.module.css";

const UnitTable = ({
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
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.block ? item.block.name : "N/A"}</Table.Td>
        <Table.Td>{item.floor ? item.floor.name : "N/A"}</Table.Td>
        <Table.Td>{item.area ? item.area : "N/A"}</Table.Td>
        <Table.Td>{item.bedrooms ? item.bedrooms : "N/A"}</Table.Td>
        <Table.Td>{item.bathrooms ? item.bathrooms : "N/A"}</Table.Td>
        <Table.Td>{item.amenities ? item.amenities : "N/A"}</Table.Td>
        <Table.Td>{item.property ? item.property.name : "N/A"}</Table.Td>
        <Table.Td>{item.owner ? item.owner.name : "N/A"}</Table.Td>
        <Table.Td>{item.unitstatue ? item.unitstatue.name : "N/A"}</Table.Td>

        {/* <Table.Td>{item.userrole ? item.userrole.email : "NA"}</Table.Td>
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
        </Table.Td> */}
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
            <Table.Th>Unit Name</Table.Th>
            <Table.Th>Block</Table.Th>
            <Table.Th>Floor</Table.Th>
            <Table.Th>Area (in Sq.ft)</Table.Th>
            <Table.Th>Bedrooms</Table.Th>
            <Table.Th>Bathrooms</Table.Th>
            <Table.Th>Amenities</Table.Th>
            <Table.Th>Property Name</Table.Th>
            <Table.Th>Owner Email</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Tenant Name</Table.Th>
            <Table.Th>Manager Email</Table.Th>
            <Table.Th>Old Tenant</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default UnitTable;
