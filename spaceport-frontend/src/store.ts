import { Spaceship } from "./models/Spaceship";
import { observable, action } from "mobx";
import { makeAutoObservable } from "mobx";

export class SpaceshipStore {
	@observable data: Spaceship[] | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	@action fetchData = async (query?: string) => {
		try {
			let url = BASE_URL;
			if (query) {
				url = url + query;
			} else {
				url = url + "/spaceships";
			}
			const response = await fetch(url);
			const json = await response.json();
			this.data = json;
		} catch (error) {
			console.error(error);
		}
	};
}

const BASE_URL = "http://0.0.0.0:5000";

const spaceshipStore = new SpaceshipStore();

export default spaceshipStore;
