import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import { Payment } from "../../models/Payment";
import {Director} from "../../models/Director";
import {Actor} from "../../models/Actor"
import {TvSerie} from "../../models/TvSerie"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const EditDirector = () => {
    const {dirID: dirID} = useParams();
    const navigate = useNavigate();

    const [director, setDirector] = useState<Director>({
        id: (typeof dirID === "string" ? parseInt(dirID) : -1),
        name: "",
        age: 30,
        residence: "",
        phone_number: "",
        email: "",
    });

    const editDirector = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.patch(`${BACKEND_API_URL}/directors/${dirID}/`, director, {
                // await axios.patch(`../../api/directors/${dirID}/`, director, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/directors");
            } catch (error) {
                console.log(error);
            }
        }
    ;

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/directors`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={editDirector}>


                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDirector({...director, name: event.target.value})}
                        />

                        <TextField
                            id="age"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDirector({...director, age: +event.target.value})}
                        />

                        <TextField
                            id="residence"
                            label="Residence"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDirector({...director, residence: event.target.value})}
                        />

                        <TextField
                            id="phone_number"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDirector({...director, phone_number: event.target.value})}
                        />

                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDirector({...director, email: event.target.value})}
                        />

                        <Button type="submit">Update Director</Button>

                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};