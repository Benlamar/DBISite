import { useEffect } from "react";
import { axiosAuth, axiosAuthMultiPart } from "../api/axios";
import useContextAuth from "./useContextAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosInterceptor = () => {
  const refresh = useRefreshToken();
  const { auth } = useContextAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = auth.token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = newAccessToken;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosAuth;
};

export const useAxiosInterceptorMultipart = () => {
  const refresh = useRefreshToken();
  const { auth } = useContextAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuthMultiPart.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = auth.token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuthMultiPart.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = newAccessToken;
          return axiosAuthMultiPart(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuthMultiPart.interceptors.request.eject(requestInterceptor);
      axiosAuthMultiPart.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosAuthMultiPart;
};

export default useAxiosInterceptor;
