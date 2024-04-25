export interface Collection {
  _id: string;
  crop_id: string;
  final_date: Date;
  name: string;
  status: string;
  user: string;
}

export const CollectionDataInit: Collection = {
  _id: "",
  crop_id: "",
  final_date: new Date(),
  name: "",
  status: "",
  user: "",
};
