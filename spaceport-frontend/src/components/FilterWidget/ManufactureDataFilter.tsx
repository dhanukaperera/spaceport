import { useState, useCallback } from "react";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";

interface MfDateFilterProps {
	onMfFilerTypeChange(value: string): void;
	onMfdChange(value: Date): void;
}

export const ManufactureDateFilter: React.FC<MfDateFilterProps> = ({
	onMfFilerTypeChange,
	onMfdChange,
}) => {
	const [mfd, setMfd] = useState<Date>(new Date());
	const [mfDateFilterType, setMfDateFilterType] = useState<string>("af");

	const handleMfdFilterChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			onMfFilerTypeChange(event.target.value);
			setMfDateFilterType(event.target.value);
		},
		[onMfFilerTypeChange]
	);

	const handleMfdChange = useCallback(
		(date: Date) => {
			setMfd(date);
			onMfdChange(date);
		},
		[onMfdChange]
	);

	return (
		<MFDFilterStyles>
			<FlexRow>
				<label>Manufacture Date Filter (1980 - 2020) :</label>
			</FlexRow>
			<FlexRow>
				<select
					value={mfDateFilterType}
					onChange={handleMfdFilterChange}
					name="manufacture-data-filter"
					id="manufacture-data-filter"
				>
					<option value="af">After</option>
					<option value="bf">Before </option>
					<option value="ex">Exact</option>
				</select>
				<ReactDatePicker
					wrapperClassName="datePicker"
					selected={mfd}
					onChange={handleMfdChange}
				/>
			</FlexRow>
		</MFDFilterStyles>
	);
};

const FlexRow = styled.div`
	padding: 0.5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const MFDFilterStyles = styled.div`
	display: flex;
	flex-direction: column;
`;
