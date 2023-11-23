export interface GeneralResponse {
  message: string;
  result: never;
}

export interface ResultResponse {
  message: string,
  total_records: number,
  total_pages: number,
  previous: string | null,
  next: string | null,
  results: Result[]
}

export interface Result {
  uid: string,
  name: string,
  url: string
}
