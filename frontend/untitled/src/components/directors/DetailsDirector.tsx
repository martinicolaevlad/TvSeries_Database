import { Card, CardActions, CardContent, IconButton, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Director } from "../../models/Director";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {dark} from "@mui/material/styles/createPalette";

export const DetailsDirector = () => {
    const [loading, setLoading] = useState(false);
	const { dirID } = useParams();
	const [director, setDirector] = useState<Director>();

	useEffect(() => {
		setLoading(true);
		console.log(dirID);
		alert(dirID);
		fetch(`${BACKEND_API_URL}/directors/${dirID}/`)
			.then(async (response) => (await response.json()).data)
			.then((data)=>{
				setDirector(data);
				setLoading(false);
			})
	}, []);


	return (
		<Container>
			<Card>
				<CardContent>
					<Toolbar>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/directors`}>
							<ArrowBackIcon />
						</IconButton>{" "}
					</Toolbar>
					<h1>Director's Details</h1>
					<p>Name: {director?.name}</p>
					<p>Age: {director?.age}</p>
					<p>Residence: {director?.residence}</p>
					<p>Phone Number: {director?.phone_number}</p>
					<p>Email: {director?.email}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/directors/${dirID}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/directors/${dirID}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};