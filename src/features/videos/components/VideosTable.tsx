import { Link } from 'react-router-dom'
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridFilterModel, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid'
import { Results } from '../../../types/Videos';
import { Genre } from '../../../types/Genre';
import { Category } from '../../../types/Category';


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

export default function VideosTable({
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
            field: 'title',
            headerName: 'Title',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'genres',
            headerName: 'Genres',
            flex: 1,
            renderCell: renderGenresCell
        },
        {
            field: 'categories',
            headerName: 'Categories',
            flex: 1,
            renderCell: renderCategoriesCell
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: "string",
            flex: 1,
            renderCell: renderActionsCell
        },
    ]

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/videos/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderGenresCell(rowData: GridRenderCellParams) {
        const genres = rowData.value as Genre[];
        const twoFirstGenres = genres.slice(0, 2);
        const remaningGenres = genres.length - twoFirstGenres.length;
        return (
            <Box style={{ overflowX: "scroll" }}>
                {twoFirstGenres.map((genre, index) => (
                    <Chip
                        key={index}
                        sx={{ frontSize: "0.6rem", marginRight: 1 }}
                        label={genre.name}
                    />
                ))}

                {remaningGenres > 0 && (
                    <Tooltip title={genres.map((genre) => genre.name).join(", ")}>
                        <Chip
                            sx={{
                                fontSize: "0.6rem",
                                marginRight: 1
                            }}
                            label={`+${remaningGenres}`}
                        />
                    </Tooltip>
                )}
            </Box>
        )
    }

    function renderCategoriesCell(rowData: GridRenderCellParams) {
        const category = rowData.value as Category[];
        const twoFirstCategories = category.slice(0, 2);
        const remaningCategories = category.length - twoFirstCategories.length;
        return (
            <Box style={{ overflowX: "scroll" }}>
                {twoFirstCategories.map((category, index) => (
                    <Chip
                        key={index}
                        sx={{ frontSize: "0.6rem", marginRight: 1 }}
                        label={category.name}
                    />
                ))}

                {remaningCategories > 0 && (
                    <Tooltip title={category.map((category) => category.name).join(", ")}>
                        <Chip
                            sx={{
                                fontSize: "0.6rem",
                                marginRight: 1
                            }}
                            label={`+${remaningCategories}`}
                        />
                    </Tooltip>
                )}
            </Box>
        )
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
                data-testid="delete-button"
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function mateDataOnGridRow(data: Results) {
        const { data: videos } = data;
        return videos.map((video) => ({
            id: video.id,
            title: video.title,
            genres: video.genres,
            categories: video.categories
        }));
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
