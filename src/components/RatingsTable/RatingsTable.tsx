import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IUserWithPoints } from './interfaces/user.interface';

interface Column {
  id: 'username' | 'firstName' | 'lastName' | 'summaryPoints';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

interface IRatingsTable {
  data: IUserWithPoints[];
}

const RatingsTable: React.FC<IRatingsTable> = ({ data }) => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns: Column[] = [
    {
      id: 'username',
      label: t('ratings.username'),
      align: 'center',
      minWidth: 170,
    },
    {
      id: 'firstName',
      label: t('ratings.firstName'),
      align: 'center',
      minWidth: 100,
    },
    {
      id: 'lastName',
      label: t('ratings.lastName'),
      minWidth: 170,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'summaryPoints',
      label: t('ratings.summaryPoints'),
      minWidth: 170,
      align: 'center',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ backgroundColor: '#404040' }}>
      <Paper
        sx={{
          width: '80%',
          backgroundColor: '#404040',
          color: 'white',
          margin: 'auto',
          height: '100vh',
        }}
      >
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            <TableBody style={{ color: 'white' }}>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      style={{ color: 'white' }}
                    >
                      {columns.map((column) => {
                        const value: any = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ color: 'white' }}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ color: 'white' }}
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RatingsTable;
