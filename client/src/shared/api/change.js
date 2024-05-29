const getAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/change`, {
    headers: {
      'accept': '*/*'
    }
  });

  const data = await response.json();
  // console.log(import.meta.env.VITE_API_DOMAIN);
  return data;
};

export const changeApi = { getAll };