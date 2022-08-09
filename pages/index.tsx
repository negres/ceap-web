import { Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Link from 'next/link';

import { getDeputies } from 'actions/deputies';
import createData from 'actions/importData';
import Loader from 'components/Loader/Loader';
import Uploader from 'components/Uploader/Uploader';
import createFormData from 'helpers/formData/formData';
import { Content, Wrapper } from 'pages-extras/Home/Home.styles';
import { Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';

const Home = ({ hasDataCreated }: { hasDataCreated: boolean }) => {
  const [isCreatedData, setIsCreatedData] = useState(hasDataCreated);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { data: { deputies } } = await getDeputies();

    if (deputies.length > 0) {
      setIsCreatedData(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchData();

    // if (!isCreatedData) {
    //   setInterval( async () => {
    //   }, 60000);
    //   clearInterval();
    // }

  }, []);

  const initialValues = { file: '' };

  const onSubmit = async (data: any, formik: FormikHelpers<any>) => {
    let formData = data;

    const submitValues = createFormData(formData, '');
    setLoading(true);

    try {
      formik.setSubmitting(true);

      await createData(submitValues);
    } catch (error) {
      formik.setSubmitting(false);
    }
  }

  return (
    <Wrapper>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Content>
              <Typography variant="h6" >Faça o upload do arquivo CSV</Typography>
              <Uploader name="file" />
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
          <Loader />
        </div>
      )}
      {isCreatedData && (
        <>
          <Typography marginTop="30px">Verificamos que já consta cadastrado os dados dos deputados</Typography>
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
