export type Label = {
  soilType: string;
  cropType: string;
  health: string;
};

export type BoxCoords = {
  positionX: number;
  positionY: number;
  lengthX: number;
  lengthY: number;
};

export type Location = {
  latitude: number;
  longitude: number;
};

type Data = {
  timestamp: string;
  location: Location;
  boundingCoords: BoxCoords;
  label: Label;
};

export type Metadata = Partial<Data>;

export type TempData = {
  path: string;
  metadata: Metadata;
}

export type SubmitData = {
  image: Blob;
  metadata: Metadata;
}
