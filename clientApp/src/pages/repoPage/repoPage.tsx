import styles from "./repoPage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import arrowIcon from "assets/arrow-right.svg";
import classNames from "classnames";

interface RepoData {
  name: string;
  avatar: string;
  forksC: number;
  watchersC: number;
  topics: string[];
}

const RepoPage: React.FC = () => {
  const [currentRepo, setInfo] = useState<RepoData | undefined>(undefined);
  const [readmeContent, setReadmeContent] = useState("");

  const { owner, name } = useParams<{ owner?: string; name?: string }>();
  useEffect(() => {
    const fetchInfo = async () => {
      const result = await axios.get(
        `https://api.github.com/repos/${owner}/${name}`
      );
      const resultTopics = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/topics`
      );
      const data: RepoData = {
        name: result.data.full_name,
        avatar: result.data.owner.avatar_url,
        forksC: result.data.forks_count,
        watchersC: result.data.watchers_count,
        topics: resultTopics.data.names,
      };
      return data;
    };
    const fetchReadme = async () => {
      const result = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.VERSION.raw",
          },
        }
      );
      setReadmeContent(result.data);
    };

    (async () => {
      const initialData = await fetchInfo();
      setInfo(initialData);
      await fetchReadme();
    })();
    console.log(currentRepo);
  }, [owner, name]);

  return (
    <div className={styles.repoPage}>
      <div className={styles.title}>
        <NavLink to={"/"}>
          <img src={arrowIcon} alt=""></img>
        </NavLink>
        <img className={styles.avatar} src={currentRepo?.avatar} alt="A" />
        {currentRepo?.name}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.topics}>
          {currentRepo?.topics.length !== 0 ? (
            currentRepo?.topics.map((topic) => (
              <div className={styles.topic}>{topic}</div>
            ))
          ) : (
            <div className = {classNames(styles.topicNone, styles.topic)}>No topics specified</div>
          )}
        </div>
        <div className={styles.activity}>
          <p>{currentRepo?.forksC} forks</p>
          <p>{currentRepo?.watchersC} watchers</p>
        </div>
      </div>
      <section className={styles.readme}>
        <div className={styles.readmeTitle}>Readme.md</div>
        <div className={styles.readmeContent}>
          <pre className={styles.readmeText}>{readmeContent}</pre>
        </div>
      </section>
    </div>
  );
};

export default RepoPage;
