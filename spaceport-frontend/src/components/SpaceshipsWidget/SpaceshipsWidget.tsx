import { SpaceshipStore } from "../../store";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import { SpaceshipCard } from "./SpaceshipCard";
import styled from "styled-components";

interface InjectedStoreProps {
	store: SpaceshipStore;
}

export const SpaceshipWidget: React.FC<InjectedStoreProps> = inject("store")(
	observer(({ store }) => {
		useEffect(() => {
			store.fetchData();
		}, []);
		return (
			<SpaceshipWidgetStyles>
				{store.data ? (
					store.data.map((item) => (
						<SpaceshipCard key={item.id} {...item} />
					))
				) : (
					<div>Loading...</div>
				)}
			</SpaceshipWidgetStyles>
		);
	})
);

const SpaceshipWidgetStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
