import { useState } from "react";
import { Card } from "../card/card";
import styles from "./link-input.module.scss";
import axios, { AxiosResponse } from "axios";
import { MediaDetails } from "../media-details/media-details";
import { IMediaDetails } from "@/utils/types/media";
// import { SERVICE_BASE_URL } from "../../utils/env_contants";

// interface MediaInputProps {
//   onSubmit: (url: string) => void;
// }


export default function LinkInput() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=kZGpkkfk2lA");
  const [mediaDetails, setMediaDetails] = useState<IMediaDetails | null>(null);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/video-info?url=${encodeURIComponent(url)}`)
      .then((res: AxiosResponse) => {
        console.log(res)
        setMediaDetails(res.data)
      }).catch(err=>console.log(err));
  };

  return (
    <Card>
      <h1 className={styles.heading}>Snap-fetch</h1>
      <form onSubmit={handleSubmit} className={styles.linkInputForm}>
        <input
          type="text"
          placeholder="Enter media URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.link}
        />
        <button type="submit" className={styles.linkButton}>
          Download
        </button>
      </form>
        {mediaDetails && <MediaDetails mediaData={mediaDetails} url={url}/>}
      
    </Card>
  );
}
