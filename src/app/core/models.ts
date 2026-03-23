export type Role = 'SENDER' | 'DRIVER' | 'PICKUP' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export type ParcelStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED';

export interface Parcel {
  id: string;
  trackingId?: string;
  senderId: string;
  recipientName: string;
  recipientPhone: string;
  destination: string;
  city: string;
  weight: number;
  status: ParcelStatus;
  dateCreated: Date;
  dateUpdated?: Date;
}

export interface Stat {
  label: string;
  value: number;
  change?: number;
  icon?: string;
}
