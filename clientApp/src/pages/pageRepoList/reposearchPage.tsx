import React, { useCallback, useEffect, useState } from "react";
import styles from "./reposearchPage.module.scss";
import Input from "./components/Input/Input";
import Card from "./components/Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import RepoPage from "pages/repoPage";
import { useNavigate } from "react-router-dom";

interface RepoData {
  id: number;
  name: string;
  shortName: string;
  avatar_url: string;
  owner: string;
  description: string;
  lastUpdate: string;
}

const SearchPage: React.FC = () => {
  const [repoList, setRepos] = useState<RepoData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRepos = async (orgName?: string, page: number = 1) => {
    const result = await axios.get(`
      https://api.github.com/orgs/${
        orgName !== undefined ? orgName : "github"
      }/repos?page=${page}`);
    const data: RepoData[] = result.data.map((raw: any) => ({
      id: raw.id,
      name: raw.full_name,
      shortName: raw.name,
      avatar_url: raw.owner.avatar_url,
      owner: raw.owner.login,
      description: raw.description,
      lastUpdate: raw.updated_at,
    }));
    return data;
  };

  const getNextPage = async () => {
    const nextPage = currentPage + 1;
    const newData = await fetchRepos("google", nextPage);
    setRepos((prevRepos) => [...prevRepos, ...newData]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    (async () => {
      const initialData = await fetchRepos("google", currentPage);
      setRepos(initialData);
    })();
  }, [currentPage]);

  const navigate = useNavigate();

  const onClickCard = useCallback(
    (owner: string, title: string) => {
      navigate(`/repo/${owner}/${title}`);
    },
    [navigate]
  );

  return (
    <div>
      <div className={styles.pageRepoSearch}>
        <div className={styles.titleContainer}>
          <div className={styles.repoSearchTitle}>
            Search organization repositories
          </div>
          <div className={styles.repoSearchSubtitle}>
            List repositories for the specified organizations
          </div>
        </div>
        <div className={styles.inputsContainer}>
          <Input
            className={styles.orgSearch}
            onChange={() => ""}
            placeholder={"Enter organization name"}
          />
        </div>
        <div className="companyInfo">COM</div>
        <InfiniteScroll
          className={styles.repoList}
          dataLength={repoList.length}
          next={getNextPage}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {repoList.map((repo) => (
            <Card
              key={repo.name}
              className={styles.repoCard}
              captionSlot={repo.lastUpdate}
              title={repo.name}
              subtitle={
                repo.description !== null
                  ? repo.description
                  : "Owner did not leave any description"
              }
              image={repo.avatar_url}
              onClick={() => onClickCard(repo.owner, repo.shortName)}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchPage;
