import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid"
import { Results } from "../../../types/CastMembers"
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

export function CastMembersTable({
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
            flex: 1,
            field: 'name',
            headerName: 'Name',
            renderCell: renderNameCell
        },
        {
            flex: 1,
            field: 'type',
            headerName: 'Type',
            renderCell: renderTypeCell
        },
        {
            flex: 1,
            field: 'id',
            headerName: 'Actions',
        }
    ];

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/cast_members/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderTypeCell(rowData: GridRenderCellParams) {
        return (
            <Typography color="primary">
                {rowData.value === 1 ? 'Director' : 'Actor'}
            </Typography>
        );
    }

    function mateDataOnGridRow(data: Results) {
        const { data: castMembers } = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type,
        }))
    }

    const rows = data ? mateDataOnGridRow(data) : [];
    const rowCount = data?.meta.total || 0;

    return (
        <Box sx={{ display: "flex", height: 600 }}>
            <DataGrid
                rows={rows}
                pagination={true}
                columns={columns}
                pageSize={perPage}
                filterMode={"server"}
                paginationMode={"server"}
                loading={isFetching}
                rowCount={rowCount}
                rowsPerPageOptions={rowsPerPage}
                componentsProps={componentProps}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                disableSelectionOnClick={false}
                components={{ Toolbar: GridToolbar }}
                onPageChange={handleOnPageChange}
                onPageSizeChange={handleOnPageSizeChange}
                checkboxSelection={false}
            />
        </Box>
    )
}

