import logo from "../assets/splash-img.png";
import LoadingSpinner from "./LoadingSpinner";
import { Spinner } from "@chakra-ui/react";

const SplashScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-700">
      <img src={logo} alt="" />
      <Spinner size="xl" color="white" />
    </div>
  );
};

export default SplashScreen;
