import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from './castMembersSlice';
import { GridFilterModel } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CastMembersTable } from './components/CastMemberTable';

export const ListCastMembers = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [options, setOptions] = useState({
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const [deleteCastMember, deleteCastMemberStatus] = useDeleteCastMemberMutation();
    const { data, isFetching, error } = useGetCastMembersQuery(options);

    function handleOnPageChange(page: number) {
        setOptions({ ...options, page: page + 1 });
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions({ ...options, perPage });
    }

    function handleOnFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            
            setOptions({ ...options, search });
        }

        return setOptions({ ...options, search: "" });
    }

    async function handleDeleteCastMember(id: string) {
        await deleteCastMember({ id });
    }

    useEffect(() => {
        if (deleteCastMemberStatus.isSuccess) {
            enqueueSnackbar("Cast Member has been deleted!", { variant: "success" });
        }

        if (deleteCastMemberStatus.error) {
            enqueueSnackbar("Cast Member not deleted.", { variant: "error" });
        }

    }, [deleteCastMemberStatus, enqueueSnackbar]);

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/cast_members/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Cast Member
                </Button>
            </Box>
            <CastMembersTable
                data={data}
                isFetching={isFetching}
                perPage={options.perPage}
                rowsPerPage={options.rowsPerPage}
                handleDelete={handleDeleteCastMember}
                handleOnPageChange={handleOnPageChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleFilterChange={handleOnFilterChange}
            />
        </Box>
    )
}
