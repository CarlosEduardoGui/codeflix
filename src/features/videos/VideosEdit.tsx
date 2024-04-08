import { initialState, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery, useGetVideoQuery, useUpdateVideoMutation } from './videosSlice';
import { Box, Paper, Typography } from '@mui/material'
import { VideosForm } from './components/VideosForm';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Video } from '../../types/Videos';
import { useSnackbar } from 'notistack';
import { mapVideoToForm } from './utils';
import { useUniqueCategories } from '../../hooks/useUniqueCategories';

export function VideosEdit() {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();
  const [updateVideo, status] = useUpdateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [categories, setCategories] = useUniqueCategories(videoState, setVideoState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
      setCategories(video.data.categories || []);
    }
  }, [video, setCategories]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Video has been updated!", { variant: 'success' });
    }

    if (status.isError) {
      enqueueSnackbar("Error updating video.", { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>
        <VideosForm
          video={videoState}
          genres={genres?.data}
          categories={categories}
          cast_members={castMembers?.data}
          isLoading={status.isLoading || isFetching}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  )
}
