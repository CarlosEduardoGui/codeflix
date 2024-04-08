import { useGetAllGenresQuery, useGetAllCategoriesQuery, useGetAllCastMembersQuery, initialState, useCreateVideoMutation } from './videosSlice';
import { Box, Paper, Typography } from '@mui/material'
import { VideosForm } from './components/VideosForm'
import React, { useEffect, useRef, useState } from 'react'
import { Video } from '../../types/Videos';
import { mapVideoToForm } from './utils';
import { useSnackbar } from 'notistack';
import { Category } from '../../types/Category';
import { useUniqueCategories } from '../../hooks/useUniqueCategories';

export default function VideoCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: genres } = useGetAllGenresQuery();
  const { data: cast_members } = useGetAllCastMembersQuery();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [categories] = useUniqueCategories(videoState, setVideoState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video has been created!", { variant: 'success' });
    }

    if (status.isError) {
      enqueueSnackbar("Error creating video.", { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Video</Typography>
          </Box>
        </Box>
        <VideosForm
          video={videoState}
          genres={genres?.data}
          categories={categories}
          cast_members={cast_members?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  )
}
