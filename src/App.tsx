import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";

const theme = createTheme({});

function App() {
  return <ThemeProvider theme={theme}>
    <Box 
      component="main"
      sx={{
      height: "100vh",
        // backgroundColor: "#000"
      }}
    >
      <Header />
      <Layout><h1>Ola mundo</h1></Layout>
    </Box>
  </ThemeProvider>;
}

export default App;