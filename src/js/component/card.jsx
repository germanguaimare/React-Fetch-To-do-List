import React, { useEffect, useState, useProps } from "react";
import { Card, CardTitle, Button, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

const ListCard = (props) => {
	useEffect(() => {
		getList();
	}, []);
	const list = props.list;
	const setList = props.setList;
	const [newtask, setnewTask] = useState("");
	const getList = () => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/germanguaimare",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result != []) {
					setList(result);
				} else {
					setList({
						label: "Sample Task - Do not erase before adding your tasks",
						label: "done",
					});
				}
			})
			.catch((error) => console.log("error", error));
	};
	const addTask = () => {
		if (newtask != "") {
			list.push({ label: newtask, done: false });
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = list.map((key, index) => ({
				label: list[index].label,
				done: false,
			}));

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: JSON.stringify(raw),
				redirect: "follow",
			};

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/germanguaimare",
				requestOptions
			)
				.then((response) => response.text())
				.then((result) => {
					getList();
					setnewTask("");
				})
				.catch((error) => console.log("error", error));
		} else {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = list.map((key, index) => ({
				label: list[index].label,
				done: false,
			}));

			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: JSON.stringify(raw),
				redirect: "follow",
			};

			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/germanguaimare",
				requestOptions
			)
				.then((response) => response.text())
				.then((result) => {
					getList();
					setnewTask("");
				})
				.catch((error) => console.log("error", error));
		}
	};
	const deleteTask = (index) => {
		list.splice(index, 1);
		addTask();
		getList();
	};
	return (
		<div className="d-flex justify-content-center">
			<Card className="col-3">
				<CardBody>
					<CardTitle className="text-center" tag="h5">
						To do list with React-Fetch
					</CardTitle>
					<ul>
						{list.map((key, index) => (
							<li key={index} className="task">
								{list[index].label}
								<a
									className="delete"
									onClick={() => deleteTask(index, key)}>
									<FontAwesomeIcon icon={faBackspace} />
								</a>
							</li>
						))}
					</ul>
					<div id="inputArea" className="d-flex flex-column">
						<input
							id="taskInput"
							type="text"
							placeholder="Type your new task here"
							onChange={(e) => {
								setnewTask(e.target.value);
							}}></input>
						<Button
							className="btn-sm"
							color="success"
							onClick={() => {
								addTask();
								console.log(newtask);
								document.getElementById("taskInput").value = "";
							}}>
							Add task
						</Button>
					</div>
				</CardBody>
			</Card>
		</div>
	);
};

export default ListCard;
