const useLogout = (onLogout) => {
  const logout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return logout;
};

export default useLogout;
