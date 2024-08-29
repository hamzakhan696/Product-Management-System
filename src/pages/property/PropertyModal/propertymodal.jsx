import { useDisclosure } from "@mantine/hooks";
import { Modal, ActionIcon, Container } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "../propertydetail.module.css";
import AddProperty from "../property";

export function PropertyAddModal() {
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
        <Container style={{ position: "relative", left: 0, right: 0 }}>
          <AddProperty />
        </Container>
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
