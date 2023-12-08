import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";

export const CategoryEdit = () => {
    const id = useParams().id || "";
    const { enqueueSnackbar } = useSnackbar();
    const [updateCategory, status] = useUpdateCategoryMutation();
    const { data: category, isFetching } = useGetCategoryQuery({ id });
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        name: "",
        description: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await updateCategory(categoryState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({ ...categoryState, [name]: value });
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoryState({ ...categoryState, [name]: checked });
    };

    useEffect(() => {
        if (category) {
            setCategoryState(category.data);
        }
    }, [category]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Category has been updated!", { variant: "success" });
        }

        if (status.error) {
            enqueueSnackbar("Category not updated.", { variant: "error" });
        }

    }, [enqueueSnackbar, status.error, status.isSuccess]);


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h3" component="h1">
                            Edit Category Page
                        </Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isdisabled={status.isLoading}
                    isLoading={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    );
};