import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import { Payment } from "../../models/Payment";
import {Actor} from "../../models/Actor"
import {TvSerie} from "../../models/TvSerie"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const EditActor = () => {
    const {actID: actID} = useParams();
    const navigate = useNavigate();

    const [actor, setActor] = useState<Actor>({
        id: (typeof actID === "string" ? parseInt(actID) : -1),
        name: "",
        age: 30,
        nr_awards: 0,
        phone_number: "",
        email: "",
    });



    const editActor = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                // await axios.patch(`${BACKEND_API_URL}/directors/${dirID}/`, director, {
                await axios.patch(`${BACKEND_API_URL}/actors/${actID}/`, actor, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/actors");
            } catch (error) {
                console.log(error);
            }
        }
    ;

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/actors`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={editActor}>


                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setActor({...actor, name: event.target.value})}
                        />

                        <TextField
                            id="age"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setActor({...actor, age: +event.target.value})}
                        />

                        <TextField
                            id="residence"
                            label="Nr of Awards"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setActor({...actor, nr_awards: +event.target.value})}
                        />

                        <TextField
                            id="phone_number"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setActor({...actor, phone_number: event.target.value})}
                        />

                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setActor({...actor, email: event.target.value})}
                        />

                        <Button type="submit">Edit Actor</Button>

                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};