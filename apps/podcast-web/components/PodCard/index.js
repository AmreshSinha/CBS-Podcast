import styled from "styled-components";
import Link from "next/link";

export default function PodCard({ podcast }) {
  // Debug
  // console.log(podcast);

  const { id } = podcast;
  var { name, author, episodes, publishedAt, imageUrl } = podcast.attributes;
  imageUrl = process.env.NEXT_PUBLIC_ENDPOINT+imageUrl;

  // Debug
  // console.log(imageUrl);

  function formatDate(value, locale = "en-IN") {
    return new Date(value).toDateString(locale);
  }
  return (
    <Link href={`podcast/${id}`}>
      <PodCardContainer>
        <PodImage style={{ backgroundImage: `url(http://${imageUrl})` }} />
        <PodInfo>
          <PodName>{name}</PodName>
          <PodAuthor>{author}</PodAuthor>
          <PodDetails>
            <EpisodesNo>
              {episodes.data.length} episode
              {episodes.data.length > 1 && <span>s</span>}
            </EpisodesNo>
            <PublishedDate>{formatDate(publishedAt)}</PublishedDate>
          </PodDetails>
        </PodInfo>
      </PodCardContainer>
    </Link>
  );
}

const PodCardContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 1rem;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  :hover {
    color: #000;
    background-color: #f7ecde;
    transform: scale(1.01);
  }
`;

const PodImage = styled.div`
  width: 75px;
  height: 75px;
  background-color: transparent;
  margin-right: 11px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const PodInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 75px;
  gap: 0.25rem;
`;

const PodName = styled.h3`
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  font-size: 18px;
`;

const PodAuthor = styled.h4`
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
`;

const PodDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  height: 100%;
`;

const EpisodesNo = styled.h5`
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
`;

const PublishedDate = styled.h5`
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
`;
