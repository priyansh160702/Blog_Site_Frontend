import { Spinner, Center } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Center height="70vh">
      <Spinner size="xl" color="blue.500" />
    </Center>
  );
};

export default LoadingSpinner;
