import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import {
  gridPageSelector,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
  gridPageSizeSelector,
} from '@mui/x-data-grid';

const DataGridFooter = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const rowsCount = apiRef.current.getRowsCount();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      pl={3}
      pr={2}
      py={1.5}
      width={1}
      sx={{
        // background: 'linear-gradient(90deg, #e3f2fd, #bbdefb)', // light blue gradient
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)', // soft shadow
        borderRadius: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: '#0d47a1', // deep blue
          fontWeight: 500,
        }}
      >
        {`${page * pageSize + 1}-${Math.min((page + 1) * pageSize, rowsCount)} of ${rowsCount}`}
      </Typography>

      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => {
          event.preventDefault();
          apiRef.current.setPage(value - 1);
        }}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#277a85ff', // default text color
            fontWeight: 500,
          },
          '& .Mui-selected': {
            backgroundColor: '#8db0b1ff !important',
            color: '#fff !important',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: '#8db0b1ff',
            color: '#fff',
          },
        }}
      />
    </Stack>
  );
};

export default DataGridFooter;
