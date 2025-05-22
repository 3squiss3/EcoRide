
  
  export interface Preferences {
    smoking: boolean;
    animals: boolean;
    music: string;
    conversation: string;
  }

  export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  color: string;
  registrationYear: number;
  seats: number;
  energy: string;
  isElectric: boolean;
  driverProfileId: number;
}