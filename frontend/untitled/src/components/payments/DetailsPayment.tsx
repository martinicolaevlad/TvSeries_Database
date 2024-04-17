import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Payment } from "../../models/Payment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DetailsPayment = () => {
	const { payID } = useParams();
	const [payment, setPayment] = useState<Payment>();

	useEffect(() => {
		const fetchEmployeeProject = async () => {

            console.log(payID);
			alert(payID);
			const response = await fetch(`${BACKEND_API_URL}/payments/${payID}/`);
			const employeeProject = await response.json();
			setPayment(employeeProject);
		};
		fetchEmployeeProject();
	}, );


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/payments/`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Payment's Details</h1>
					<p>Actor: {payment?.actor.name}</p>
					<p>TvSerie: {payment?.tv_serie.title}</p>
					<p>Salary: {payment?.salary}</p>
					<p>Days Worked: {payment?.days_worked}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/payments/${payID}/edit/`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/payments/${payID}/delete/`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};