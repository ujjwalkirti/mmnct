import "../styles/globals.css";
import "../styles/Banner.css";
import "../styles/GlowingButton.css";
import "../styles/Home.css";
import { Montserrat } from "@next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
