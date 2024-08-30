import React from "react";
import { Table, Checkbox, Group, Text, ScrollArea, Image } from "@mantine/core";
import cx from "clsx";
import classes from "./raisedetailtable.module.css";
import { BASE_URL } from "../../../utils/constants";

const RaiseDetailTable = ({
  data,
  selection,
  toggleRow,
  toggleAll,
  scrolled,
  setScrolled,
}) => {
  const rows = data.flat().map((item, index) => {
    // Flattening the array if needed
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
              {index + 1}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item.service?.name || "N/A"}</Text>{" "}
          {/* Display Service Name */}
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item.unit?.name || "N/A"}</Text>{" "}
          {/* Display Unit Name */}
        </Table.Td>
        <Table.Td>
          <Text size="sm">
            {new Date(item.date_of_reporting).toLocaleDateString()}
          </Text>{" "}
          {/* Display Date of Reporting */}
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item.subject}</Text> {/* Display Subject */}
        </Table.Td>
        <Table.Td>
          <Text size="sm">{item.detail}</Text> {/* Display Detail */}
        </Table.Td>
        <Table.Td>
          {item.complaintattachments && item.complaintattachments.length > 0 ? (
            <Image
              src={`${BASE_URL}${item.complaintattachments[0].url}`}
              alt={item.complaintattachments[0].name}
              width={100}
              height={100}
              fit="cover"
            />
          ) : (
            <Text size="sm">No Image</Text>
          )}
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
            <Table.Th>No</Table.Th>
            <Table.Th>Service Name</Table.Th>
            <Table.Th>Unit Name</Table.Th> {/* Added Unit Name column */}
            <Table.Th>Date of Reporting</Table.Th>
            <Table.Th>Subject</Table.Th>
            <Table.Th>Detail</Table.Th>
            <Table.Th>Image</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default RaiseDetailTable;
