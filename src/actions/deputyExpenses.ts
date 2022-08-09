import AxiosRequest from 'helpers/axiosRequest/axiosRequest';

export const getDeputyExpense = async (id: string | string[]) => AxiosRequest({ endpoint: `deputies/${id}/expenses`, method: 'GET' });
