import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Container,
    TableCell,
    CircularProgress, TextField, Button, IconButton, Tooltip,
} from "@mui/material"
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Director} from "../../models/Director";
import {Link, useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Filter1 = () => {
    const [loading, setLoading] = useState(false);
    const [directors, setDirectors] = useState<Director[]>([]);
    // const [stats, setStats] = useState<Stat1Type[]>([]);
    const [order, setOrder] = useState("asc");
    const {dirID} = useParams();
    const { input } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`../../api/directors/filter/${input}/`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setDirectors(data);
                setLoading(false);
            });
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
//     return (
//         <Container>
//             <h1>Young Directors</h1>
//
//             {loading && <CircularProgress/>}
//             {!loading && stats.length > 0 && (
//                 <TableContainer component={Paper}>
//                     <Table sx={{minWidth: 650}} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>#</TableCell>
//                                 <TableCell align="left">Name</TableCell>
//                                 <TableCell align="left">Age</TableCell>
//                                 <TableCell align="left">Residence</TableCell>
//                                 <TableCell align="left">Phone Number</TableCell>
//                                 <TableCell align="left">Email</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {stats.map((item, index) => (
//                                 <TableRow key={index + 1}>
//                                     <TableCell component="th" scope="row">{index + 1}</TableCell>
//                                     <TableCell component="th" scope="row">{item.name}</TableCell>
//                                     <TableCell component="th" scope="row">{item.age}</TableCell>
//                                     <TableCell component="th" scope="row">{item.residence}</TableCell>
//                                     <TableCell component="th" scope="row">{item.phone_number}</TableCell>
//                                     <TableCell component="th" scope="row">{item.email}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Container>
//     );
// }
return (
        <Container>
            <h1>Young Directors</h1>
            {loading && <CircularProgress/>}
            {!loading && directors.length === 0 && <p>No Directors found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/directors/`}>
                    <Tooltip title="Back" arrow>
                        <ArrowBackIcon color="primary"/>
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
                                {/*<TableCell align="center">Transmission Type</TableCell>*/}
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
                                        {/*<Link to={`/cars/${director.id}/details`} title="View director details">*/}
                                        {/*    {director.model}*/}
                                        {/*</Link>*/}
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
                                    {/*<TableCell component="th" scope="row" align="center">*/}
                                    {/*    {director.transmission_type}*/}
                                    {/*</TableCell>*/}
                                        <TableCell align="right">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/cars/${director.id}/details`}>*/}
                                        {/*    <Tooltip title="View director details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/directors/${director.id}/edit`}>
                                            <EditIcon/>
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
