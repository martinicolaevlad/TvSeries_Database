import {Box, AppBar, Toolbar, IconButton, Typography, Button, Container} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import DirectorIcon from "@mui/icons-material/CarRental";
import Director from "@mui/icons-material/CarRentalRounded";
import {AllDirectors} from "./directors/AllDirectors";
import {useState} from "react";
import {Payment, Star} from "@mui/icons-material";
import {Filter1} from "./statistics/Filter1";
import {AllPayments} from "./payments/AllPayments";
import {AllActors} from "./actors/AllActors"
// import {Filter1} from "./statistics/Filter1";

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;
    const [state, setState] = useState(0);

    return (
        <Container>
            {state === 0 && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" sx={{marginBottom: "20px"}}>
                        <Toolbar>
                            <IconButton
                                component={Link}
                                to="/"
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="school"
                                sx={{mr: 2}}>
                                <DirectorIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Directors management
                            </Typography>
                            <Button
                                // variant={path.startsWith("/cars") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                startIcon={<Director/>}
                                onClick={() => setState(1)}
                            >
                                Directors
                            </Button>
                        {/*</Toolbar>*/}
                        <IconButton
                                component={Link}
                                to="/"
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="school"
                                sx={{mr: 2}}>
                                <DirectorIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Payments management
                            </Typography>
                            <Button
                                // variant={path.startsWith("/cars") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                startIcon={<Payment/>}
                                onClick={() => setState(2)}
                            >
                                Payments
                            </Button>
                        {/*</Toolbar>*/}
                        <IconButton
                                component={Link}
                                to="/"
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="school"
                                sx={{mr: 2}}>
                                <DirectorIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Actors management
                            </Typography>
                            <Button
                                // variant={path.startsWith("/cars") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                startIcon={<Director/>}
                                onClick={() => setState(4)}
                            >
                                Actors
                            </Button>
                        </Toolbar>
                        {/*<Toolbar>*/}
                        {/*    <IconButton*/}
                        {/*        component={Link}*/}
                        {/*        to="/"*/}
                        {/*        size="large"*/}
                        {/*        edge="start"*/}
                        {/*        color="inherit"*/}
                        {/*        aria-label="school"*/}
                        {/*        sx={{mr: 2}}>*/}
                        {/*        <Star/>*/}
                        {/*    </IconButton>*/}
                        {/*    <Typography variant="h6" component="div" sx={{mr: 5}}>*/}
                        {/*        Statistics:*/}
                        {/*    </Typography>*/}
                        {/*    <Button*/}
                        {/*        // variant={path.startsWith("/statistics/1/") ? "outlined" : "text"}*/}
                        {/*        to="/"*/}
                        {/*        component={Link}*/}
                        {/*        color="inherit"*/}
                        {/*        sx={{mr: 5}}*/}
                        {/*        startIcon={<Star/>}*/}
                        {/*        onClick={() => setState(2)}*/}
                        {/*    >*/}
                        {/*        Statistics*/}
                        {/*    </Button>*/}
                        {/*</Toolbar>*/}
                    </AppBar>
                </Box>
            )}
            {state === 1 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Director/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllDirectors/></>
            )}
            {state === 2 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Payment/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllPayments/></>
            )}
            {state === 3 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Director/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><Filter1/></>
            )}
            {state === 4 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Director/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllActors/></>
            )}
        </Container>
    );
};