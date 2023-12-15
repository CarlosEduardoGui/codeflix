import { Box, ThemeProvider, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCategory";
import { SnackbarProvider } from "notistack";
import { ListCastMembers } from "./features/castMembers/ListCastMembers";
import { CastMemberCreate } from "./features/castMembers/CreateCastMember";
import { CastMemberEdit } from "./features/castMembers/EditCastMember";
import { GenreCreate } from "./features/genres/GenreCreate";
import { GenreEdit } from "./features/genres/GenreEdit";
import { GenresList } from "./features/genres/GenresList";
import VideosList from "./features/videos/VideosList";
import VideoCreate from "./features/videos/VideosCreate";
import { VideosEdit } from "./features/videos/VideosEdit";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => theme.palette.grey[900]
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              <Route path="/cast_members" element={<ListCastMembers />} />
              <Route path="/cast_members/create" element={<CastMemberCreate />} />
              <Route path="/cast_members/edi/:id" element={<CastMemberEdit />} />

              <Route path="/genres" element={<GenresList />} />
              <Route path="/genres/create" element={<GenreCreate />} />
              <Route path="/genres/edit/:id" element={<GenreEdit />} />

              <Route path="/videos" element={<VideosList />} />
              <Route path="/videos/create" element={<VideoCreate />} />
              <Route path="/videos/edit/:id" element={<VideosEdit />} />

              <Route path="*" element={
                <Box sx={{ color: "white" }}>
                  <Typography variant="h1">404</Typography>
                  <Typography variant="h2">Page not found</Typography>
                </Box>
              }
              />
            </Routes>
          </Layout>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;