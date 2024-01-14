import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const maxResults = 30;

  useEffect(() => {
    fetchFromAPI(
      `search?part=snippet&q=${selectedCategory}&maxResults=${maxResults}`
    )
      .then((data) => setVideos(data.items))
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedCategory]);

  // Implemented logic where if we`re viewing on a PC or a tablet (md+) all videos are going to go in rows (horizontally),
  // but when it`s on a mobile phone (sx) - it`s going to be shown vertically stacked (in a column)
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "92vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 5, color: "#fff" }}
        >
          Copyright 2024 Beyond Dreams.
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC5103" }}>videos</span>
        </Typography>

        <Videos videos={videos} channelId={videos[0]?.snippet?.channelId} />
      </Box>
    </Stack>
  );
};

export default Feed;
