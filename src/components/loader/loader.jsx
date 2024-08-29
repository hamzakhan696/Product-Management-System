import { forwardRef, memo } from "react";
import cx from "clsx";
import { Loader } from "@mantine/core";
import classes from "./loader.module.css";

const CusLoader = forwardRef(({ className, ...others }, ref) => (
  <Loader
    component="span"
    className={cx(classes.loader, className)}
    {...others}
    ref={ref}
  />
));

export default memo(CusLoader);
