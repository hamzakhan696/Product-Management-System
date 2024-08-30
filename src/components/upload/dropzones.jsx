import { useRef } from "react";
import { Text, Group, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./dropzonebutton.module.css";

export function DropzoneButton({
  setImage, // Function to update the image state in ComplaintEditModal
  accept = [MIME_TYPES.pdf, MIME_TYPES.png], // File types allowed
  maxSize = 30 * 1024 ** 2,
  buttonText = "Select files",
  idleText = "Upload resume",
  acceptText = "Drop files here",
  rejectText = "File type not allowed",
  imageName, // The current image name to display
}) {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  const handleDrop = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setImage(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={accept}
        maxSize={maxSize}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center" mt="-20" mr={10}>
            <Dropzone.Accept style={{ width: "90px" }}>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg">
            <Dropzone.Accept>{acceptText}</Dropzone.Accept>
            <Dropzone.Reject>{rejectText}</Dropzone.Reject>
            <Dropzone.Idle>{idleText}</Dropzone.Idle>
          </Text>
        </div>
      </Dropzone>

      {imageName && (
        <Text ta="center" mt="sm" fw={500}>
          Current image: {imageName.name || imageName}{" "}
          {/* Display the image name */}
        </Text>
      )}
    </div>
  );
}
