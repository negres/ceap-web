import { Field, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Link from 'next/link';

import { getDeputies } from 'actions/deputies';
import createData from 'actions/importData';
import Loader from 'components/Loader/Loader';
import Uploader from 'components/Uploader/Uploader';
import createFormData from 'helpers/formData/formData';
import { Content, SelectFieldWrapper, Wrapper } from 'pages-extras/Home/Home.styles';
import { Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

const Home = ({ hasDataCreated }: { hasDataCreated: boolean }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = { file: '', year: '' };

  const createDataInfos = async (data: any) => {
    let formData = data;
    setLoading(true);

    const submitValues = createFormData(formData, '');
    await createData(submitValues);
  };

  const onSubmit = async (data: any, formik: FormikHelpers<any>) => {
    try {
      formik.setSubmitting(true);
      await createDataInfos(data);
    } catch (error) {
      formik.setSubmitting(false);
      alert('Dados já adicionados');
      Router.push(`/deputados`);
    }
  };

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Content>
              <Typography variant="h6" >Faça o upload do arquivo CSV</Typography>
              <Uploader name="file" />
              <SelectFieldWrapper>
                <label>Selecione o ano da CEAP</label>
                <Field as="select" name="year">
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </Field>
              </SelectFieldWrapper>
              <div>
                <Button size="massive" onClick={handleSubmit} disabled={isSubmitting}>Enviar</Button>
              </div>
            </Content>
        </Form>
        )}
      </Formik>
      {loading && (
        <div>
          <Typography color="#1976d2">Os dados estão sendo carregados...</Typography>
          <Typography color="#1976d2" marginBottom="30px">Por favor, aguarde!</Typography>
          <Loader />
        </div>
      )}
      {hasDataCreated && !loading && (
        <>
          <Link href='/deputados'>Clique aqui para visualizar os deputudos</Link>
        </>
      )}
    </Wrapper>
  )
};

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  let hasDataCreated = false;
  const { data: { deputies } } = await getDeputies();
  if (deputies.length > 0) {
    hasDataCreated = true;
  }

  return { props: { hasDataCreated } }
};

export default Home;
