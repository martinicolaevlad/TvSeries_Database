import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Actor } from "../../models/Actor";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddActor = () => {
    const navigate = useNavigate();

    const [actor, setEmail] = useState<Actor>({
        name: "",
        age: 30,
        nr_awards: 0,
        phone_number: "",
        email: "",
    });

    const addActor = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            // await axios.post(`../../api/actors/`, actor, {
            await axios.post(`${BACKEND_API_URL}/actors/`, actor, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/actors");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/actors`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addActor}>

                        <TextField
                            id="model"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...actor, name: event.target.value})}
                        />

                        <TextField
                            id="year"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...actor, age: +event.target.value})}
                        />

                        <TextField
                            id="fuel_type"
                            label="Nr of Awards"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...actor, nr_awards: +event.target.value})}
                        />

                        <TextField
                            id="cc"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...actor, phone_number: event.target.value})}
                        />

                        <TextField
                            id="hp"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...actor, email: event.target.value})}
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