import { ITrip } from "./ITrip";

export interface ICreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripData: ITrip) => void;
}
