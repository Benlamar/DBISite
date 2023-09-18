import axios from "../api/axios";
import useContextAuth from "./useContextAuth";

const useLogout = () => {
  const { setAuth } = useContextAuth();

  const logout = async () => {
    try {
      const response = await axios.post("/logout", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("Refresh token received",res)
        setAuth({});
        return res.data
      })
      .catch((err) => {
        // console.log("Refresh token ot received",err);
        return err.response.data
      });

      console.log(response)
      
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
