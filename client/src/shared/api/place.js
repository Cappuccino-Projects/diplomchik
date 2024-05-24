const getAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/place`, {
    headers: {
      'accept': '*/*'
    }
  });

  const data = await response.json();
  // console.log(import.meta.env.VITE_API_DOMAIN);
  return data;
};

export const placeApi = { getAll };