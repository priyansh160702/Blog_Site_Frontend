import logo from "../assets/splash-img.png";

const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      <img src={logo} alt="" />
    </div>
  );
};

export default SplashScreen;
