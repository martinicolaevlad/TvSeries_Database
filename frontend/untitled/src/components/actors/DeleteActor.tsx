	import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
	import { Link, useNavigate, useParams } from "react-router-dom";
	import ArrowBackIcon from "@mui/icons-material/ArrowBack";
	import axios from "axios";
	import { BACKEND_API_URL } from "../../constants";

	export const DeleteActor = () => {
		const { actID } = useParams();
		const navigate = useNavigate();

		const handleDelete = async (event: { preventDefault: () => void }) => {
			event.preventDefault();
			await axios.delete(`${BACKEND_API_URL}/actors/${actID}/`);
			// await axios.delete(`../../api/actors/${actID}/`);
			navigate("/actors");
		};

		const handleCancel = (event: { preventDefault: () => void }) => {
			event.preventDefault();
			navigate("/actors");
		};

		return (
			<Container>
				<Card>
					<CardContent>
						<IconButton component={Link} sx={{ mr: 3 }} to={`/directors`}>
							<ArrowBackIcon />
						</IconButton>{" "}
						Are you sure you want to delete this actor? This cannot be undone!
					</CardContent>
					<CardActions>
						<Button onClick={handleDelete}>Delete it</Button>
						<Button onClick={handleCancel}>Cancel</Button>
					</CardActions>
				</Card>
			</Container>
		);
	};