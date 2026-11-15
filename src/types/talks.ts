export interface Talk {
  category: string;
  title: string;
  organization: string;
  date: string;
  link: string | null;
  image: string | null;
}

export type TalksType = Talk[];
