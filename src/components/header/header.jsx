import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import classes from "./header.module.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../pages/user/user";

export function HeaderProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const storedAvatar = localStorage.getItem("avatar");
  const getData = async () => {
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.get(`${BASE_URL}${apiRoutes.getuser}${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ApiCall = async () => {
    try {
      await axios.post(
        `${BASE_URL}${apiRoutes.logout}`,
        {},
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavg = () => {
    const id = localStorage.getItem("userId");
    navigate(`profile/${id}`);
  };
  const handleLogout = () => {};

  return (
    <UnstyledButton className={classes.user}>
      <Group justify="center">
        <Tooltip bg={"white"} c={"black"} label="Profile">
          <Avatar src={storedAvatar} radius="xl" />
        </Tooltip>

        <Text size="md" fw={700}>
          {localStorage.getItem("name")}
        </Text>

        <UserInfo />
        <Tooltip bg={"white"} c={"black"} label="Log out">
          <ActionIcon
            variant="outline"
            size="lg"
            radius="md"
            aria-label="logout"
            color="white"
            onClick={ApiCall}
          >
            <IconLogout style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </UnstyledButton>
  );
}
