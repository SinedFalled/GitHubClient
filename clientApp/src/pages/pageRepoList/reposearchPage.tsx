import React, { useEffect, useState } from "react";
import styles from "./reposearchPage.module.scss";
import Input from "./components/Input/Input";
import Card from "./components/Card/Card";
import axios from "axios";

const SearchPage: React.FC = () => {
  const [repoList, setRepos] = useState([]);

  useEffect(()=>{
    const feth = async () => {
        const result = await axios({
            method: "get",
            url: "https://api.github.com/orgs/google/repos",
        })
        setRepos(result.data.map((raw)=>({
            id: raw.id,
            name: raw.full_name,
            avatar_url: raw.owner.avatar_url,
            description: raw.description,
            lastUpdate: raw.updated_at,
        })))
    }
    feth();
  }, [])

  return (
    <div className={styles.pageRepoSearch}>
      <div className={styles.titleContainer}>
        <div className={styles.repoSearchTitle}>
          Search oraganisation repositories
        </div>
        <div className={styles.repoSearchSubtitle}>
          List repositories for the specified oraganizations
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <Input
          className={styles.orgSearch}
          onChange={() => ""}
          placeholder={"Enter organisation name"}
        ></Input>
      </div>
      <div className="companyInfo">COM</div>
      <div className={styles.repoList}>
        {repoList.map((repo) => ( //лист репозиториев компании
          <Card
            className={styles.repoCard}
            captionSlot={repo.lastUpdate}
            title={repo.name !== null ? repo.name : "Owner did not leave any description"}
            subtitle={repo.description}
            image={repo.avatar_url}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
