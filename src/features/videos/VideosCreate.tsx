import { useGetAllGenresQuery, useGetAllCategoriesQuery, useGetAllCastMembersQuery, initialState, useCreateVideoMutation } from './videosSlice';
import { Box, Paper, Typography } from '@mui/material'
import { VideosForm } from './components/VideosForm'
import React, { useEffect, useRef, useState } from 'react'
import { Video } from '../../types/Videos';
import { mapVideoToForm } from './utils';
import { useSnackbar } from 'notistack';
import { Category } from '../../types/Category';

export default function VideoCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const { data: genres } = useGetAllGenresQuery();
  const { data: cast_members } = useGetAllCastMembersQuery();
  const [createVideo, status] = useCreateVideoMutation();
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>();
  const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createVideo(mapVideoToForm(videoState));
  }

  const filterById = (
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]
  ): boolean => index === self.findIndex((c) => c?.id === category?.id);

  useEffect(() => {
    const uniqueCategories = videoState.genres
      ?.flatMap(({ categories }) => categories)
      .filter(filterById) as Category[];

    setUniqueCategories(uniqueCategories);

  }, [videoState.genres]);

  useEffect(() => {
    categoriesToKeepRef.current = videoState.categories?.filter((category) =>
      uniqueCategories?.find((c) => c?.id === category.id)
    )
  }, [uniqueCategories, videoState.categories]);

  useEffect(() => {
    setVideoState((state: Video) => ({
      ...state,
      categories: categoriesToKeepRef.current
    }));
  }, [uniqueCategories, setVideoState])

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
          categories={uniqueCategories}
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
