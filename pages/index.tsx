import { Field, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import createData from 'actions/importData';
import Uploader from 'components/Uploader/Uploader';
import createFormData from 'helpers/formData/formData';
import { Content, SelectFieldWrapper, Wrapper } from 'pages-extras/Home/Home.styles';
import { Typography } from '@mui/material';
import importFileForm from 'schemas/importFile';

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);

  const initialValues = { file: '', year: '', email: '' };

  const createDataInfos = async (data: any) => {
    let formData = data;
    setShowMessage(true)

    const submitValues = createFormData(formData, '');
    await createData(submitValues);
  };

  const onSubmit = async (data: any, formik: FormikHelpers<any>) => {
    try {
      formik.setSubmitting(true);
      await createDataInfos(data);
    } catch (error) {
      formik.setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={importFileForm}>
        {({ isSubmitting, handleSubmit, errors, touched }) => (
          <Form>
            <Content>
              <Typography variant="h6" >Faça o upload do arquivo CSV</Typography>
              <Uploader name="file" />
              <SelectFieldWrapper>
                <Typography>Selecione o ano da CEAP</Typography>
                <Field as="select" name="year">
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Field>
              </SelectFieldWrapper>
              <div>
                <Typography margin="30px 0 10px">Informe seu email para ser informado quando os dados forem criados:</Typography>
                <Field type="email" name="email" placeholder="Email" />
                {touched.email && errors.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
              <div>
                <Button size="massive" onClick={handleSubmit} disabled={isSubmitting}>Enviar</Button>
              </div>
            </Content>
        </Form>
        )}
      </Formik>
      {showMessage && (
        <div>
          <Typography color="#1976d2">Os dados estão sendo carregados...</Typography>
          <Typography color="#1976d2" marginBottom="30px">Você receberá um email quando os dados forem criados.</Typography>
        </div>
      )}
    </Wrapper>
  )
};

export default Home;
