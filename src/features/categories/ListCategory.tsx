import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export const CategoryList = () => {
    const { data, isFetching, error } = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
        },
    }

    const rows: GridRowsProp = data
        ?
        data.data.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            isActive: category.is_active,
            createdAt: new Date(category.created_at).toLocaleDateString('en-US'),
        }))
        :
        [];

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
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

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id: id });
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category has been deleted!", { variant: "success" });
        }

        if(deleteCategoryStatus.error){
            enqueueSnackbar("Category not deleted", { variant: "error" });
        }

    }, [deleteCategoryStatus, enqueueSnackbar]);

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
                    onClick={() => handleDeleteCategory(params.value)}
                    aria-label="delete"
                >
                    <DeleteIcon />
                </IconButton>
            );
        }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 500 }}>
                <DataGrid
                    components={{ Toolbar: GridToolbar }}
                    disableColumnSelector={true}
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    rows={rows}
                    columns={columns}
                    componentsProps={componentProps}
                />
            </Box>
        </Box>
    );
};