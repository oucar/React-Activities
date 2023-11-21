import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

// DEBUG ONLY - REMOVE BEFORE PRODUCTION
axios.defaults.baseURL = "http://localhost:5000/api";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(800);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  // see get request in const request above.
  // <Activity[]> represent the <T> that we will be replacing in the request.
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  // since we're not getting anything back for create, update, and delete, we can use void.
  create: (activity: Activity) => axios.post<void>("/activities", activity),
  update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
