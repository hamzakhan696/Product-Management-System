import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { HeaderProfile } from "../header/header";

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      withBorder={false}
      navbar={{
        width: "283",
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <Navbar />
        <HeaderProfile />
      </AppShell.Navbar>
      <AppShell.Main>
        <section>
          <Outlet />
        </section>
      </AppShell.Main>
    </AppShell>
  );
}
