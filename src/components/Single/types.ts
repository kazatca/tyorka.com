
export interface Image {
  src: string;
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