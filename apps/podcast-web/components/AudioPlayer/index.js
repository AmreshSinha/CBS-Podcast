import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
// import AudioControls from "./AudioControls";
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { musicPlaying, musicUrl, podcastImg } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

export default function AudioPlayer() {
  const [music, setMusic] = useRecoilState(musicUrl);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useRecoilState(musicPlaying);
  const [podcastImgSrc, setPodcastImg] = useRecoilState(podcastImg);
  console.log(podcastImgSrc);
  const [durationStat, setDurationStat] = useState(0);
  const [trackStyling, setTrackStyling] = useState("");
  const audioRef = useRef();

  const onMetaLoad = () => {
    setDurationStat(audioRef.current.duration);
  };

  // console.log(Math.round(trackProgress));

  useEffect(() => {
    // const audioRef = new Audio(music);
    const duration = audioRef.current || {};
    setDurationStat(duration);
    // console.log('duration', durationStat);
    const currentPercentage = duration
      ? `${(trackProgress / duration) * 100}%`
      : "0%";
    setTrackStyling(
      `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`
    );
    // const trackStyling = `
    //     -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    // `;
  }, [music]);
  const intervalRef = useRef();
  const isReady = useRef(false);

  // const { duration } = audioRef.current;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
        return;
      } else {
        setTrackProgress(audioRef.current.currentTime);
        return;
      }
    }, [1000]);
  };

  const onPlayPauseClick = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
    return;
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  // const toPrevTrack = () => {
  //     if (trackIndex - 1 < 0) {
  //       setTrackIndex(tracks.length - 1);
  //     } else {
  //       setTrackIndex(trackIndex - 1);
  //     }
  // };

  // const toNextTrack = () => {
  //     if (trackIndex < tracks.length - 1) {
  //       setTrackIndex(trackIndex + 1);
  //     } else {
  //       setTrackIndex(0);
  //     }
  // };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // useEffect(() => {
  //     audioRef.current.pause();

  //     audioRef.current = new Audio(audioSrc);
  //     setTrackProgress(audioRef.current.currentTime);

  //     if (isReady.current) {
  //       audioRef.current.play();
  //       setIsPlaying(true);
  //       startTimer();
  //     } else {
  //       isReady.current = true;
  //     }
  // }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const spaceEventListener = window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        onPlayPauseClick();
      }
    });
    return () => {
      window.removeEventListener("keydown", spaceEventListener);
    };
  });

  return (
    <AudioPlayerWrapper>
      <AudioPlayerCard>
        <LeftSide>
          <AudioImage style={{backgroundImage: `url(${podcastImgSrc})`}} />
        </LeftSide>
        <RightSide>
          <a onClick={onPlayPauseClick}>
            {!isPlaying ? <BsPlayCircleFill /> : <BsPauseCircleFill />}
          </a>
          {/* <div style={{ width: '100%', fontFamily: `"Space Grotesk", sans-serif`, fontSize: '0.92rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem' }}> */}
          {/* <span style={{ minWidth: '2.2rem' }}>{trackProgress ? `${Math.floor(trackProgress/60)}:${Math.floor(trackProgress) - Math.floor(trackProgress/60) * 60 < 10 ? 0 : ''}${Math.floor(trackProgress - Math.floor(trackProgress/60))}` : '0:00'}</span> */}
          <Slider
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={durationStat ? durationStat : `${durationStat}`}
            // className="progress"
            onChange={(e) => onScrub(e.target.value)}
            // onMouseUp={onScrubEnd}
            // onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
          {/* <span style={{ width: '2rem' }}>{durationStat == 0 ? durationStat : '0:00'}</span> */}
          {/* </div> */}
        </RightSide>
      </AudioPlayerCard>
      <audio
        preload="auto"
        src={music}
        ref={audioRef}
        onLoadedMetadata={onMetaLoad}
        autoPlay
      />
    </AudioPlayerWrapper>
  );
}

const AudioPlayerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AudioPlayerCard = styled.div`
  width: 50%;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const AudioImage = styled.div`
  width: 64px;
  height: 64px;

  background-size: cover;
  border-radius: 5px;
`;

const LeftSide = styled.div`
  display: flex;
`;

const RightSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  svg {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.05);
    }
  }
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  :hover {
    opacity: 1;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #100f0f;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #100f0f;
    cursor: pointer;
  }
`;
