import Axios from '../utils/Axios';

const getAll = async () => {
  const res = await Axios.get('/users');

  return res as unknown as { status: string; message: string };
};

export const apiClient = { getAll };
