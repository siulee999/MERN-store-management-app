import axios from "./axios"
import useAuth from "../hooks/useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  
  async function refresh() {
    const response  = await axios.post("/auth/refresh", null, { withCredentials: true });

    setAuth(prev => ({...prev, token: response.data.accessToken}));
    return response.data.accessToken;
  }

  return refresh;
}