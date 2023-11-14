import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";
import { GridFilterModel } from "@mui/x-data-grid";

const initialOptions = {
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30]
}

export const CategoryList = () => {
    const [options, setOptions] = useState(initialOptions);
    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const { enqueueSnackbar } = useSnackbar();

    function handleOnPageChange(page: number) {
        options.page = page;
        setOptions({ ...options, page });
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions({ ...options, perPage });
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            options.search = search;
            setOptions({ ...options, search });
        }

        return setOptions({ ...options, search: "" });
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
            </Box>
            <CategoriesTable
                data={data}
                isFetching={isFetching}
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={handleOnPageChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleFilterChange={handleOnFilterChange}
            />
        </Box>
    );
};