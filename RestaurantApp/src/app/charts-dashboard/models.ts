// models.ts
export interface Post 
{
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
  services: string;
  salary: string;
}

export interface InventoryItem 
{
  id: number;
  itemName: string;
  date: string;
  amount: number;
  quantity: number;
}

// Define other interfaces as needed for your data
