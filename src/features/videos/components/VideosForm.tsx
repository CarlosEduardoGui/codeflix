import { Box, Grid, FormControl, TextField, Autocomplete, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { Video } from '../../../types/Videos';
import { Genre } from '../../../types/Genre';
import { Category } from '../../../types/Category';
import { CastMember } from '../../../types/CastMembers';
import { AutocompleteFields } from '../../../components/AutoCompleteFields';
import { RatingsList } from '../../../components/RatingList';

type Props = {
    video: Video;
    genres?: Genre[]
    categories?: Category[];
    cast_members?: CastMember[];
    isLoading?: boolean;
    isDisabled?: boolean,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideosForm({
    video,
    genres,
    categories,
    cast_members,
    isLoading = false,
    isDisabled = false,
    handleSubmit,
    handleChange
}: Props) {

    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root": { my: 2 } }}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="title"
                                label="Title"
                                value={video.title}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "title" }}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="description"
                                label="Description"
                                value={video.description}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "description" }}
                            />
                        </FormControl>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="year_lauched"
                                        label="Year Lauched"
                                        value={video.year_launched}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                        inputProps={{ "data-testid": "year_lauched" }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name="duration"
                                        label="Duration"
                                        value={video.duration}
                                        disabled={isDisabled}
                                        onChange={handleChange}
                                        inputProps={{ "data-testid": "duration" }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <AutocompleteFields
                                name="categories"
                                label="Categories"
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                value={video.categories}
                                options={categories}
                                handleChange={handleChange}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <AutocompleteFields
                                name="genres"
                                label="Genres"
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                value={video.genres}
                                options={genres}
                                handleChange={handleChange}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <AutocompleteFields
                                name="cast_members"
                                label="Cast Members"
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                value={video.cast_members}
                                options={cast_members}
                                handleChange={handleChange}

                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={6} sx={{ "& .MuiTextField-root:": { my: 2 } }}>
                        <FormControl fullWidth>
                            <Box mt={2} mb={2}>
                                <FormLabel component="legend">Rating</FormLabel>
                            </Box>
                            <RadioGroup
                                row
                                name="rating"
                                value={video.rating}
                                onChange={handleChange}
                            >
                                <RatingsList isDisabled={isDisabled} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button variant="contained" component={Link} to="/videos">
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isDisabled || isLoading}
                        >
                            {isLoading ? "Loading..." : "Save"}
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box >
    )
}
