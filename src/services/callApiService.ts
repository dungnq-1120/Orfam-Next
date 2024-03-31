import RestClient from "./apiService";

const restClient = new RestClient();

const fetcherPost = async (url: string, { arg }: { arg: {} }) => {
  try {
    const response = await restClient.post(url, arg);
    return response;
  } catch (error) {
    return error;
  }
};

const fetcherGet = async <T>(url: string, query?: object): Promise<T> => {
  console.log(query);

  try {
    const restClient = new RestClient();
    const response = await restClient.get(url, query);
    return response as T;
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export { fetcherPost, fetcherGet };
