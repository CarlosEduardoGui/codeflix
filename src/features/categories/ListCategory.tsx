import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";
import { GridFilterModel } from "@mui/x-data-grid";

export const CategoryList = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [rowsPerPage] = useState([10, 25, 50, 100]);
    const [search, setSearch] = useState("");

    const options = { perPage, search, page };

    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const { enqueueSnackbar } = useSnackbar();

    function handleOnPageChange() {
        setPage(page + 1);
    }

    function handleOnPageSizeChange() {
        setPerPage(perPage);
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setSearch(search);
        }

        return setSearch("");
    }

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category has been deleted!", { variant: "success" });
        }

        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", { variant: "error" });
        }

    }, [deleteCategoryStatus, enqueueSnackbar]);


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
                <CategoriesTable
                    data={data}
                    isFetching={isFetching}
                    perPage={perPage}
                    rowsPerPage={rowsPerPage}
                    handleDelete={handleDeleteCategory}
                    handleOnPageChange={handleOnPageChange}
                    handleOnPageSizeChange={handleOnPageSizeChange}
                    handleFilterChange={handleOnFilterChange}
                />
            </Box>
        </Box>
    );
};