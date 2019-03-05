export interface IHour {
  amount: number;
  createdAt: string;
  price: number;
}

export interface IHours {
  [day: string]: IHour[];
}
