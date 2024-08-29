import React from "react";
import { Button } from "@mantine/core";

export function CusButton({
  value,
  className,
  icon,
  onClick,
  size,
  variant,
  ...props
}) {
  return (
    <Button
      onClick={onClick}
      className={className}
      leftSection={icon}
      variant={variant}
      size={size}
      {...props}
    >
      {value}
    </Button>
  );
}
