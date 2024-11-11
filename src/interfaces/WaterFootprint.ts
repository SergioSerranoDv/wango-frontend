export interface WaterFootprintI {
  _id: string;
  collection_id: string;
  crop_id: string;
  cropData?: {
    name: string;
  };
  collectionData?: {
    _id: string;
    name: string;
  };
  lotData?: {
    name: string;
  };
  blue_component: number;
  green_component: number;
  grey_component: number;
  total: number;
  ia_suggestion: string;
  createdAt: string;
  updatedAt: string;
}

export const waterFootprintDataInit = {
  _id: "",
  collection_id: "",
  crop_id: "",
  blue_component: 0,
  green_component: 0,
  grey_component: 0,
  total: 0,
  ia_suggestion: "",
  createdAt: "",
  updatedAt: "",
};

export interface IASuggestionI {
  content: string;
}
export const IASuggestionDataInit: IASuggestionI = {
  content: "",
};
