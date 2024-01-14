import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, ChannelCard } from "./";

const ChannelDetail = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const maxResults = 30;

  useEffect(() => {
    fetchFromAPI(
      `search?channelId=${id}&part=snippet&order=date&maxResults=${maxResults}`
    )
      .then((data) => {
        console.log(data);
        setVideos(data?.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />

        <ChannelCard channelId={id} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }}>
          <Videos videos={videos} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
