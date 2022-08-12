import * as Yup from 'yup';

export const email = /^(([^<>()[\]\\.,;:*\s@"]+(\.[^<>()[\]\\.,;:*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const importFileForm = () => Yup.object().shape({
  email: Yup.string()
    .required('Email é obrigatório'),
  year: Yup.string()
    .required('O ano é obrigatório'),
  file: Yup.string()
  .required('O arquivo é obrigatório'),
});

export default importFileForm;
