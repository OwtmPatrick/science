import { API_URL } from "../constants";

export const executeRequest = async ({ method, endpoint, token, body }) => {
  const headers = {};
  if (body) {
    headers["Content-Type"] = body.contentType;
  }

  if (token) {
    headers.Authorization = token;
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body: body ? body.content : undefined
    }).then(res => res.json());
    switch (response.status) {
      case 0:
        resolve(response);
        break;
      default:
        reject(response);
        break;
    }
  });
};
