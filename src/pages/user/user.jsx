import {
  Card,
  Avatar,
  Text,
  Button,
  Modal,
  ActionIcon,
  Flex,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./user.module.css";
import { IconSettings } from "@tabler/icons-react";
import { DropzoneButton } from "../../components/upload/dropzones";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { apiRoutes } from "../../utils/PrivateRoute";

export function UserInfo() {
  const [opened, setOpened] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(""); // Initialize name state as an empty string
  const [data, setData] = useState(null); // State for user data
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(""); // Initialize address state as an empty string
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Load the image and name from local storage on component mount
  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    const storedName = localStorage.getItem("name");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Fetch user data from API and update state
  const getData = async () => {
    try {
      const id = localStorage.getItem("userId");
      const res = await axios.get(`${BASE_URL}${apiRoutes.getuser}${id}`);
      setData(res.data);
      setName(res.data.firstName); // Update name state with API data
      setAddress(res.data.address || "Dha phase 1, Lahore Cantt"); // Update address state with API data, fallback to default
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle image upload and save to local storage in PNG format
  const handleDrop = async (files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const base64String = canvas.toDataURL("image/png");

          setAvatar(base64String);
          localStorage.setItem("avatar", base64String);
        };

        img.onerror = (err) => {
          console.error("Image loading error:", err);
        };
      };

      reader.onerror = (err) => {
        console.error("FileReader error:", err);
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle saving the username and address to local storage
  const handleSave = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("address", address); // Save address to local storage
    // Ideally, you should also update the database with new name and address
    window.location.reload();
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} centered>
        <Card padding="xl" radius="md" className={classes.card}>
          <Flex
            mih={50}
            gap="md"
            align="flex-start"
            direction="row"
            wrap="wrap"
          >
            <Avatar
              src={
                avatar ||
                "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              }
              size={100}
              radius={80}
              mt={-30}
              className={classes.avatar}
            />
            <DropzoneButton
              onDrop={handleDrop}
              idleText="Upload your Profile"
              acceptText="Drop your resume here"
              rejectText="Only image files are allowed"
            />
          </Flex>
          {isEditingName ? (
            <TextInput
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <Text
              ta="center"
              fz="lg"
              fw={500}
              mt="sm"
              onClick={() => setIsEditingName(true)}
            >
              {name}
            </Text>
          )}

          {isEditingAddress ? (
            <TextInput
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
              onBlur={() => setIsEditingAddress(false)}
              autoFocus
            />
          ) : (
            <Text
              ta="center"
              fz="sm"
              c="dimmed"
              onClick={() => setIsEditingAddress(true)}
            >
              <b>Address :</b> {address}
            </Text>
          )}

          <Button
            onClick={handleSave} // Save button to handle name and address saving
            fullWidth
            radius="md"
            mt="xl"
            size="md"
            color="yellow"
          >
            Save
          </Button>
        </Card>
      </Modal>
      <Tooltip bg={"white"} c={"black"} label="Setting">
        <ActionIcon
          variant="outline"
          size="lg"
          radius="md"
          aria-label="Settings"
          color="white"
          onClick={() => setOpened(true)}
        >
          <IconSettings style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </>
  );
}
