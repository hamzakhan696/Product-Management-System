import { useDisclosure } from "@mantine/hooks";
import { Modal, ActionIcon, Container } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./unitdetail.module.css";
import Addunit from "./unit";

export function UnitAddModal() {
  const [opened, { open: openModal, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        size="70rem"
        style={{ overflowY: "auto" }}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Addunit />
      </Modal>
      <ActionIcon
        size="xl"
        className={classes.buttonAction}
        variant="default"
        aria-label="Notification"
        onClick={openModal}
      >
        <IconPlus />
      </ActionIcon>
    </>
  );
}
