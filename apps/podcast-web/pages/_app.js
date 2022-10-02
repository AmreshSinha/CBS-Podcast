import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  console.log("Check out our code here: https://github.com/AmreshSinha/IITG-Podcast")
  console.log("Report bugs here: https://github.com/AmreshSinha/IITG-Podcast/issues")
  console.log("Have a great day! 📣🐢")
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
