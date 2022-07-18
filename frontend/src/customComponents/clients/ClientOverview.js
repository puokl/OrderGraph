import React, { useState, useEffect } from "react";
import ClientsTable from "./ClientsTable";
import "./ClientOverview.css";
import PropTypes from "prop-types";
import {
	Grid,
	TextField,
	Card,
	CardHeader,
	Button,
	CardContent,
	Typography,
	InputBase,
	IconButton,
	Input,
} from "@mui/material";
import shadows from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import SearchIcon from "@mui/icons-material/Search";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "./PageHeader";
import axios from "src/utils/axios2";

//const orderRoutes = require("../../../../backend/src/controllers/orderController.js")

const ClientOverview = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [clients, setClients] = useState([]);
	console.log(clients);

	const getClients = async () => {
		try {
			const response = await axios.get("/api/v1/client");
			setClients(response.data.data);
			setLoaded(true);
			console.log(response.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getClients();
	}, []);

	const totalClients = 42;
	const newClientsMonth = 4;
	const clientsWActiveOrdrs = 2;
	const clientsWORecentOrdrs = 33;

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "row",
					width: "100%",
					margin: "3rem",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Typography variant="h3" component="h3" gutterBottom>
						{"Clients Overview"}
					</Typography>
					<Typography variant="h5" component="h5" gutterBottom>
						{"Take a look at your client list"}
					</Typography>
				</div>
				<div style={{ display: "flex" }}>
					<Button
						variant="contained"
						onClick={(e) => {
							e.preventDefault();
							window.location.href = "/clients/add";
						}}
					>
						Add new client
					</Button>
				</div>
			</div>
			{/* client overview cards START */}
			<Grid container spacing={4} margin={1}>
				<Grid item xs={3}>
					<Card>
						<Grid margin={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item>
										<CircleIcon style={{ color: "#15c5e8" }} />
									</Grid>
									<Grid item>
										<Typography variant="h5" component="h5" gutterBottom>
											Total Clients
										</Typography>
									</Grid>
								</Grid>
								<br />
								<Typography
									sx={{ display: "flex", justifyContent: "center" }}
									variant="h4"
									component="h4"
									gutterBottom
								>
									{totalClients}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Grid margin={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item>
										<CircleIcon style={{ color: "green" }} />
									</Grid>
									<Grid item>
										<Typography variant="h5" component="h5" gutterBottom>
											New Clients last month{" "}
										</Typography>
									</Grid>
								</Grid>
								<br />
								<Typography
									sx={{ display: "flex", justifyContent: "center" }}
									variant="h4"
									component="h4"
									gutterBottom
								>
									{newClientsMonth}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Grid margin={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item>
										<CircleIcon style={{ color: "#15c5e8" }} />
									</Grid>
									<Grid item>
										<Typography variant="h5" component="h5" gutterBottom>
											Clients with active orders
										</Typography>
									</Grid>
								</Grid>
								<br />
								<Typography
									sx={{ display: "flex", justifyContent: "center" }}
									variant="h4"
									component="h4"
									gutterBottom
								>
									{clientsWActiveOrdrs}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Grid margin={2}>
							<Grid item xs={12}>
								<Grid container spacing={2}>
									<Grid item>
										<CircleIcon style={{ color: "red" }} />
									</Grid>
									<Grid item>
										<Typography variant="h5" component="h5" gutterBottom>
											Clients without recent orders
										</Typography>
									</Grid>
								</Grid>
								<br />
								<Typography
									sx={{ display: "flex", justifyContent: "center" }}
									variant="h4"
									component="h4"
									gutterBottom
								>
									{clientsWORecentOrdrs}
								</Typography>
							</Grid>
						</Grid>
					</Card>
				</Grid>
				{/* clients overview cards END */}
				<Grid item xs={12}>
					{/* client search & table START */}

					<Card margin={1}>
						<Grid container>
							<Grid item xs={12}>
								<ClientsTable clients={clients} loaded={loaded} />
							</Grid>
						</Grid>
					</Card>
				</Grid>
				{/* client search & table END */}
			</Grid>
		</Grid>
	);
};

ClientOverview.propTypes = {};

export default ClientOverview;
