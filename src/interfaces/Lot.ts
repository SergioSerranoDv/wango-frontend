export interface LotI {
  _id?: string;
  available_capacity: number;
  capacity: number;
  capacity_in_use?: number;
  name: string;
  createdAt: string;
}

export const LotDataInit = {
  _id: "",
  available_capacity: 0,
  capacity: 0,
  capacity_in_use: 0,
  name: "",
};
