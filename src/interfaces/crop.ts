export interface Crop {
  _id: string;
  area: number;
  latitude: number;
  longitude: number;
  name: string;
  lot_id: string;
  status_data_collection: string;
  createdAt?: string;
}

export const CropDataInit = {
  _id: "",
  area: 0,
  lot_id: "",
  name: "",
  latitude: 0,
  longitude: 0,
  status_data_collection: "",
};
