import { BarChart } from "@mantine/charts";
import { data } from "./data";
import classes from "./charts.module.css";

export function CusBarChart() {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      type="stacked"
      series={[
        { name: "Apples", color: "#F4947E" },
        { name: "Oranges", color: "#FFD15B" },
      ]}
      className={classes.charts}
    />
  );
}
