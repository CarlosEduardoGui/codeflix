import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import GenresTable from './components/GenresTable'
import { useDeleteGenreMutation, useGetGenresQuery } from './genreSlice'
import { useSnackbar } from 'notistack'
import { GridFilterModel } from '@mui/x-data-grid'

export const GenresList = () => {
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30]
  });
  const { data, isFetching, error } = useGetGenresQuery(options);
  const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation();
  const { enqueueSnackbar } = useSnackbar();

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

  async function handleDeleteCategory(id: string) {
    await deleteGenre({ id });
  }

  useEffect(() => {
    if (deleteGenreStatus.isSuccess) {
      enqueueSnackbar("Genre has been deleted!", { variant: "success" });
    }

    if (deleteGenreStatus.error) {
      enqueueSnackbar("Genre not deleted", { variant: "error" });
    }

  }, [deleteGenreStatus, enqueueSnackbar]);

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/genres/create"
          style={{ marginBottom: "1rem" }}
        >
          New Genre
        </Button>
      </Box>
      <GenresTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleOnFilterChange}
      />
    </Box>
  )
}
