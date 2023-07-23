import { AnimatePresence, motion } from "framer-motion";
import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import useSWR from "swr";

import fetcher from "../helpers/fetcher";
import getAccessibility from "../helpers/getAccessibility";
import getParticipants from "../helpers/getParticipants";
import getPrice from "../helpers/getPrice";

import "normalize.css";
import "../styles/global.module.scss";

import * as styles from "./styles.module.scss";

interface IActivityResponse {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  error?: string;
}

const IndexPage: React.FC<PageProps> = (): JSX.Element => {
  const { data, isValidating, mutate } = useSWR<IActivityResponse>(
    "http://www.boredapi.com/api/activity/",
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  const onGetNewActivityButtonClick = (): void => {
    mutate();
  };

  return (
    <motion.main
      className={styles.root}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      <AnimatePresence mode="wait">
        {data && (
          <motion.div
            className={styles.activity}
            key={data?.key}
            initial={{ opacity: 0, x: -300 }}
            exit={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className={styles.activityName}>{data?.activity}</span>
            <img
              className={styles.activityIcon}
              src={`../../${data?.type}.png`}
              alt="activity"
            />
            <span className={styles.activityType}>"{data?.type}"</span>

            <motion.table
              className={styles.activityTable}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
            >
              <tbody>
                <tr>
                  <td>Accessibility</td>
                  <td>Participants</td>
                  <td>Price</td>
                </tr>
                <tr className={styles.activityTableRow}>
                  <td>The smaller the more accessible</td>
                  <td>Amount of participants</td>
                  <td>The smaller the cheaper</td>
                </tr>
                <tr>
                  <td>
                    {[
                      ...Array(getAccessibility(data?.accessibility)).keys(),
                    ].map((i) => (
                      <img
                        key={i}
                        className={styles.activityTableIcon}
                        src="../../accessibility.png"
                        alt="Accessibility"
                      />
                    ))}
                  </td>
                  <td>
                    {[...Array(getParticipants(data?.participants)).keys()].map(
                      (i) => (
                        <img
                          key={i}
                          className={styles.activityTableIcon}
                          src="../../participants.png"
                          alt="Participants"
                        />
                      )
                    )}
                  </td>
                  <td>
                    {[...Array(getPrice(data?.price)).keys()].map((i) => (
                      <img
                        key={i}
                        className={styles.activityTableIcon}
                        src="../../price.png"
                        alt="Price"
                      />
                    ))}
                  </td>
                </tr>
              </tbody>
            </motion.table>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.button}
        onClick={onGetNewActivityButtonClick}
        type="button"
        disabled={isValidating}
      >
        Get new activity
      </button>
    </motion.main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Bored</title>;
