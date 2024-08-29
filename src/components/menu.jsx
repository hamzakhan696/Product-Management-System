import { ActionIcon, Menu, MenuItem, MenuLabel } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function CusMenu({ shadow = "", width = "", label = "", items = [] }) {
  return (
    <Menu shadow={shadow} width={width}>
      <Menu.Target as="div">
        <ActionIcon
          size="xl"
          style={{
            backgroundColor: "#FFBC11",
          }}
          variant="default"
          aria-label="Notification"
        >
          <IconDots />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuLabel>{label}</MenuLabel>
        {items.map((item, index) => (
          <MenuItem key={index}>
            <Link
              style={{
                textDecoration: "none",
                color: "Black",
              }}
              href={item.link}
            >
              {item.label}
            </Link>
          </MenuItem>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
