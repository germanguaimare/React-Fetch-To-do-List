import React, { useEffect, useState } from "react";

import ListCard from "../component/card.jsx";

//create your first component
const Home = () => {
	const [list, setList] = useState([]);

	return (
		<div className="mt-5">
			<ListCard list={list} setList={setList} />
		</div>
	);
};

export default Home;
