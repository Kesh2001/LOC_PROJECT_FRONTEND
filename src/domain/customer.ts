
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id: number;
  name: string;
  country: { name: string; code: string };
  representative: { name: string; image: string };
  date: Date | string;
  balance: number;
  status: string;
  activity: number;
  verified: boolean;
}