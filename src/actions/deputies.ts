import AxiosRequest from 'helpers/axiosRequest/axiosRequest';

export const getDeputies = async () => AxiosRequest({ endpoint: 'deputies', method: 'GET' });

export const getDeputy = async (id: string | string[]) => AxiosRequest({ endpoint: `deputies/${id}`, method: 'GET' });
