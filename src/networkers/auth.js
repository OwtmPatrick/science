import { executeRequest } from "../utils";

export const fetchLogIn = async (username, password) =>
  await executeRequest({
    method: "POST",
    endpoint: "/public/admin/auth/login",
    body: {
      contentType: "application/json",
      content: JSON.stringify({ username, password })
    }
  });