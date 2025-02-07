import React from "react";
import { IMediaDetails, IMediaFormat } from "@/utils/types/media";
import axios, { AxiosResponse } from "axios";
import styles from "./media-details.module.scss";

export const MediaDetails = (props: {
  mediaData: IMediaDetails;
  url: string;
}) => {
  const { mediaData, url } = props;

  const downloadMedia = (format: IMediaFormat) => {
    if (!format) {
      return;
    }
    const params: IMediaFormat = {
      quality: format.quality,
      type: format.type,
      url: url,
    };
    axios
      .get(`http://localhost:5000/download`, {
        params,
        responseType: "arraybuffer",
      })
      .then(async (res: AxiosResponse) => {
        console.log(res);
        if (res.data) {
          // Convert response to blob & trigger download
          const blob = new Blob([res.data], { type: "mp4" });
          // const blob = await res.data
          //   .arrayBuffer()
          //   .then((buffer: Buffer) => new Blob([buffer], { type: "mp4" }));
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = `video-${format.quality}.${
            format?.type?.split("/")[1]
          }`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      });
  };
  return (
    <div className={styles.mediaDetailWrapper}>
      <img
        className={styles.mediaDetailThumbnail}
        src={mediaData?.thumbnail}
        alt={mediaData?.title}
      />
      <div className={styles.mediaDetailRight}>
        <h3 className={styles.mediaDetailTitle}>{mediaData?.title}</h3>
        <p className={styles.mediaDetailDuration}>
          Duration: {(mediaData?.duration/60).toFixed(1)} min
        </p>
        <div>
          <div className={styles.mediaDetailDownloadOptions}>
            {mediaData.formats.map((format) => {
              return (
                <div
                  key={format.url}
                  onClick={() => downloadMedia(format)}
                  className={styles.mediaDetailDownloadItem}
                >
                  <span>
                    {format?.type?.includes("video") ? "Video" : "Audio"}
                  </span>{" "}
                  {format?.qualityLabel} {format?.quality}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
