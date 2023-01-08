import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Category } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryCreate = () => {
    const [isdisabled, setIsdisabled] = useState(false);
    const [category, setCategory] = useState<Category>({
        id:"",
        name: "",
        description: "",
        is_active: false,
        created_at:"",
        updated_at:"",
        deleted_at:""
    });

    const handleChange = (e: any) => {};
    const handleToggle = (e: any) => {};

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
                    category={category}
                    isdisabled={isdisabled}
                    isLoading={false}
                    onSubmit={() => {}}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
                
            </Paper>
        </Box>
    );
};