export interface IHour {
  amount: number;
  createdAt: string;
  price: number;
  description: string;
}

export interface IHours {
  [day: string]: IHour[];
}
