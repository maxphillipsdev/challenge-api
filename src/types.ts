export interface Show {
  title: string;
  drm: boolean;
  episodeCount: Number;
  slug: string;
  image: {
    showImage: string;
  };
}

export interface ReducedShow {
  title: string;
  slug: string;
  image: string;
}
