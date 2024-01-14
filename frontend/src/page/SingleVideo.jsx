import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

const SingleVideo = () => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [video, setVideo] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/video/getsinglevideo/${id}`
      );
      const data = await res.json();
      console.log(data);
      setVideo(data.video);
    } catch (error) {
      console.error("Error fetching video:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(video);

  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(0);
    date.setMilliseconds(seconds * 1000);
    return date.toISOString().substr(11, 8);
  };

  // used for creating webtt which used for subtitle
  const generateWebVTT = (subtitles, timeStamp) => {
    let webVTT = "WEBVTT \n";

    const endTime = timeStamp + 2;

    if (
      typeof timeStamp !== "number" ||
      (isNaN(timeStamp) && (typeof endTime !== "number" || isNaN(endTime)))
    ) {
      console.error("Invalid timeStamp:", timeStamp);
      return "";
    }

    webVTT += `${formatTime(timeStamp)}.100 --> ${formatTime(
      endTime
    )}.171 align:middle line:84%\n${subtitles}  \n`;

    return webVTT;
  };

  const mySubtitle_arr = [
    {
      kind: "subtitles",
      src: `data:text/vtt;base64,${btoa(
        generateWebVTT(video.subtitle, video.timeStamp)
      )}`,
      srcLang: "en",
      default: true,
    },
  ];

  return (
    <div className="h-screen flex justify-center items-center">
      <ReactPlayer
        controls={true}
        url={video.videoUrl}
        width={800}
        height={400}
        config={{
          file: {
            attributes: {
              crossOrigin: "true",
            },
            tracks: mySubtitle_arr,
          },
        }}
      />
    </div>
  );
};

export default SingleVideo;
