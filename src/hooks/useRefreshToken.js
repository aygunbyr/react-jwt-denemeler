import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post("/auth/CreateTokenByRefreshToken", {}, {
      withCredentials: true,
    });

    const roleConstant = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

    const decoded = jwtDecode(response.data?.data?.accessToken);

    const roles = decoded?.[roleConstant] || [];

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      console.log("token:");
      console.log(response.data?.data?.accessToken);
      return {
        ...prev,
        roles,
        accessToken: response.data?.data?.accessToken,
      };
    });
    return response.data?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
