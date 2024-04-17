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
    Tooltip, tableSortLabelClasses, TextField, Button, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Payment} from "../../models/Payment";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export const AllPayments = () => {
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [order, setOrder] = useState("asc");
    let [input, setInput] = useState<number | undefined>();
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/payments/`)
        // fetch(`../api/payments/`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setPayments(data);
                setLoading(false);
            })
    }, []);
    const sorting = () => {
        if (order === "asc") {
            const sorted = [...payments].sort((director1, director2) =>
                    director1.salary > director2.salary ? 1 : -1
            );
            setPayments(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...payments].sort((director1, director2) =>
                director1.salary < director2.salary ? 1 : -1
            );
            setPayments(sorted);
            setOrder("asc");
        }
    }



    return (
        <Container>
            <h1>All Payments</h1>

            {loading && <CircularProgress/>}
            {!loading && payments.length === 0 && <p>No Payments found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/payments/add/`}>
                    <Tooltip title="Add new payment" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && payments.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell onClick={() => sorting()} align="center">Actor</TableCell>
                                <TableCell align="center">Tv Serie</TableCell>
                                <TableCell align="center">Salary</TableCell>
                                <TableCell align="center">Days Worked</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment, index) => (
                                <TableRow key={payment.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {payment.actor_id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {payment.tv_serie_id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {payment.salary}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {payment.days_worked}
                                    </TableCell>
                                        <TableCell align="right">

                                        <IconButton component={Link} sx={{mr: 3}} to={`/payments/${payment.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/payments/${payment.id}/details/`}>
                                            <ReadMoreIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/payments/${payment.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                            <Typography variant="subtitle2" sx={{color: "red"}}>${payment.id}</Typography>
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
