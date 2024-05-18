const getAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/city`, {
    headers: {
      'accept': '*/*'
    }
  });

  return response.json();
};

export const cityApi = { getAll };