import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ReactPlayer from "react-player";

const UploadVideo = () => {
  const [subtitle, setSubtitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [timeStamp, setTimeStamp] = useState("");
  const [videoDuration, setVideoDuration] = useState(null);
  const [captions, setCaptions] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setVideoDuration(null);
    setSubtitle("");
    setTimeStamp("");
    toast.success("remove video successfully");
  };
  const handleSubmit = async () => {
    try {
      if (!selectedFile || !captions.length > 0) {
        toast.error("Please provide all required data");
        return;
      }

      // loading..
      toast.info("Uploading video...");

      const formData = new FormData();
      formData.append("video", selectedFile);
      formData.append("captions", JSON.stringify(captions));

      const response = await fetch(
        "http://localhost:3001/api/video/uploadvideo",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      // Hide loading
      toast.dismiss();

      if (response.ok) {
        console.log(responseData);
        setCaptions([]);
        setSelectedFile(null);
        setVideoDuration(null);
        setSubtitle("");
        setTimeStamp("");

        // Success
        toast.success("Video uploaded successfully");
      } else {
        console.error("Failed to upload video.");
        // Error
        toast.error("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // Hide loading
      toast.dismiss(); // Dismiss any existing toasts

      // Error
      toast.error("Error uploading video");
    }
  };

  const adddata = () => {
    if (!selectedFile) {
      toast.error("Please upload file first");
      return;
    }

    if (!subtitle || !timeStamp) {
      toast.error("Please provide subtitle or time stamp");
      return;
    }
    const parsedTimeStamp = parseInt(timeStamp);

    if (parsedTimeStamp < 0 || parsedTimeStamp > videoDuration) {
      toast.error("please enter correct value.");
      return;
    }

    setCaptions((prevSubtitles) => [
      ...prevSubtitles,
      { subtitle, timeStamp: parseInt(timeStamp) },
    ]);
    setSubtitle("");
    setTimeStamp("");
  };

  const removeSubtitles = (index) => {
    const updatedCaptions = [...captions];
    updatedCaptions.splice(index, 1);
    setCaptions(updatedCaptions);
  };

  return (
    <div className="flex  flex-col gap-12 justify-center mt-20 px-24">
      <div className="font-semibold text-4xl">Upload Video</div>
      <div className="flex  items-center gap-6">
        <div className="flex-[0.8]   h-80 rounded-2xl">
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
        <div className="flex-[0.4]  flex gap-6 flex-col pl-10">
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
            min={0}
            max={videoDuration}
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
            onClick={adddata}
            className="w-80 py-2 rounded-xl font-semibold text-xl border-[1px] border-[#fffffc]"
          >
            Add Subtitles
          </button>
        </div>
        <div className="flex-[0.4]">
          {captions.length > 0 ? (
            <div className="flex flex-wrap justify-between gap-2">
              {captions.map((data, idx) => (
                <div key={idx} className="border-2 w-fit px-2 py-1 rounded-lg">
                  <i
                    className="ri-close-line px-[40%] py-3 font-bold text-[#d90429] cursor-pointer"
                    onClick={() => removeSubtitles(idx)}
                  ></i>
                  <h1>subtitle: {data.subtitle}</h1>
                  <h1>timestamp: {data.timeStamp}</h1>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="font-semibold text-2xl">No subtitles..</h1>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-[700px] my-auto  py-2 rounded-xl font-semibold text-xl border-[1px] border-[#fffffc]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
