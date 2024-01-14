subtitle: `WEBVTT
    
00:00:01.301 --> 00:00:03.171 
hello

`;

const mySubtitle_arr = [
  {
    kind: "subtitles",
    src: `data:text/vtt;base64,${btoa(video.subtitle)}`,
    srcLang: "en",
    default: true,
  },
];

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
/>;
