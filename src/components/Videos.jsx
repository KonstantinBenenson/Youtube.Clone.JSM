import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos, channelId, direction }) => {
  if (!videos?.length) return "Loading...";

  const marginTop = channelId ? null : "20px";

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="center"
      gap={2}
      marginTop={marginTop}
    >
      {channelId && (
        <Box key={channelId}>
          <ChannelCard channelId={channelId} />
        </Box>
      )}
      {videos
        .filter((video) => video?.id?.videoId)
        .map((item, idx) => (
          <Box key={idx}>{item?.id?.videoId && <VideoCard video={item} />}</Box>
        ))}
    </Stack>
  );
};

export default Videos;
