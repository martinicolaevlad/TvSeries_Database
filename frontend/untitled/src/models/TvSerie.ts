import {Director} from "./Director";

export interface TvSerie{

    id?: number;
    title: string;
    director: Director;
    year_published: number;
    cast: string;
    rating: number;


}