export interface Service {
  category: string;
  role: string;
  organization: string;
  date: string;
  link: string | null;
  image: string | null;
}

export type ServicesType = Service[];
