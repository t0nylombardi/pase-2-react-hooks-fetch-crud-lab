export const ApiRequest = async (url, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);
  console.log('url: ', url)
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  // Only attempt to parse JSON if the response has content
  const data = await response.json().catch(() => null);
  return data;
};
