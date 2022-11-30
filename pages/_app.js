import "../styles/globals.css";
import "../styles/Banner.css";
import "../styles/GlowingButton.css";
import "../styles/Home.css";
import { Raleway } from "@next/font/google";

const inter = Raleway({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
