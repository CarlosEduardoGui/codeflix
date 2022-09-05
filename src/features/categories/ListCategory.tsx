import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

export const CategoryList = () => {
    const categories = useAppSelector(selectCategories);

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description
    }));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
    ];

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

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    rows={rows}
                    columns={columns}
                />
            </div>
        </Box>
    );
};