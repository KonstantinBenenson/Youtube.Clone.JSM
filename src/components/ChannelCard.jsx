import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail }) => {
  return (
    <Box sx={{ boxShadow: "none", borderRadius: "20px" }}>
      <Link to={`/channel/${channelDetail?.id}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            colot: "#FFF",
          }}
        >
          <CardMedia
            image={
              channelDetail[0]?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail[0]?.snippet?.title}
            sx={{ borderRadius: "50$", height: "180px", width: "180px" }}
          />
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
