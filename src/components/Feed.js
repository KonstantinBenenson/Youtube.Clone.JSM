import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

const Feed = () => (
  // Implemented logic where if we`re viewing on a PC or a tablet (md+) all videos are going to go in rows (horizontally),
  // but when it`s on a mobile phone (sx) - it`s going to be shown vertically stacked (in a column)
  <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
    <Box
      sx={{
        height: {
          sx: "auto",
          md: "92vh",
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        },
      }}
    ></Box>
  </Stack>
);

export default Feed;
