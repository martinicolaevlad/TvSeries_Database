import {TvSerie} from "./TvSerie";
import {Actor} from "./Actor";

export interface Payment{
    id?: number;
    actor: Actor;
    actor_id?: number;
    tv_serie: TvSerie;
    tv_serie_id?: number;
    salary: number;
    days_worked: number;

    // actor_name: string;
    // tvSerie_title: string;
}