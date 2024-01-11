import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({
  channelDetail: {
    id,
    snippet: { thumbnails, title },
    brandingSettings,
  },
}) => {
  return (
    <Box sx={{ boxShadow: "none", borderRadius: "20px" }}>
      <Link to={`/channel/${id}`}>
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
            component="img"
            src={thumbnails?.high?.url || demoProfilePicture}
            alt={title}
            sx={{ borderRadius: "50%", height: "180px", width: "180px" }}
          />
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
