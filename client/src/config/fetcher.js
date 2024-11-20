//Intercept fetch requests and add the jwt token to the header
function updateOptions(options) {
  const update = { ...options };
  if (localStorage.jwt) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${JSON.parse(localStorage.jwt)}`,
    };
  }
  return update;
}

export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}
