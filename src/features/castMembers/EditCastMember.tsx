import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { initialState, useGetCastMemberByIdQuery, useUpdateCastMemberMutation } from "./castMembersSlice";
import { CastMember } from "../../types/CastMembers";
import { CastMemberForm } from "./components/CastMemberForm";

export const CastMemberEdit = () => {
    const id = useParams().id || "";
    const { enqueueSnackbar } = useSnackbar();
    const [updateCastMember, status] = useUpdateCastMemberMutation();
    const { data: castMember, isFetching } = useGetCastMemberByIdQuery({ id });
    const [castMemberState, setCastMemberState] = useState<CastMember>(initialState)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await updateCastMember(castMemberState);
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
        if (castMember) {
            setCastMemberState(castMember.data);
        }
    }, [castMember]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Cast Member has been updated!", { variant: "success" });
        }

        if (status.error) {
            enqueueSnackbar("Cast Member not updated.", { variant: "error" });
        }

    }, [enqueueSnackbar, status.error, status.isSuccess]);


    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h3" component="h1">
                            Edit Cast Member Page
                        </Typography>
                    </Box>
                </Box>

                <CastMemberForm
                    castMember={castMemberState}
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