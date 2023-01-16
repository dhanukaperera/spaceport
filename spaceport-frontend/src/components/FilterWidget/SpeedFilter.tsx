import { useState, useCallback } from "react";
import styled from "styled-components";

interface SpeedFilterProps {
	onSpeedFilterTypeChange(value: string): void;
	onSpeedChange(value: number): void;
}

export const SpeedFilter: React.FC<SpeedFilterProps> = ({
	onSpeedFilterTypeChange,
	onSpeedChange,
}) => {
	const [speedFilerType, setSpeedFilerType] = useState<string>("lt");
	const [speed, setSpeed] = useState<number>(50);

	const handleSpeedTypeChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onSpeedFilterTypeChange(event.target.value);
			setSpeedFilerType(event.target.value);
		},
		[onSpeedFilterTypeChange]
	);

	const handleSpeedChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onSpeedChange(parseInt(event.target.value));
			setSpeed(parseInt(event.target.value));
		},
		[onSpeedChange]
	);

	return (
		<SpeedFilterStyle>
			<FlexRow>
				<label>Speed Filter (50 - 200) : </label>

				<select
					value={speedFilerType}
					onChange={handleSpeedTypeChange}
					name="speed-filter"
					id="speed-filter"
				>
					<option value="lt">Less than</option>
					<option value="gt">More than</option>
					<option value="eq">Exactly</option>
				</select>
			</FlexRow>
			<FlexRow>
				<input
					value={speed}
					onChange={handleSpeedChange}
					id="speed"
					name="speed"
					type="number"
					min="50"
					max="200"
				/>
			</FlexRow>
		</SpeedFilterStyle>
	);
};

const SpeedFilterStyle = styled.div`
	display: flex;
	flex-direction: column;
`;

const FlexRow = styled.div`
	padding: 0.5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;
