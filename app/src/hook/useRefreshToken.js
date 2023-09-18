import useContextAuth from "./useContextAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useContextAuth();

  const refresh = async () => {
    // console.log("Refresh started");

    const response = await axios
      .get("/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err.response.data
      });

    setAuth((previous) => {
      return {
        ...previous,
        token: response.token,
        user:response.user,
        id:response.id,
        role: response.role
      };
    });

    return response.token;
  };

  return refresh;
};

export default useRefreshToken;
