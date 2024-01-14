import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VideoCard from "../components/VideoCard";

const Home = () => {
  const navigate = useNavigate();
  const [allVideo, setAllVideo] = useState([]);

  const fetchVideo = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/video/getvideos");
      const data = await res.json();
      setAllVideo(data.video);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="px-10 mt-14">
      <h1 className="font-semibold text-3xl">Your Upoaded Videos</h1>
      {allVideo.length ? (
        <div className="flex justify-between mt-12 gap-7 flex-wrap">
          {allVideo?.map((data) => (
            <VideoCard
              url={data.videoUrl}
              key={data._id}
              onClick={() => navigate(`/video/${data._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <h1 className="font-semibold text-3xl">No video uploaded</h1>
          <button
            className="mt-5 w-64 py-2 rounded-xl font-semibold text-xl border-[1px] border-[#fffffc]"
            onClick={() => navigate("/upload")}
          >
            Upload Video
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
