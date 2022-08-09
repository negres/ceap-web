import AxiosRequest from 'helpers/axiosRequest/axiosRequest';

const createData = async (data: object) => AxiosRequest({ endpoint: 'import_file', method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, data });

export default createData;
