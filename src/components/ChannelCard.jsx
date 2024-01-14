import { useState, useEffect } from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelId, marginTop }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${channelId}`)
      .then((data) => setChannel(data.items[0]))
      .catch((error) => {
        console.log(error);
      });
  }, [channelId]);

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: { xs: "320px", md: "100%" },
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            colot: "#FFF",
          }}
        >
          <CardMedia
            component="img"
            src={channel?.snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={channel?.snippet?.title}
            sx={{ borderRadius: "50%", height: "180px", width: "180px" }}
          />
          <Typography
            sx={{
              color: "#ad1457",
              textAlign: "center",
              mt: "12px",
              fontSize: "19px",
            }}
          >
            {channel?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: "#558b2f", ml: "10px" }} />
          </Typography>
          {channel?.statistics && (
            <Typography
              sx={{
                textAlign: "center",
                color: "white",
                fontSize: "13px",
                mt: 1,
              }}
            >
              {parseInt(channel?.statistics?.subscriberCount).toLocaleString()}{" "}
              <span style={{ color: "gray", marginLeft: "3px" }}>
                subscribers
              </span>
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
