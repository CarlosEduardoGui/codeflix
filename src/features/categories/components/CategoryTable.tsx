import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid"
import { Results } from "../../../types/Category"
import { Typography, IconButton, Box } from "@mui/material"
import { Link } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
    data: Results | undefined
    perPage: number
    isFetching: boolean
    rowsPerPage?: number[]

    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModal: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
}

export function CategoriesTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete
}: Props) {
    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            renderCell: renderDescriptionCell
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCell
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            type: 'string',
            renderCell: renderActionsCell
        },
    ];

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderDescriptionCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/categories/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function mateDataOnGridRow(data: Results) {
        const { data: categories } = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            isActive: category.is_active,
            createdAt: new Date(category.created_at).toLocaleDateString('en-US'),
        }))
    }

    const rows = data ? mateDataOnGridRow(data) : [];
    const rowCount = data?.meta.total || 0;

    return (
        <Box sx={{ display: "flex", height: 500 }}>
            <DataGrid
                rows={rows}
                pagination={true}
                columns={columns}
                pageSize={perPage}
                filterMode="server"
                rowCount={rowCount}
                loading={isFetching}
                paginationMode="server"
                checkboxSelection={false}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                rowsPerPageOptions={rowsPerPage}
                componentsProps={componentProps}
                onPageChange={handleOnPageChange}
                components={{ Toolbar: GridToolbar }}
                onFilterModelChange={handleFilterChange}
                onPageSizeChange={handleOnPageSizeChange}
            />
        </Box>
    )
}

