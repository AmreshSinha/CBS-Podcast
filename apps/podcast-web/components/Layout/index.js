import styled from "styled-components";
import AudioPlayer from "../AudioPlayer";
import { useRouter } from "next/router";
// import ContextProvider from '../../context';
import { RecoilRoot } from "recoil";

export default function Layout({ children }) {
  console.log("Check out our code here: https://github.com/AmreshSinha/IITG-Podcast")
  console.log("Report bugs here: https://github.com/AmreshSinha/IITG-Podcast/issues")
  console.log("Have a great day! 📣🐢")

  var router = useRouter();
  
  return (
    // <ContextProvider>
    <RecoilRoot>
      <LayoutWrapper>
        <main>{children}</main>
        {router.pathname != "/" && <AudioPlayer />}
      </LayoutWrapper>
    </RecoilRoot>
    // </ContextProvider>
  );
}

const LayoutWrapper = styled.div`
  width: 100%;
`;
