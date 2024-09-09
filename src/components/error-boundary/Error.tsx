import { Box, Button, Typography } from "@mui/material";

const Error = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "1rem",
        }}
      >
        <Typography variant="h6"> Something went wrong</Typography>
        <Button variant="outlined" color="error">
          Try Again
        </Button>
      </Box>
    </>
  );
};

export default Error;
