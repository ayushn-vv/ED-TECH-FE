/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { rows } from './data';
import ActionMenu from './ActionMenu';
import { Box, TextField, InputAdornment } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

/* ------------------ DEBOUNCE HOOK ------------------ */
const useDebounce = (value: string, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
/* ---------------------------------------------------- */

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'courses',
    headerName: 'Courses',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 220,
  },
  {
    field: 'progress',
    headerName: 'Progress',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 200,
    renderCell: (params) => {
      return (
        <Stack alignItems="center" gap={1} pr={2} height={1} width={1}>
          <Typography variant="body2" minWidth={40}>
            {params.value}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{
              width: 1,
              height: 6,
              borderRadius: 4,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(to right, #b0b3b6d7, #90dadd)',
              },
            }}
          />
        </Stack>
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    headerAlign: 'center',
    editable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => {
      const color =
        params.value === 'in progress'
          ? 'primary'
          : params.value === 'completed'
          ? 'success'
          : params.value === 'pending'
          ? 'warning'
          : 'info';

      return (
        <Stack direction="column" alignItems="center" justifyContent="center" height={1}>
          <Chip label={params.value} size="small" color={color} />
        </Stack>
      );
    },
  },
  {
    field: 'timeLeft',
    headerName: 'Time Left',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'action',
    headerName: '',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    sortable: false,
    flex: 1,
    minWidth: 100,
    renderHeader: () => <ActionMenu />,
    renderCell: () => <ActionMenu />,
  },
];

interface TaskOverviewTableProps {
  searchText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    status: string;
  dateRange: string;
}

const TaskOverviewTable = ({ searchText, handleInputChange }: TaskOverviewTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  /* ⭐ Debounced search */
  const debouncedSearch = useDebounce(searchText, 350);

  /* ⭐ Controlled pagination to keep footer fixed */
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  /* ⭐ Reset page + apply search on debounce */
  useEffect(() => {
    // Fix pagination jump
    setPaginationModel((prev) => ({ ...prev, page: 0 }));

    apiRef.current.setQuickFilterValues(
      debouncedSearch.split(/\b\W+\b/).filter((word) => word !== '')
    );
  }, [debouncedSearch]);

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 3, padding: 2, backgroundColor: 'background.paper' }}>
      {/* 🔎 SEARCH BAR */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          variant="filled"
          size="small"
          placeholder="Search Task"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon={'mynaui:search'} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* ⭐ FIX PAGINATION SIZE (prevents jumping) */}
      <Box sx={{ height: 450 }}>
        <DataGrid
          apiRef={apiRef}
          density="standard"
          columns={columns}
          rows={rows}
          rowHeight={60}
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          checkboxSelection
          pageSizeOptions={[5]}
          /* ⭐ Controlled Pagination */
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          slots={{
            pagination: DataGridFooter,
          }}
        />
      </Box>
    </Box>
  );
};

export default TaskOverviewTable;
