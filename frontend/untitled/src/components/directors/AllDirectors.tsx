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
import {Director} from "../../models/Director";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const AllDirectors = () => {
    const [loading, setLoading] = useState(false);
    const [directors, setDirectors] = useState<Director[]>([]);
    const [order, setOrder] = useState("asc");
    let [input, setInput] = useState<number | undefined>();
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/directors/`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setDirectors(data);
                setLoading(false);
            })

    }, []);
    const sorting = () => {
        if (order === "asc") {
            const sorted = [...directors].sort((director1, director2) =>
                    director1.name.toLowerCase() > director2.name.toLowerCase() ? 1 : -1
            );
            setDirectors(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...directors].sort((director1, director2) =>
                director1.name.toLowerCase() < director2.name.toLowerCase() ? 1 : -1
            );
            setDirectors(sorted);
            setOrder("asc");
        }
    }



    return (
        <Container>
            <h1>All Directors</h1>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "900px", marginBottom: "-30px" }}>
            <TextField
                label="Min Age"
                onChange={(event) => {
						setInput( parseInt(event.target.value))}}
                InputProps={{ style: { color: "grey" } }}
                InputLabelProps={{style: {color: 'darkgrey'}}}
                style={{ marginRight: "20px", color:'whitesmoke' }}
            />
            <Button component={Link} sx={{ mr: 3 }} to={`/directors/filter/${input}/`} variant="contained" style={{color:"whitesmoke"}}>
                Filter
            </Button>
            </div>
            <IconButton component={Link} sx={{mr: 3}} to={`/`}>
                <Tooltip title="Back" arrow>
                    <ArrowBackIcon color="primary"/>
                </Tooltip>

            </IconButton>
            {loading && <CircularProgress/>}
            {!loading && directors.length === 0 && <p>No Directors found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/directors/add/`}>
                    <Tooltip title="Add new director" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && directors.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell onClick={() => sorting()} align="center">Name</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Residence</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {directors.map((director, index) => (
                                <TableRow key={director.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {director.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {director.age}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {director.residence}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {director.phone_number}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {director.email}
                                    </TableCell>
                                        <TableCell align="right">

                                        <IconButton component={Link} sx={{mr: 3}} to={`/directors/${director.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/directors/${director.id}/details`}>
                                            <ReadMoreIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/directors/${director.id}/delete`}>
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
