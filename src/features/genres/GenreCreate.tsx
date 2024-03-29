import { Box, Paper, Typography } from "@mui/material"
import GenreForm from "./components/GenreForm"
import { useSnackbar } from "notistack"
import {
    initialState,
    useCreateGenreMutation,
    useGetCategoriesForGenreQuery
} from "./genreSlice";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genre"
import { mapGenreToForm } from "./utils";

export const GenreCreate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: categories } = useGetCategoriesForGenreQuery();
    const [createGenre, status] = useCreateGenreMutation();
    const [genreState, setGenreState] = useState<Genre>(initialState);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setGenreState((state) => ({ ...state, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        await createGenre(mapGenreToForm(genreState));
    }

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Genre has been created!", { variant: 'success' });
        }

        if (status.isError) {
            enqueueSnackbar("Error creating genre.", { variant: 'error' });
        }
    }, [status, enqueueSnackbar]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Genre</Typography>
                    </Box>
                </Box>
                <GenreForm
                    genre={genreState}
                    categories={categories?.data}
                    isLoading={status.isLoading}
                    isDisabled={status.isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
}