import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Director } from "../../models/Director";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddDirector = () => {
    const navigate = useNavigate();

    const [director, setEmail] = useState<Director>({
        name: "",
        age: 30,
        residence: "",
        phone_number: "",
        email: "",
    });

    const addDirector = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/directors/`, director, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/directors");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/directors`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addDirector}>

                        <TextField
                            id="model"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...director, name: event.target.value})}
                        />

                        <TextField
                            id="year"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...director, age: +event.target.value})}
                        />

                        <TextField
                            id="fuel_type"
                            label="Residence"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...director, residence: event.target.value})}
                        />

                        <TextField
                            id="cc"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...director, phone_number: event.target.value})}
                        />

                        <TextField
                            id="hp"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...director, email: event.target.value})}
                        />

                        {/*<TextField*/}
                        {/*    id="transmission_type"*/}
                        {/*    label="Transmission Type (M, A, C)"*/}
                        {/*    variant="outlined"*/}
                        {/*    fullWidth*/}
                        {/*    sx={{mb: 2}}*/}
                        {/*    onChange={(event) => setEmail({...car, transmission_type: event.target.value})}*/}
                        {/*/>*/}

                        <Button type="submit">Add Directors</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};