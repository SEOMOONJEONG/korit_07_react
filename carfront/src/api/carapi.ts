import axios from "axios";
import { CarResponse, Car } from "../types";

export const getCars = async (): Promise<CarResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);

    return response.data._embedded.cars;    // 내부 배열만 가지고옴.
}

export const deleteCar = async (link: string) : Promise<CarResponse> => {
    const response = await axios.delete(link);
    return response.data    // 전부 다 가지고옴.
}

export const addCar = async (car: Car) : Promise<CarResponse> => {  
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}