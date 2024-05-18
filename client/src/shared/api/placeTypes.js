const getAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/placeType`, {
    headers: {
      'accept': '*/*'
    }
  });

  return response.json();
};

export const placeTypeApi = { getAll };