// Fetch authenticated API routes using the user's token
export const authFetch = async (
  url: string,
  token: string,
  method: string = "GET",
  options?: RequestInit
): Promise<Response> => {
  const headers = new Headers({
    Authorization: token,
  });

  const fetchOptions: RequestInit = {
    method,
    headers,
    ...options,
  };

  const res = await fetch(url, fetchOptions);

  return res;
};
