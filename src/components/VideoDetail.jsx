import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data.items[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchFromAPI(`search?part=snippets&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        setRelatedVideos(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(relatedVideos);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="86vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "105px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              px={1}
              py={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#d02f75"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "#558b2f", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap={20} alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedVideos} direction={"column"} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
