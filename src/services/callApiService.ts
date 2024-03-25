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

const fetcherGet = async (url: string) => {
  try {
    const response = await restClient.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
export { fetcherPost, fetcherGet };
