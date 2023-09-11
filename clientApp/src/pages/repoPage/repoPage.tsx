import styles from "./repoPage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RepoData {
  name: string;
  avatar: string;
}

const RepoPage: React.FC = () => {
  const [currentRepo, setInfo] = useState<RepoData | undefined>(undefined);

  const { owner, name } = useParams<{ owner?: string; name?: string }>();
  useEffect(() => {
    const fetchInfo = async () => {
      const result = await axios.get(
        `https://api.github.com/repos/${owner}/${name}`
      );
      const data: RepoData = {
        name: result.data.name,
        avatar: result.data.owner.avatar_url,
      };
      return data;
    };
    (async () => {
      const initialData = await fetchInfo();
      setInfo(initialData);
    })();
  }, [owner, name]);

  return (
    <div className={styles.repoPage}>
      <div className={styles.title}>
        <img className={styles.avatar} src={currentRepo?.avatar} alt="Avatar" />
        {currentRepo?.name}
      </div>
      <div className={styles.infoContainer}></div>
    </div>
  );
};

export default RepoPage;
