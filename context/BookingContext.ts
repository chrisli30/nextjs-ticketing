import { createContext } from 'react';

interface SeatContextType {
    userSelected: number[];
    seats: string[];
    onSeatClick: (seat: string, index: number) => void;
    getTotalSelected: () => number;
    getTotalAvailable: () => number;
    addRandomSeat: () => void;
    removeRandomSeat: () => void;
    getSelectedSeatsData: () => { seat: number, price: number }[];
    removeSeat: (seatIndex: number) => void;
    getTotalPrice: () => number;
}

const defaultSeatContext: SeatContextType = {
    userSelected: [],
    seats: [],
    onSeatClick: () => { },
    getTotalSelected: () => 0,
    getTotalAvailable: () => 0,
    addRandomSeat: () => { },
    removeRandomSeat: () => { },
    getSelectedSeatsData: () => [],
    removeSeat: () => { },
    getTotalPrice: () => 0
};
export const BookingContext = createContext<SeatContextType>(defaultSeatContext);

