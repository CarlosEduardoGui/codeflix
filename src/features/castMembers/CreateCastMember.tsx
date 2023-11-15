import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { initialState, useCreateCastMemberMutation } from "./castMembersSlice";
import { CastMember } from "../../types/CastMembers";
import { CastMemberForm } from "./components/CastMemberForm";


export const CastMemberCreate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [createCastMember, status] = useCreateCastMemberMutation();
    const [isdisabled, setIsdisabled] = useState(false);
    const [castMemberState, setCastMemberState] = useState<CastMember>(initialState);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await createCastMember(castMemberState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCastMemberState({ ...castMemberState, [name]: value });
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCastMemberState({ ...castMemberState, [name]: checked });
    };

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Cast Member has been created successfully!", { variant: "success" });
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
                            Create Cast Member Page
                        </Typography>
                    </Box>
                </Box>

                <CastMemberForm
                    castMember={castMemberState}
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