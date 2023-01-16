import { useState, useEffect, memo } from "react";
import styled from "styled-components";

interface ColourFilterProps {
	onColorFilerTypeChange(value: string): void;
	onColourChange(value: string[]): void;
}

interface CheckboxProps {
	item: string;
	index: number;
}

const colours = ["red", "green", "blue"];

export const ColourFilter: React.FC<ColourFilterProps> = ({
	onColorFilerTypeChange,
	onColourChange,
}) => {
	const [colorFilterType, setColorFilterType] = useState<string>("all");
	const [selectedColours, setSelectedColours] = useState<string[]>([]);

	useEffect(() => {
		onColourChange(selectedColours);
	}, [selectedColours, onColourChange]);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const selectedItem = event.target.value;
		if (event.target.checked) {
			setSelectedColours((prevItems) => [...prevItems, selectedItem]);
		} else {
			setSelectedColours((prevItems) =>
				prevItems.filter((item) => item !== selectedItem)
			);
		}
	};

	const Checkbox: React.FC<CheckboxProps> = memo(({ item, index }) => (
		<span key={index}>
			<input
				type="checkbox"
				value={item}
				onChange={handleCheckboxChange}
				checked={selectedColours.some(
					(selectedItem) => selectedItem === item
				)}
			/>
			<label>{item}</label>
		</span>
	));

	return (
		<ColourFilterStyles>
			<FlexRow>
				<label>Colour Filter : </label>

				<select
					value={colorFilterType}
					onChange={(e) => {
						onColorFilerTypeChange(e.target.value);
						setColorFilterType(e.target.value);
					}}
					name="colour-filter"
					id="colour-filter"
				>
					<option value="all">All Selected Colours</option>
					<option value="any">Any Selected Colours</option>
					<option value="none">None of Selected</option>
				</select>
			</FlexRow>

			<FlexRow>
				{colours.map((item, index) => (
					<Checkbox key={index} item={item} index={index} />
				))}
			</FlexRow>
		</ColourFilterStyles>
	);
};

const FlexRow = styled.div`
	padding: 0.5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const ColourFilterStyles = styled.div`
	display: flex;
	flex-direction: column;
`;
