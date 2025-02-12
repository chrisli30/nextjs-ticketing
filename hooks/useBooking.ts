import { AVAILABLE, RESERVED, SEAT_PRICE, SELECTED } from '@/components/constants';
import { useState } from 'react';


const formatSeatsDetails = (selectedSeats: number[]) => {
    return selectedSeats.map(seatNumber => ({ seat: seatNumber, price: SEAT_PRICE }))

}

export const useBooking = (seatMap: string[]) => {
    const [seats, setSeats] = useState<string[]>(seatMap);
    const [randomlySelected, setRandomlySelected] = useState<number[]>([]);
    const [userSelected, setUserSelected] = useState<number[]>([]);

    const checkSeatToggle = (seat: string) => {
        return seat === SELECTED ? AVAILABLE : SELECTED;
    }
    const checkAvailable = () => seats.includes(AVAILABLE)
    const checkRandomlySelected = (index: number) => randomlySelected.includes(index)
    const checkUserSelected = (index: number) => userSelected.includes(index)
    const onSeatClick = (seat: string, index: number) => {
        if (!checkRandomlySelected(index) && seat !== RESERVED) {
            const modifiedSeats = seats.map((s, i) => (index === i) ? checkSeatToggle(s) : s);
            setUserSelected(userSelected.includes(index)
                ? userSelected.filter(i => i !== index)
                : [...userSelected, index]);
            setSeats(modifiedSeats)
        }
    }
    const removeSeat = (seatIndex: number) => {
        if (checkUserSelected(seatIndex))
            setUserSelected(userSelected.filter(i => i !== seatIndex));
        else setRandomlySelected(randomlySelected.filter(i => i !== seatIndex));

        const modifiedSeats = seats.map((s, i) => (i === seatIndex) ? AVAILABLE : s);
        setSeats(modifiedSeats);
    }
    const addRandomSeat = () => {
        if (!checkAvailable()) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * seats.length);
        if (seats[randomIndex] === AVAILABLE) {
            const modifiedSeats = seats.map((s, i) => (i === randomIndex) ? SELECTED : s);
            setRandomlySelected([...randomlySelected, randomIndex]);
            setSeats(modifiedSeats);
        } else addRandomSeat()
    }
    const removeRandomSeat = () => {
        if (!randomlySelected.length) {
            return;
        }
        const randomIndex = randomlySelected.pop();
        const modifiedSeats = seats.map((s, i) => (i === randomIndex) ? AVAILABLE : s);
        setSeats(modifiedSeats);
        setRandomlySelected(randomlySelected);
    }
    const getTotalSelected = () => {
        return seats.filter(seat => seat === SELECTED).length;
    }
    const getTotalAvailable = () => {
        return seats.filter(seat => seat === AVAILABLE).length;
    }
    const getSelectedSeatsData = () => {
        const selectedSeats = [...userSelected, ...randomlySelected]
        return formatSeatsDetails(selectedSeats)
    }
    const getTotalPrice = () => {
        const selectedSeats = [...userSelected, ...randomlySelected]
        return selectedSeats.length * SEAT_PRICE
    }

    return {
        userSelected,
        seats,
        onSeatClick,
        getTotalSelected,
        getTotalAvailable,
        getSelectedSeatsData,
        removeSeat,
        addRandomSeat,
        removeRandomSeat,
        getTotalPrice

    }
}
