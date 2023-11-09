import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, useCreateCategoryMutation } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";
import { useSnackbar } from "notistack";


export const CategoryCreate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [createCategory, status] = useCreateCategoryMutation();
    const [isdisabled, setIsdisabled] = useState(false);
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
        await createCategory(categoryState);
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
        if (status.isSuccess) {
            enqueueSnackbar("Category has been created successfully!", { variant: "success" });
            setIsdisabled(true);
        }

        if (status.error) {
            enqueueSnackbar("Category not created.", { variant: "error" });
        }

    }, [enqueueSnackbar, status.error, status.isSuccess]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h3" component="h1">
                            Create Category Page
                        </Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isdisabled={isdisabled}
                    isLoading={false}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />

            </Paper>
        </Box>
    );
};