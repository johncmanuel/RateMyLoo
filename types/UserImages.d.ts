// Data type for storing user's images through image urls
// key: user's id
// value: array of image urls owned by user
export interface UserImages {
  [key: string]: string[];
}

// Image component for showing the bathroom images
export interface BathroomImageType {
  src: string | null;
  height: number;
  width: number;
  onClickCallback: () => Promise<void>;
}
