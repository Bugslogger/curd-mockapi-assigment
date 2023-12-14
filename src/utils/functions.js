import instance from "./api";

/**
 *
 * @param {Object} params
 * @param {string} params.url
 * @param {Object} params.data
 * @returns {Object}
 */
export const post = async ({ url, data }) => {
  if (!url) return { message: "url parameter can not be empty." };

  if (typeof data !== "object")
    return { message: "invalid data type. data type must be object" };

  const response = await instance.post(url, data);

  return { response: response.data, status: response.status };
};

/**
 *
 * @param {Object} params
 * @param {string} params.url
 * @returns {Object}
 */
export async function get({ url }) {
  if (!url) return { message: "url parameter can not be empty." };
  const response = await instance.get(url);

  return { response: response.data, status: response.status };
}

/**
 *
 * @param {Object} params
 * @param {string} params.url
 * @param {string} params.param
 * @returns {Object}
 */
export async function Delete({ url, param }) {
  if (!url) return { message: "url parameter can not be empty." };
  if (!param) return { message: "param parameter can not be empty." };
  const response = await instance.delete(`${url}/${param}`);

  return { response: response.data, status: response.status };
}

/**
 *
 * @param {Object} params
 * @param {string} params.url
 * @param {string} params.param
 * @param {Object} params.data
 * @returns {Object}
 */
export const put = async ({ url, param, data }) => {
  if (!url) return { message: "url parameter can not be empty." };
  if (!param) return { message: "param parameter can not be empty." };

  if (typeof data !== "object")
    return { message: "invalid data type. data type must be object" };

  const response = await instance.put(`${url}/${param}`, data);

  return { response: response.data, status: response.status };
};
