/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  useGridApiRef,
  GridApi,
} from "@mui/x-data-grid";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  // Typography,
  // LinearProgress,
  Card,
  Tooltip,
} from "@mui/material";
import IconifyIcon from "components/base/IconifyIcon";
import DataGridFooter from "components/common/DataGridFooter";
import ActionMenu from "./ActionMenu";
import { useGetCourses } from "redux/useCourse";

type BackendColumn = { field: string; headerName?: string; [key: string]: unknown };
type Course = {
  id: number;
  title?: string;
  status?: string;
  progress?: number;
  description?: string;
  tags?: string;
  category?: string;
  [key: string]: any;
};

/* Debounce */
const useDebounce = (value: string, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

/* Truncate */
const truncate = (text: string, limit = 45) =>
  text?.length > limit ? text.substring(0, limit) + "..." : text;

interface Props {
  searchText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskOverviewTable = ({ searchText, handleInputChange }: Props) => {
  const apiRef = useGridApiRef<GridApi>();
  const debouncedSearch = useDebounce(searchText);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { data } = useGetCourses({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: debouncedSearch,
  });

  const backendRows: Course[] = (data?.data || []).filter(
    (course: Course) => course?.status?.toLowerCase() === "published"
  );

  // const totalRows = backendRows.length;

  const excludedFields = [
    "id",
    "createdAt",
    "updatedAt",
    "createdById",
    "updatedById",
    "isDeleted",
    "instructorId",
    "thumbnail",
  ];

  const backendColumns: BackendColumn[] = useMemo(() => {
    if (!backendRows.length) return [];
    return Object.keys(backendRows[0])
      .filter((key) => !excludedFields.includes(key))
      .map((key) => ({
        field: key,
        headerName: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
      }));
  }, [backendRows]);

  /* ================================
      FINAL COLUMN DEFINITIONS
     ================================ */
  const finalColumns: GridColDef[] = useMemo(() => {
    return backendColumns.map((col) => {
      /* 👉 DESCRIPTION WITH TOOLTIP */
      if (col.field === "description") {
        return {
          ...col,
          flex: 2,
          minWidth: 250,
          renderCell: (params) => (
            <Tooltip title={params.value || "No Description"} placement="top">
              <span style={{ cursor: "pointer", color: "#374151" }}>
                {truncate(params.value || "", 45)}
              </span>
            </Tooltip>
          ),
        };
      }

      /* 👉 CATEGORY CHIPS */
     if (col.field === "category") {
  return {
    ...col,
    flex: 1.5,
    minWidth: 250,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const items = typeof params.value === "string"
        ? params.value.split(",").map((v) => v.trim())
        : [];

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {items.map((item, idx) => (
              <Chip
                key={idx}
                label={item}
                size="small"
                color="primary"
                sx={{ borderRadius: "8px" }}
              />
            ))}
          </Stack>
        </Box>
      );
    },
  };
}


      /* 👉 TAGS CHIPS */
      if (col.field === "tags") {
  return {
    ...col,
    flex: 2,
    minWidth: 250,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const tags = typeof params.value === "string"
        ? params.value.split(",").map((t) => t.trim())
        : [];

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                
                sx={{ borderRadius: "8px",gaps: 1,backgroundColor:"#c4c7baff" }}
              />
            ))}
          </Stack>
        </Box>
      );
    },
  };
}


      /* 👉 STATUS BADGE */
      if (col.field === "status") {
        return {
          ...col,
          flex: 1,
          minWidth: 130,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => (
            <Chip
              label={params.value}
              size="small"
              color="success"
              sx={{ fontWeight: 600, textTransform: "capitalize" }}
            />
          ),
        };
      }

      return { ...col, flex: 1, minWidth: 160 };
    });
  }, [backendColumns]);

  /* 👉 ACTION COLUMN */
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "",
    flex: 1,
    minWidth: 40,
    sortable: false,
    align: "right",
    renderCell: (params) =>
      React.createElement(ActionMenu as any, { recordId: params.row.id }),
  };

  const columnsWithAction = [...finalColumns, actionColumn];

  return (
    <Card sx={{ borderRadius: 3, p: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.07)" }}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Course"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 280 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="mynaui:search" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ height: 500 }}>
        <DataGrid
          apiRef={apiRef}
          rows={backendRows}
          columns={columnsWithAction}
          rowHeight={72}
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="client"
          pageSizeOptions={[5, 10, 20]}
          getRowId={(row) => row.id}
          slots={{ pagination: DataGridFooter }}
          sx={{
            border: 0,
            "& .MuiDataGrid-row:hover": { backgroundColor: "#f9fafb" },
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#f3f4f6",
              fontWeight: 700,
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default TaskOverviewTable;
