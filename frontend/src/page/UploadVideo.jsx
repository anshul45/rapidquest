import React, { useState } from "react";
import ReactPlayer from "react-player";

const UploadVideo = () => {
  const [subtitle, setSubtitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [timeStamp, setTimeStamp] = useState("");
  const [videoDuration, setVideoDuration] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setVideoDuration(null);
    setSubtitle("");
    setTimeStamp("");
  };

  const handleSubmit = async () => {
    try {
      // if (!selectedFile || !subtitle || !timeStamp) {
      //   alert("Please provide all required data");
      // }
      const formData = new FormData();
      formData.append("video", selectedFile);
      formData.append("subtitle", subtitle);
      formData.append("timeStamp", timeStamp);

      const response = await fetch(
        "http://localhost:3001/api/video/uploadvideo",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData);
      } else {
        console.error("Failed to upload video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="flex  flex-col gap-24 justify-center mt-20 px-24">
      <div className="font-semibold text-4xl">Upload Video</div>
      <div className="flex  items-center gap-20">
        <div className="flex-[0.9]   h-80 rounded-2xl">
          {selectedFile && (
            <i
              className="ri-close-line absolute z-50 top-[230px] left-[580px]  font-bold  text-5xl text-[#d90429] cursor-pointer"
              onClick={handleCancel}
            ></i>
          )}
          {!selectedFile ? (
            <label
              htmlFor="fileInput"
              className="relative w-full h-full bg-[#fffffc] text-black cursor-pointer flex flex-col gap-3 items-center justify-center rounded-2xl"
            >
              <i className="ri-upload-2-line font-bold text-5xl"></i>
              <h1 className="font-semibold text-xl">Upload Video</h1>
            </label>
          ) : (
            <ReactPlayer
              width={500}
              height={340}
              controls={true}
              url={URL.createObjectURL(selectedFile)}
              onReady={({ getDuration }) => setVideoDuration(getDuration())}
            />
          )}
          <input
            type="file"
            onChange={handleFileChange}
            id="fileInput"
            className="hidden"
          />
        </div>
        <div className="flex-[1]  flex gap-6 flex-col pl-10">
          <h1 className="font-semibold text-3xl">Add a subtitle</h1>

          {videoDuration && (
            <div className=" text-[#ff0000] text-xs font-semibold">
              <h1>
                Subtitles can be added from {Math.floor(videoDuration)} seconds
              </h1>
            </div>
          )}

          <input
            type="number"
            value={timeStamp}
            placeholder="Add time stamp.."
            onChange={(e) => setTimeStamp(e.target.value)}
            className="w-80 px-3 py-2 rounded-xl text-black placeholder:text-black outline-none"
          />
          <input
            type="text"
            value={subtitle}
            placeholder="Subtitle here.."
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-80 px-3 py-2 rounded-xl text-black placeholder:text-black outline-none"
          />
          <button
            onClick={handleSubmit}
            className="w-80 py-2 rounded-xl font-semibold text-xl border-[1px] border-[#fffffc]"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
