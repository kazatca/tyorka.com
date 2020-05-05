
export interface Image {
  src?: string | null;
  width: number;
  height: number;
}

export interface Slide {
  name: string
  preview: Image
  original: Image
  positionX?: number
  positionY?: number
  size?: number
}