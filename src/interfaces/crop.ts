export interface Crop {
  _id?: string;
  area: number;
  lot_id: string;
  name: string;
  latitude: string;
  longitude: string;
}
export const CropDataInit: Crop = {
  area: 0,
  lot_id: "",
  name: "",
  latitude: "",
  longitude: "",
};
