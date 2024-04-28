export interface Collection {
  _id: string;
  crop_id: string;
  inicial_date: Date;
  final_date: Date;
  name: string;
  status: string;
  user: string;
}

export const CollectionDataInit: Collection = {
  _id: "",
  crop_id: "",
  inicial_date: new Date(),
  final_date: new Date(),
  name: "",
  status: "",
  user: "",
};
