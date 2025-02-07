export interface IMediaFormat {
  quality: string;
  qualityLabel?: string;
  type?: string;
  url: string;
}

export interface IMediaDetails {
  duration: number;
  thumbnail: string;
  title: string;
  formats: IMediaFormat[];
}
