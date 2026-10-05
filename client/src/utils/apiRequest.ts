import axios from "axios";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions<Body> {
  method: Method;
  url: string;
  data?: Body;
}

export const apiRequest = async <Response, Body = unknown>({
  method,
  url,
  data,
}: ApiRequestOptions<Body>): Promise<Response> => {
  const response = await axios.request<Response>({
    method,
    url,
    data,
  });

  return response.data;
};

//  "displayName": "avroumi",
//   "description": "warning ",
//   "priority": "Low",
//   "arena":"South",
//   "status": "Active",
//   "lon": 35.5786,
//   "lat":33.2806
