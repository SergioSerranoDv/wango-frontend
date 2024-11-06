export interface Records {
  chemicals_used: {
    product_id: string;
    amount: number;
  }[];
  actual_crop_evapotranspiration: number;
  collection_id: string;
  current_stage: number;
  daily_performance: number;
  name: string;
  reference_evotranspiration: number;
  user: string;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const RecordsDataInit: Records = {
  chemicals_used: [],
  actual_crop_evapotranspiration: 0,
  collection_id: "",
  current_stage: 0,
  daily_performance: 0,
  name: "",
  reference_evotranspiration: 0,
  user: "",
  _id: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};
