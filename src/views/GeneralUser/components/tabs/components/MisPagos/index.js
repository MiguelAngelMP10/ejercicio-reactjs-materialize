import * as React from "react";
import {
  DataGrid,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridToolbarContainer,
  GridToolbarExport,
  useGridSlotComponentProps,
} from "@material-ui/data-grid";
import Pagination from "@material-ui/lab/Pagination";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 11, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 12, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 13, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 14, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 15, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 16, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 17, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 19, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 20, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 21, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 22, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 23, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 24, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 25, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 26, lastName: "Frances", firstName: "Rossini", age: 36 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <Pagination
      className={{ display: "flex" }}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function MisPagos() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
}
