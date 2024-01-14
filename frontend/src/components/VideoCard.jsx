import React from "react";
import ReactPlayer from "react-player";

const VideoCard = ({ url, onClick }) => {
  const handleVideoClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleVideoClick}>
      <ReactPlayer width={400} height={300} url={url} />
    </div>
  );
};

export default VideoCard;
