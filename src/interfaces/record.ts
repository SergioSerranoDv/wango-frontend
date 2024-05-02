export interface Records {
  amount_chemicals_used: number;
  actual_crop_evapotranspiration: number;
  collection_id: string;
  current_stage: number;
  daily_performance: number;
  name: string;
  reference_evotranspiration: number;
  user: string;
  _id?: string;
}

export const RecordsDataInit: Records = {
  amount_chemicals_used: 0,
  actual_crop_evapotranspiration: 0,
  collection_id: "",
  current_stage: 0,
  daily_performance: 0,
  name: "",
  reference_evotranspiration: 0,
  user: "",
  _id: "",
};
