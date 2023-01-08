import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { CategoryForm } from "./components/CategoryForm";

export const CategoryEdit = () => {
    const id = useParams().id || "";
    const [isdisabled, setIsdisabled] = useState(false);
    const category = useAppSelector((state) => selectCategoryById(state, id));
    const handleChange = (e: any) => {};
    const handleToggle = (e: any) => {};

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