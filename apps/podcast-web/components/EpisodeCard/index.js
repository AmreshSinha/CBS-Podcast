import styled from "styled-components";
import { BsFillPlayCircleFill, BsDot } from "react-icons/bs";
import { musicUrl, musicPlaying } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

export default function EpisodeCard(props) {
  const [music, setMusic] = useRecoilState(musicUrl);
  const [isPlaying, setIsPlaying] = useRecoilState(musicPlaying);
  function formatDate(value, locale = "en-IN") {
    return new Date(value).toDateString(locale);
  }
  return (
    <EpisodeCardWrapper
      onClick={() => {
        setMusic(props.episode.attributes.mp3Link), setIsPlaying(true);
      }}
    >
      <LetterThumb>
        <h1>{props.index + 1}</h1>
      </LetterThumb>
      <RightSide>
        <EpisodeTitle>{props.episode.attributes.name}</EpisodeTitle>
        <PlayButton>
          <BsFillPlayCircleFill />
          <BsDot />
          <div>{formatDate(props.episode.attributes.publishedAt)}</div>
        </PlayButton>
      </RightSide>
    </EpisodeCardWrapper>
  );
}

const EpisodeCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  border-radius: 5px;
  padding: 1rem;
  transition: all 0.1s ease-in-out;
  background-color: rgba(247, 236, 222, 0.5);
  :hover {
    background-color: #f7ecde;
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const LetterThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 5px;
  background: #100f0f;
  color: #fff;
`;

const EpisodeTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 800;
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
    fill: #100f0f;
    transition: all 0.2s ease-in-out;
    :hover {
      z-index: 2;
      transform: scale(1.15);
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
