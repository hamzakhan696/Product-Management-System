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

export function UserInfo() {
  const [opened, setOpened] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("Kayan Tahir");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState("Dha phase 1, Lahore Cantt");
  const [avatar, setAvatar] = useState(null);

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

  // Handle saving the username to local storage
  const handleSave = () => {
    localStorage.setItem("name", name);
    window.location.reload(); // Refresh the page to see the updated information
  };

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

          <Text
            ta="center"
            fz="sm"
            c="dimmed"
            onClick={() => setIsEditingAddress(true)}
          >
            <b>Address :</b> {address}
          </Text>

          <Button
            onClick={handleSave} // Update this line to use onClick instead of onChange
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
