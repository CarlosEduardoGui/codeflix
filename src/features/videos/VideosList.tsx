import { Box, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VideoTable from './components/VideosTable'
import { useSnackbar } from 'notistack';
import { GridFilterModel } from '@mui/x-data-grid';
import { useDeleteVideoMutation, useGetVideosQuery } from './videosSlice';

export default function VideosList() {
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 10,
    rowsPerPage: [10, 20, 30]
  });
  const { data, isFetching, error } = useGetVideosQuery(options);
  const [deleteVideo, deleteVideoStatus] = useDeleteVideoMutation();
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

  async function handleDeleteVideo(id: string) {
    await deleteVideo({ id });
  }

  useEffect(() => {
    if (deleteVideoStatus.isSuccess) {
      enqueueSnackbar("VIdeo has been deleted!", { variant: "success" });
    }

    if (deleteVideoStatus.error) {
      enqueueSnackbar("Video not deleted", { variant: "error" });
    }

  }, [deleteVideoStatus, enqueueSnackbar]);

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/videos/create"
          style={{ marginBottom: "1rem" }}
        >
          New Video
        </Button>
      </Box>
      <VideoTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteVideo}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleOnFilterChange}
      />
    </Box>
  )
}
