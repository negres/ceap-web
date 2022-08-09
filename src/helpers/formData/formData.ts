import { toString } from 'lodash/fp';

const createFormData = (data: { [key: string]: any }, objectName: string) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const isFile = data[key] instanceof File;
    const value = isFile ? data[key] : toString(data[key]);
    formData.append(`${objectName}[${key}]`, value as string | Blob);
  });

  return formData;
};

export default createFormData;
