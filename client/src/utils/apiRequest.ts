import axios from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions<Body> {
  method: Method;
  url: string;
  data?: Body;
  token?: string;
}

export const apiRequest = async <Response, Body = unknown>({
  method,
  url,
  data,
  token,
}: ApiRequestOptions<Body>): Promise<Response> => {
  const response = await axios.request<Response>({
    method,
    url,
    data,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  return response.data;
};
