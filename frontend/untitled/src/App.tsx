import {useState} from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AllDirectors} from "./components/directors/AllDirectors";
import {AppMenu} from "./components/AppMenu";
import {AddDirector} from "./components/directors/AddDirector";
import {DeleteDirector} from "./components/directors/DeleteDirector";
import {Filter1} from "./components/statistics/Filter1";
import {EditDirector} from "./components/directors/EditDirector";
import {AllPayments} from "./components/payments/AllPayments";
import {AddPayment} from "./components/payments/AddPayment";
import {DeletePayment} from "./components/payments/DeletePayment";
import {DetailsDirector} from "./components/directors/DetailsDirector";
import {EditPayment} from "./components/payments/EditPayment";
import {AllActors} from "./components/actors/AllActors";
import {DetailsPayment} from "./components/payments/DetailsPayment";
import {AddActor} from "./components/actors/AddActor";
import {EditActor} from "./components/actors/EditActor";
import {DetailsActor} from "./components/actors/DetailsActor";
import {DeleteActor} from "./components/actors/DeleteActor";
function App() {
    return (
        <React.Fragment>
			<Router>
				<Routes>
					<Route path="/" element={<AppMenu />} />
					<Route path="/directors/" element={<AllDirectors/>} />
					<Route path="/directors/add/" element={<AddDirector />} />
					<Route path="/directors/:dirID/edit/" element={<EditDirector />} />
					<Route path="/directors/:dirID/details/" element={<DetailsDirector />} />
					<Route path="/directors/:dirID/delete/" element={<DeleteDirector />} />
					<Route path="/directors/filter/:input/" element={<Filter1 />} />

					<Route path="/payments/" element={<AllPayments />} />
					<Route path="/payments/add/" element={<AddPayment />} />
					<Route path="/payments/:payID/edit/" element={<EditPayment />} />
					<Route path="/payments/:payID/delete/" element={<DeletePayment />} />
					<Route path="/payments/:payID/details/" element={<DetailsPayment />} />

					<Route path="/actors/" element={<AllActors/>} />
					<Route path="/actors/add/" element={<AddActor/>} />
					<Route path="/actors/:actID/edit" element={<EditActor/>} />
					<Route path="/actors/:actID/delete" element={<DeleteActor/>} />
					<Route path="/actors/:actID/details" element={<DetailsActor/>} />

				</Routes>
			</Router>
		</React.Fragment>
    )
}

export default App
