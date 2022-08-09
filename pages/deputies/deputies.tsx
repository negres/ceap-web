import { Typography } from '@mui/material';
import { getDeputies } from 'actions/deputies';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

const CustomTable = dynamic(() => import('components/Table/Table'));

const Deputies = ({ deputies }: { deputies: any[] }) => {
  console.log(deputies[0])
  return (
    <>
      <Typography variant="h4" align="center">Deputados do Estado do Ceará</Typography>
      <CustomTable deputies={deputies} />
    </>
  );
};

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
  const { data: { deputies } } = await getDeputies();

  return { props: { deputies } };
};

export default Deputies;