const useUser = () => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("access_token");

    if (token) {
      return token;
    } else {
      return false;
    }
  }
};

export default useUser;
