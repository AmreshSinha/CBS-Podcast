import styled from "styled-components";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <NavbarWrapper>
        <NavbarContainer>
          <NavbarLogoText>
            <Link href="/">
              <a>CBS Podcast</a>
            </Link>
          </NavbarLogoText>
          <NavbarLinks>
            <NavbarLink href="/home">Home</NavbarLink>
            <NavbarLink href="/podcasts">Podcasts</NavbarLink>
            <NavbarLink href="/about">About</NavbarLink>
          </NavbarLinks>
        </NavbarContainer>
      </NavbarWrapper>
    </>
  );
}

const NavbarWrapper = styled.div`
  font-family: "Space Grotesk", sans-serif;
  font-weight: 400;
  padding: 1rem 2rem;
  border-radius: 0 0 1rem 1rem;
  -webkit-backdrop-filter: blur(8px); /* Safari 9+ */
  backdrop-filter: blur(8px); /* Chrome and Opera */
  box-shadow: 0px 10px 15px 10px rgb(0 0 0 / 15%);
  background-color: rgb(228 228 228 / 15%);
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLogoText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: #fff;
    letter-spacing: 0.1rem;
    text-decoration: none;
  }
`;

const NavbarLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const NavbarLink = styled.a`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
