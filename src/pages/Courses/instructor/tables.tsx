/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Typography,
  LinearProgress,
  Tooltip,
} from "@mui/material";

import IconifyIcon from "components/base/IconifyIcon";
import DataGridFooter from "components/common/DataGridFooter";
import ActionMenu from "./ActionMenu";
import AddCourses from "./feat/addCourse";
import UpdateCourseDialog from "./feat/editCourse";

import { useGetCourses } from "redux/useCourse";

/* ------------------------- Debounce ------------------------- */
const useDebounce = (value: string, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
};

interface Props {
  searchText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/* ======================= MAIN COMPONENT ======================= */
const TaskOverviewTable = ({ searchText, handleInputChange }: Props) => {
  const debouncedSearch = useDebounce(searchText);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // Edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState<any>(null);

  const handleOpenEditDialog = (course: any) => {
    setEditCourseData(course);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  /* ------------------------- API CALL ------------------------- */
  const { data, isLoading } = useGetCourses({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: debouncedSearch,
  });

  const backendRows = data?.data ?? [];
  const totalRows = data?.totalRecords ?? 0;

  /* ------------------------- Excluded Fields ------------------------- */
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

  /* ------------------------- Dynamic Columns ------------------------- */
  const backendColumns = useMemo(() => {
    if (!backendRows.length) return [];
    return Object.keys(backendRows[0])
      .filter((k) => !excludedFields.includes(k))
      .map((k) => ({
        field: k,
        headerName: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()),
      }));
  }, [backendRows]);

  /* ------------------------- Final Columns ------------------------- */
  const finalColumns: GridColDef[] = backendColumns.map((col) => {

    /* ⭐ DESCRIPTION (truncate + tooltip) */
    if (col.field === "title") {
      return {
        ...col,
        flex: 2,
        minWidth: 220,
        renderCell: (params) => (
          <Tooltip title={params.value || "No title"} placement="top">
            <span style={{ cursor: "pointer" }}>
              {params.value}
            </span>
          </Tooltip>
        ),
      };
    }

    /* ⭐ DESCRIPTION (truncate + tooltip) */
    if (col.field === "description") {
      return {
        ...col,
        flex: 2,
        minWidth: 250,
        renderCell: (params) => (
          <Tooltip title={params.value || "No description"} placement="top">
            <span style={{ cursor: "pointer" }}>
              {(params.value || "").length > 45
                ? params.value.substring(0, 45) + "..."
                : params.value}
            </span>
          </Tooltip>
        ),
      };
    }

    /* ⭐ CATEGORY – Chip list */
    if (col.field === "category") {
      return {
        ...col,
        flex: 1.5,
        minWidth: 240,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const items = typeof params.value === "string"
            ? params.value.split(",").map((v) => v.trim())
            : [];

          return (
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {items.map((item, idx) => (
                  <Chip key={idx} label={item} size="small" color="primary" />
                ))}
              </Stack>
            </Box>
          );
        },
      };
    }

    /* ⭐ TAGS – Chip list */
    if (col.field === "tags") {
      return {
        ...col,
        flex: 2,
        minWidth: 250,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const tags = typeof params.value === "string"
            ? params.value.split(",").map((v) => v.trim())
            : [];

          return (
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" sx={{backgroundcolor:"#c4c7b9"}} />
                ))}
              </Stack>
            </Box>
          );
        },
      };
    }

    /* ⭐ Progress bar */
    if (col.field === "progress") {
      return {
        ...col,
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
          <Stack width="100%" alignItems="center" gap={1}>
            <Typography variant="body2">{params.value ?? 0}%</Typography>
            <LinearProgress
              variant="determinate"
              value={params.value ?? 0}
              sx={{ width: "100%", height: 6, borderRadius: 5 }}
            />
          </Stack>
        ),
      };
    }

    /* ⭐ Status Chips */
    if (col.field === "status") {
      return {
        ...col,
        flex: 1,
        minWidth: 140,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={
              params.value === "completed"
                ? "success"
                : params.value === "in progress"
                ? "primary"
                : "warning"
            }
            size="small"
          />
        ),
      };
    }

    return { ...col, flex: 1, minWidth: 150 };
  });

  /* ---------------- Action Menu Column ---------------- */
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "",
    minWidth: 40,
    sortable: false,
    renderCell: (p) =>
      React.createElement(ActionMenu as any, {
        recordId: p.row.id,
        rowData: p.row,
        onEdit: handleOpenEditDialog,
      }),
  };

  const columnsWithAction = [...finalColumns, actionColumn];

  /* ======================= UI Rendering ======================= */
  return (
    <>
      <Box sx={{ borderRadius: 2, boxShadow: 3, p: 2, bgcolor: "background.paper" }}>
        {/* Header */}
        <Box mb={2} display="flex" justifyContent="space-between">
          <AddCourses />

          <TextField
            variant="filled"
            size="small"
            placeholder="Search Course"
            value={searchText}
            onChange={handleInputChange}
            sx={{ width: 250 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconifyIcon icon="mynaui:search" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Table */}
        <Box sx={{ height: 425 }}>
          <DataGrid
            loading={isLoading}
            rows={backendRows}
            columns={columnsWithAction}
            rowHeight={57}
            disableColumnMenu
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={totalRows}
            checkboxSelection
            pageSizeOptions={[5, 10, 20]}
            slots={{ pagination: DataGridFooter }}
          />
        </Box>
      </Box>

      {/* EDIT DIALOG */}
      {editDialogOpen && editCourseData && (
        <UpdateCourseDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          courseId={editCourseData.id}
          initialData={editCourseData}
        />
      )}
    </>
  );
};

export default TaskOverviewTable;
