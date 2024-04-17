import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip, tableSortLabelClasses, TextField, Button,
} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Actor} from "../../models/Actor";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const AllActors = () => {
    const [loading, setLoading] = useState(false);
    const [actors, setActors] = useState<Actor[]>([]);
    const [order, setOrder] = useState("asc");
    let [input, setInput] = useState<number | undefined>();
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/actors/`)
        // fetch(`../api/directors/`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setActors(data);
                setLoading(false);
            })
    }, []);
    const sorting = () => {
        if (order === "asc") {
            const sorted = [...actors].sort((actor1, actor2) =>
                    actor1.name.toLowerCase() > actor2.name.toLowerCase() ? 1 : -1
            );
            setActors(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...actors].sort((actor1, actor2) =>
                actor1.name.toLowerCase() < actor2.name.toLowerCase() ? 1 : -1
            );
            setActors(sorted);
            setOrder("asc");
        }
    }



    return (
        <Container>
            <h1>All Directors</h1>
            {loading && <CircularProgress/>}
            {!loading && actors.length === 0 && <p>No Actors found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/actors/add/`}>
                    <Tooltip title="Add new actor" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>




            )}



            {!loading && actors.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell onClick={() => sorting()} align="center">Name</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Number of awards</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {actors.map((actor, index) => (
                                <TableRow key={actor.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/*<Link to={`/director/${director.id}/`} title="View director details">*/}
                                        {/*    {director.name}*/}
                                        {/*</Link>*/}
                                        {actor.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {actor.age}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {actor.nr_awards}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {actor.phone_number}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {actor.email}
                                    </TableCell>
                                        <TableCell align="right">

                                        <IconButton component={Link} sx={{mr: 3}} to={`/actors/${actor.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/actors/${actor.id}/details`}>
                                            <ReadMoreIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/actors/${actor.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    )
}
