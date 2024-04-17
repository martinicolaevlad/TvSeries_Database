import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import { Container } from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Payment } from "../../models/Payment";
import {Actor} from "../../models/Actor"
import {Director} from "../../models/Director"
import {TvSerie} from "../../models/TvSerie"

import { debounce } from 'lodash';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddPayment = () => {
    const navigate = useNavigate();

    const first_director: Director = {
        name: "Act1",
        age: 30,
        residence: "asd",
        phone_number: "12345678",
        email: "abc"
    }
    const first_actor: Actor = {
        name: "Act1",
        age: 30,
        nr_awards: 30,
        phone_number: "12345678",
        email: "abc"
    }
    const first_tvserie: TvSerie = {
        title: "Act1",
        director: first_director,
        year_published: 2000,
        cast: "12345678",
        rating: 5.0
    }


    const [payment, setPayment] = useState<Payment>({
        actor: first_actor,
        tv_serie: first_tvserie,
        // actor_id: 1,
        // tv_serie_id: 1,
        salary: 1000,
        days_worked: 100,
    });

    const[actors, setActor] = useState<Director[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Director[]>(
				`${BACKEND_API_URL}/actors/filter/${query}`
			);
			const data = await response.data;
            setActor(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};


    const[tvseries, setTvSerie] = useState<TvSerie[]>([]);
	const fetchSuggestions1 = async (query: string) => {
		try {
			const response = await axios.get<TvSerie[]>(
				`${BACKEND_API_URL}/tvseries/filter/${query}`
			);
			const data = await response.data;
			setTvSerie(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};


    const debouncedFetchSuggestions1 = useCallback(debounce(fetchSuggestions1, 500), []);


    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();

		};
	}, [debouncedFetchSuggestions]);

    useEffect(() => {
		return () => {
			debouncedFetchSuggestions1.cancel();

		};
	}, [debouncedFetchSuggestions1]);

    const addPayment = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`../../api/payments/`, payment, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/payments");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    const handleInputChange1 = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions1(value);
		}
	};

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/payments`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addPayment}>

                        {/*<TextField*/}
                        {/*    id="model"*/}
                        {/*    label="Actor"*/}
                        {/*    variant="outlined"*/}
                        {/*    fullWidth*/}
                        {/*    sx={{mb: 2}}*/}
                        {/*    onChange={(event) => setEmail({...payment, actor: event.target.value})}*/}
                        {/*/>*/}
                        <Autocomplete
							id="actor_id"
							options={actors}
							getOptionLabel={(option) => `${option.name}`}
							renderInput={(params) => <TextField{...params} label="Actor" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setPayment({ ...payment, actor_id: value.id });
								}
							}}
					/>
                    <Autocomplete
							id="tvserie_id"
							options={tvseries}
							getOptionLabel={(option) => `${option.title}`}
							renderInput={(params) => <TextField{...params} label="TvSerie" variant="outlined" />}
							filterOptions={(options, state) => options.filter((option) => option.title.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange1}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setPayment({ ...payment, tv_serie_id: value.id });
								}
							}}
					/>



                        <TextField
                            id="fuel_type"
                            label="Salary"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setPayment({...payment, salary: +event.target.value})}
                        />

                        <TextField
                            id="cc"
                            label="DaysWorked"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setPayment({...payment, days_worked: +event.target.value})}
                        />


                        <Button type="submit">Add Payment</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};