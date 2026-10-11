export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number; // (min + max) / 2 - the API only gives min and max
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string; // "প্রতি কেজি"
  unitShort: string; // "কেজি"
  price: number; // today
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: number; // signed percent: >0 up, <0 down, 0 flat
  category: string; // slug
  categoryLabel: string;
  categoryIcon: string;
  description: string;
  markets: Market[];
  min: number | null;
  max: number | null;
  avg: number | null;
  minMarket: string;
  maxMarket: string;
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};
