import { useCallback } from "react";

interface PluseFilterProps {
	onCheckboxChange(value: boolean): void;
}

export const PluseFilter: React.FC<PluseFilterProps> = ({
	onCheckboxChange,
}) => {
	const handleCheckboxChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			onCheckboxChange(event.target.checked);
		},
		[onCheckboxChange]
	);

	return (
		<div>
			<span>
				<input
					type="checkbox"
					id="pulse-laser"
					name="pulse-laser"
					defaultChecked={false}
					onChange={handleCheckboxChange}
					aria-label="space ship has pulse laser"
				/>
				<label htmlFor="pulse-laser">Has Pulse Laser</label>
			</span>
		</div>
	);
};
