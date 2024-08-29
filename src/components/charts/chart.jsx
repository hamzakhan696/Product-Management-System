import { LineChart } from "@mantine/charts";
import { data } from "./data";
import classes from "./charts.module.css";

export function Charts() {
  return (
    <LineChart
      className={classes.charts}
      data={data}
      series={[
        { name: "Apples", color: "#F4947E" },
        { name: "Oranges", color: "#FFD15B" },
      ]}
      dataKey="date"
      strokeWidth={5}
      curve="natural"
    />
  );
}

export default Charts;
