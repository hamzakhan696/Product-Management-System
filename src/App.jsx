import React, { Suspense, useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import CusLoader from "./components/loader/loader";
import { MantineProvider, Loader } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Notifications } from "@mantine/notifications";

const App = () => {
  // const [loading, setLoading] = useState(true);
  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);

  return (
    <MantineProvider
      theme={{
        components: {
          Loader: Loader.extend({
            defaultProps: {
              loaders: { ...Loader.defaultLoaders, custom: CusLoader },
              type: "custom",
            },
          }),
        },
        fontFamily: "Inter, sans-serif",
        colors: {
          "orange-pms": [
            "#fff6e1",
            "#ffeccc",
            "#ffd79b",
            "#ffc164",
            "#ffae38",
            "#ffa31b",
            "#ff9900",
            "#e38800",
            "#ca7800",
            "#b06700",
          ],
          "grey-pms": [
            "#f5f5f5",
            "#e7e7e7",
            "#cdcdcd",
            "#b2b2b2",
            "#9a9a9a",
            "#8b8b8b",
            "#e7e7e7",
            "#717171",
            "#656565",
            "#575757",
          ],
        },
      }}
    >
      {/* Notification */}
      <Notifications />
      <BrowserRouter>
        {/* {loading && <Loader />} */}
        {/* {!loading && <AppRoutes />} */}
        <Suspense fallback={<h1>Loading</h1>}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default App;
