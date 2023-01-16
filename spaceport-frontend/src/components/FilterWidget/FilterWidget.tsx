import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { ColourFilter } from "./ColourFilter";
import { SpeedFilter } from "./SpeedFilter";
import { ManufactureDateFilter } from "./ManufactureDataFilter";
import { PluseFilter } from "./PulseFilter";
import { useState, useCallback } from "react";
import { inject, observer } from "mobx-react";
import { SpaceshipStore } from "../../store";

interface InjectedStoreProps {
	store: SpaceshipStore;
}
interface FilterQuery {
	colorFilterType: string;
	colorList: string[];
	speedFilterType: string;
	speed: number;
	mfdFilterType: string;
	mfDate: Date;
	pulseLaser: boolean;
}

export const FilterWidget: React.FC<InjectedStoreProps> = inject("store")(
	observer(({ store }) => {
		const [filters, setFilters] = useState<FilterQuery>({
			colorFilterType: "all",
			colorList: [],
			speedFilterType: "lt",
			speed: 50,
			mfdFilterType: "af",
			mfDate: new Date(),
			pulseLaser: false,
		});

		const handleColorFilterTypeChange = useCallback((value: string) => {
			setFilters((prevState) => {
				return {
					...prevState,
					colorFilterType: value,
				};
			});
		}, []);

		const handleColourFiler = useCallback((value: string[]) => {
			setFilters((prevState) => {
				return {
					...prevState,
					colorList: value,
				};
			});
		}, []);

		const handleSpeedFilterTypeChange = useCallback((value: string) => {
			setFilters((prevState) => {
				return {
					...prevState,
					speedFilterType: value,
				};
			});
		}, []);

		const handleSpeedFilerChange = useCallback((value: number) => {
			setFilters((prevState) => {
				return {
					...prevState,
					speed: value,
				};
			});
		}, []);

		const handleCheckboxChange = useCallback((newValue: boolean) => {
			setFilters((prevState) => {
				return {
					...prevState,
					pulseLaser: newValue,
				};
			});
		}, []);

		const onMfFilterTypeChange = useCallback((newValue: string) => {
			setFilters((prevState) => {
				return {
					...prevState,
					mfdFilterType: newValue,
				};
			});
		}, []);

		const onMfdChange = useCallback((date: Date) => {
			setFilters((prevState) => {
				return {
					...prevState,
					mfDate: date,
				};
			});
		}, []);

		const filterResults = () => {
			store.fetchData(buildFilterUrl());
		};

		const buildFilterUrl = () => {
			return `/spaceships/filter?${
				filters.colorList.length > 0
					? `colour-filter=${
							filters.colorFilterType
					  }&colour=${filters.colorList.toString()}&`
					: ""
			}speed=${filters.speedFilterType}${filters.speed}&mfd=${
				filters.mfdFilterType
			}${filters.mfDate
				?.toISOString()
				.slice(0, 10)}&pulse-laser=${filters.pulseLaser?.toString()}`;
		};

		const clearFilters = () => {
			store.fetchData();
		};

		return (
			<FilterWidgetStyles>
				<FlexRow>
					<ColourFilter
						onColorFilerTypeChange={handleColorFilterTypeChange}
						onColourChange={handleColourFiler}
					/>
					<SpeedFilter
						onSpeedChange={handleSpeedFilerChange}
						onSpeedFilterTypeChange={handleSpeedFilterTypeChange}
					/>
					<ManufactureDateFilter
						onMfFilerTypeChange={onMfFilterTypeChange}
						onMfdChange={onMfdChange}
					/>
					<PluseFilter onCheckboxChange={handleCheckboxChange} />
					<ButtonLayout>
						<button
							onClick={filterResults}
							name="filter"
							value="filter"
						>
							Filter
						</button>
						<button
							onClick={clearFilters}
							name="filter"
							value="filter"
						>
							Clear
						</button>
					</ButtonLayout>
				</FlexRow>
				<FlexRow>
					<p>{buildFilterUrl()}</p>
				</FlexRow>
			</FilterWidgetStyles>
		);
	})
);

const FilterWidgetStyles = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const FlexRow = styled.div`
	padding: 0.5rem;
	display: flex;
	justify-content: space-evenly;
`;

const ButtonLayout = styled.div`
	display: flex;
	flex-direction: column;
	button {
		margin: 0.5rem;
	}

	button:nth-child(2) {
		background-color: gray;
	}
`;
