const getAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/place`, {
    headers: {
      'accept': '*/*'
    }
  });

  return response.json();
};

export const placeApi = { getAll };