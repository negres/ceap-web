import { Link, Typography } from '@mui/material';
import { getDeputy } from 'actions/deputies';
import { getDeputyExpense } from 'actions/deputyExpenses';
import CustomAvatar from 'components/Avatar/Avatar';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { Wrapper, WrapperAvatar } from 'pages-extras/Deputies/deputyDetails.styles';

const CustomTable = dynamic(() => import('components/Table/Table'));

const DeputyDetails = ({ deputy, expenses }: { deputy: any, expenses: any[] }) => {
  return (
    <Wrapper>
      <WrapperAvatar>
        <CustomAvatar imageUrl={deputy.urlPhoto} />
        <div>
          <Typography fontWeight={600} variant="h5">{deputy.name}</Typography>
          <Typography variant="h6">
            Legislatura:
            {deputy.legislature}
          </Typography>
        </div>
      </WrapperAvatar>
      <CustomTable deputies={expenses} isSingleData />
      <Link href='/deputados'>Voltar para a listagem de deputados</Link>
    </Wrapper>
  )
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const { data: { deputy = null } } = await getDeputy(id);
  const { data } = await getDeputyExpense(id);

  return { props: { deputy, expenses: data } }
}

export default DeputyDetails;