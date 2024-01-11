import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchVideosFromAPI, fetchChannelFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    fetchVideosFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
      .catch(function (error) {
        console.log(error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    fetchChannelFromAPI(
      `channels?part=snippet&id=${videos[0]?.snippet?.channelId}`
    )
      .then((data) => setChannel(data.items))
      .catch(function (error) {
        console.log(error);
      });
  }, [videos]);

  console.log(channel);

  // Implemented logic where if we`re viewing on a PC or a tablet (md+) all videos are going to go in rows (horizontally),
  // but when it`s on a mobile phone (sx) - it`s going to be shown vertically stacked (in a column)
  return (
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

        <Videos videos={videos} channel={channel && channel[0]} />
      </Box>
    </Stack>
  );
};

export default Feed;
