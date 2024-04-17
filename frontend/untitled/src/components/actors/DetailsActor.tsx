import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Actor } from "../../models/Actor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const DetailsActor = () => {
	const { actID } = useParams();
	const [actor, setActor] = useState<Actor>();

	useEffect(() => {
		const fetchEmployeeProject = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
            console.log(actID);
			const response = await fetch(`${BACKEND_API_URL}/actors/${actID}`);
			const employeeProject = await response.json();
			setActor(employeeProject);
		};
		fetchEmployeeProject();
	}, [actID]);


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/actors`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Actor's Details</h1>
					<p>Name: {actor?.name}</p>
					<p>Age: {actor?.age}</p>
					<p>Nr of Awards: {actor?.nr_awards}</p>
					<p>Phone Number: {actor?.phone_number}</p>
					<p>Email: {actor?.email}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/directors/${actID}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/directors/${actID}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};