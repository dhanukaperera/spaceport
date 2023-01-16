import { Spaceship } from "../../models/Spaceship";
import React from "react";
import styled from "styled-components";

import { memo } from "react";

export const SpaceshipCard: React.FC<Spaceship> = memo(
	({ id, colour, mfd, speed, pulseLaser }) => {
		return (
			<SpaceshipCardStyles color={colour}>
				<p>id : {id}</p>
				<p>colour : {colour}</p>
				<p> mfd : {new Date(mfd).toISOString().slice(0, 10)}</p>
				<p>speed : {speed}</p>
				<p>pulseLaser : {pulseLaser.toString()}</p>
			</SpaceshipCardStyles>
		);
	}
);

interface SpaceshipCardStylesProps {
	color?: string;
}

const SpaceshipCardStyles = styled.div<SpaceshipCardStylesProps>`
	display: flex;
	flex-direction: row;
	padding: 0.5rem;
	border: 1px solid ${(props) => props.color};
	margin: 0.5rem;
	justify-content: center;
	border-radius: 0.5rem;
	width: 600px;
	p {
		margin: 0.5rem;
	}
`;
