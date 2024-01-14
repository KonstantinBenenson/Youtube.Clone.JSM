import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);

  const { searchTerm } = useParams();

  const maxResults = 40;

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}&maxResults=${maxResults}`)
      .then((data) => setVideos(data.items))
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:
        <span style={{ color: "#FC5103" }}> {searchTerm}</span>
      </Typography>

      <Videos videos={videos} channelId={videos[0]?.snippet?.channelId} />
    </Box>
  );
};

export default SearchFeed;
