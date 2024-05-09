// CustomModal.js

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoadingModal({ isOpen, onClose }: LoadingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Cargando información...</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoadingModal;
