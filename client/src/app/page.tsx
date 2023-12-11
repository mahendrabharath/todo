import styles from "./page.module.css";
import { Limelight } from "next/font/google";
import List from "@/components/List";
import { Suspense } from "react";

const limeLight = Limelight({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
      <main>
        <div className={styles.hero}>
          <h1 className={`${limeLight.className} ${styles.hero_text} `}>
            Conquer Tasks with Our Todo List App
          </h1>
          <div className={styles.actions_buttons}>
            <a href="/add" >
              <button className={styles.button}>
                <p className={styles.button_label}>Start Organizing</p>
              </button>
            </a>
            <a href="/shop" >
              <button className={styles.button_learn_more}>
                <p className={styles.button_label}>Shopping List</p>
              </button>
            </a>
          </div>
        </div>
        <section className={styles.about}>
          <div className={styles.wrapper}>
            <img className={styles.image1} />
            <div className={styles.wrapper1_left}>
              <h3 className={`${styles.wrapper1_left_h3} ${limeLight.className}`}>
                Organize Your Life and Boost Your Productivity
              </h3>
              <p className={styles.wrapper1_left_p}>
                Say goodbye to forgotten tasks and embrace a more organized
                lifestyle with our Todo List App, designed for maximum efficiency.
              </p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.description}>
              <h3 className={`${styles.wrapper1_left_h3} ${limeLight.className}`}>
                Organize Your Life and Boost Your Productivity
              </h3>
              <p className={styles.wrapper1_left_p}>
                Say goodbye to forgotten tasks and embrace a more organized
                lifestyle with our Todo List App, designed for maximum efficiency.
              </p>
            </div>
            <img className={styles.image2} />
          </div>
        </section>
        <section className={styles.projects}>
          <List />
        </section>
      </main>
  );
}
