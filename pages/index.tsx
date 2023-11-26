import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { HomeCards } from "../components/Cards";
import AppHeader from "../components/Header/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Larry Klosowski</title>
        <meta
          content="the Employable Dev"
          name="Built By @saul_loveman on X live for educational purposes"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <header>
        <AppHeader />
      </header>
      <div>
        <HomeCards />
      </div>
    </div>
  );
};

export default Home;
