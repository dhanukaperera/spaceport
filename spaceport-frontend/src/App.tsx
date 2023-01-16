import { Provider } from "mobx-react";
import "./App.css";
import { FilterWidget } from "./components/FilterWidget/FilterWidget";
import { SpaceshipWidget } from "./components/SpaceshipsWidget/SpaceshipsWidget";
import spaceshipstore from "./store";

function App() {
	return (
		<Provider>
			<div className="App">
				<h1>Mr Z's Space Port</h1>
				<div>
					<FilterWidget store={spaceshipstore} />
					<SpaceshipWidget store={spaceshipstore} />
				</div>
			</div>
		</Provider>
	);
}

export default App;
