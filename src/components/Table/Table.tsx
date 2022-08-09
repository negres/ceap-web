import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import formatCurrency from 'helpers/formatCurrency/formatCurrency';
import { Link, TableHead, Typography } from '@mui/material';
import formatDate from 'helpers/formatDate/formatDate';

const CustomTable = ({ deputies, isSingleData }: { deputies: any[], isSingleData?: boolean }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: '0 auto 30px'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: '#d1d1d1'}}>
          <TableRow>
            {isSingleData ? (
              <>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Data de emissão</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Fornecedor</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Valor líquido</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Link do documento</TableCell>
              </>
            ): (
              <>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Nome</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">CPF</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Partido político</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Maior despesa</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Total de despesas</TableCell>
                <TableCell sx={{ fontWeight: 'bold'}} align="center">Detalhes</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? deputies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : deputies
          ).map((deputy) => (
              <TableRow
                key={deputy.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {isSingleData ? (
                  <>
                    <TableCell align="center">{formatDate(deputy.emissionDate)}</TableCell>
                    <TableCell align="center">{deputy.provider}</TableCell>
                    <TableCell align="center" width={150} >{formatCurrency(deputy.netValue)}</TableCell>
                    <TableCell align="center"><Link target="_blank" href={deputy.urlDocument}>{deputy.urlDocument}</Link></TableCell>
                  </>
                ): (
                  <>
                    <TableCell component="th" scope="row">{deputy.name}</TableCell>
                    <TableCell align="center">{deputy.cpf}</TableCell>
                    <TableCell align="center">{deputy.state}</TableCell>
                    <TableCell align="center">{deputy.politicalPartyAcronym}</TableCell>
                    <TableCell align="center">{formatCurrency(deputy.maxExpense)}</TableCell>
                    <TableCell align="center">{formatCurrency(deputy.totalExpenses)}</TableCell>
                    <TableCell align="center"><Link href={`deputados/${deputy.id}`}>Detalhar</Link></TableCell>
                  </>
                )}
              </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={deputies.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}

export default CustomTable;
