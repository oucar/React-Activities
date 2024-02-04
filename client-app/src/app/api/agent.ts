import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

// DEBUG ONLY - REMOVE BEFORE PRODUCTION
axios.defaults.baseURL = "http://localhost:5000/api";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      // Validation Error
      // Each missing field, etc will be displayed on the client side
      case 400:
        // Invalid Guid
        // It essentialy is a validation error as well
        if (config.method === "get" && Object.prototype.hasOwnProperty.call(data.errors, "id")) {
          router.navigate("/not-found");
        }


        if (data.errors) {
          // this will create an array of arrays for each error
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          // this will flatten the array of arrays into one array
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    // this will reject the promise and send it to the catch block
    return Promise.reject(error);
  }
);

// Axios interceptors are functions that Axios calls for every request and response.
// We are using the request interceptor to add the token to the request headers.
axios.interceptors.request.use(config => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
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
  update: (activity: Activity) =>
    axios.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const Account = {
  // returns a promise of type User
  current: () => requests.get<User>("/account"),
  // getting back an user as response
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) => requests.post<User>("/account/register", user),
}

const agent = {
  Activities,
  Account
};

export default agent;
