import { Box, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { CastMember } from '../../../types/CastMembers';

type Props = {
    castMember: CastMember;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CastMemberForm({
    castMember,
    isdisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange
}: Props) {
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                value={castMember.name}
                                disabled={isdisabled}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormLabel >
                                Type
                            </FormLabel>
                            <RadioGroup
                                aria-label='type of cast member'
                                defaultValue="Director"
                                name="type"
                                onChange={handleChange}
                                value={castMember.type}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Director" />
                                <FormControlLabel value={2} control={<Radio />} label="Actor" />
                            </RadioGroup>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/cast_members">
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={isdisabled || isLoading}
                            >
                                {isLoading ? "Loading..." : "Save"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}	