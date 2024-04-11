import RestClient from "./apiService";
import { ApiResponseProductBrandAndCategory, TProfile } from "./type";

const restClient = new RestClient();
const fetcherPost = async (url: string, { arg }: { arg: {} }) => {
  try {
    const response = await restClient.post(url, arg);
    return response;
  } catch (error) {
    return error;
  }
};

const fetcherPatch = async (url: string, { arg }: { arg: ApiResponseProductBrandAndCategory }) => {
  const patchUrl = `${url}/${arg.id}`;
  try {
    const response = await restClient.patch(patchUrl, arg);
    return response;
  } catch (error) {
    throw new Error(`Error patch data: ${error}`);
  }
};

const fetcherPut = async <T extends { userId: number }>(url: string, { arg }: { arg: T }) => {
  const putUrl = `${url}/${arg.userId}`;

  try {
    const response = await restClient.put(putUrl, arg);
    return response;
  } catch (error) {
    throw new Error(`Error putting data: ${error}`);
  }
};

const fetcherDelete = async (url: string, { arg }: { arg: ApiResponseProductBrandAndCategory }) => {
  const deleteUrl = `${url}/${arg.id}`;
  try {
    const response = await restClient.delete(deleteUrl);
    return response;
  } catch (error) {
    throw new Error(`Error delete data: ${error}`);
  }
};

const fetcherGet = async <T>(url: string, query?: object): Promise<T> => {
  try {
    const restClient = new RestClient();
    const response = await restClient.get(url, query);
    return response as T;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export { fetcherPost, fetcherGet, fetcherPatch, fetcherPut, fetcherDelete };
