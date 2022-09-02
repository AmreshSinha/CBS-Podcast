import styled from "styled-components";
import Link from "next/link";

export default function PodCard({ podcast }) {
  const { id } = podcast;
  const { name, author, episodes, publishedAt, imageUrl } = podcast.attributes;
  return (
    <Link href={`podcast/${id}`}>
      <PodCard>
        <PodImage style={{ backgroundImage: `url(${imageUrl})` }} />
        <PodInfo>
          <PodName>{name}</PodName>
          <PodAuthor>{author}</PodAuthor>
          <PodDetails>
            <EpisodesNo>
              {episodes.length} episode{episodes.length > 1 ? s : null}
            </EpisodesNo>
            <PublishedDate>{publishedAt}</PublishedDate>
          </PodDetails>
        </PodInfo>
      </PodCard>
    </Link>
  );
}

const PodCard = styled.div``;
