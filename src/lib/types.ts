export interface Order {
  id: string;
  designName: string;
  quantity: number;
  price: number;
  status: 'preparing' | 'printing' | 'shipped';
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  logo: string;
  contactPerson: string;
}

export interface TicketDesign {
  id: string;
  name: string;
  fileUrl: string;
}
