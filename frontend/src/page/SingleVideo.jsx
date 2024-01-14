import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";

const SingleVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [video, setVideo] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/video/getsinglevideo/${id}`
      );
      const data = await res.json();
      setVideo(data.video);
    } catch (error) {
      console.error("Error fetching video:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(0);
    date.setMilliseconds(seconds * 1000);
    return date.toISOString().substr(11, 8);
  };

  // used for creating webtt which used for subtitle
  const generateWebVTT = (captions) => {
    let webVTT = "WEBVTT \n";

    if (!Array.isArray(captions)) {
      console.error("Invalid captions array:", captions);
      return "";
    }

    captions.forEach((caption) => {
      const { subtitle, timeStamp } = caption;

      if (typeof timeStamp !== "number" || isNaN(timeStamp)) {
        console.error("Invalid timeStamp in caption:", caption);
        return;
      }

      const endTime = timeStamp + 1;

      webVTT += `${formatTime(timeStamp)}.100 --> ${formatTime(
        endTime
      )}.171 align:middle line:84%\n${subtitle}\n`;
    });

    return webVTT;
  };

  const mySubtitle_arr = [
    {
      kind: "subtitles",
      src: `data:text/vtt;base64,${btoa(generateWebVTT(video.captions))}`,
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
