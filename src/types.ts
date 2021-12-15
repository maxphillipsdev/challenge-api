/**
 * Interface for basic structure of a Show in the request payload.
 */
export interface IRequestShow {
  title: string;
  drm: boolean;
  episodeCount: Number;
  slug: string;
  image: {
    showImage: string;
  };
}

/**
 * Interface for the basic structure of a Show in the response.
 */
export interface IResponseShow {
  title: string;
  slug: string;
  image: string;
}
