export interface Props {
  method: string;
  endpoint: string;
  body?: any;
}

export interface Response {
  data?: any;
  message: string;
  status: string;
}
