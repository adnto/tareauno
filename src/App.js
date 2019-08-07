import React from 'react';
import styles from './App.module.scss';
import Input from './components/Input/Input';
import Board from './Board/Board';
import Button from './components/Button/Button';
import produce from 'immer/dist/immer';

class App extends React.PureComponent {
	state = {
		cities: {
			title: 'CIUDADES',
			items: [ 'Oaxaca', 'Guadalajara', 'Tijuana', 'Merida' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		},
		drinks: {
			title: 'BEBIDAS',
			items: [ 'Cerveza', 'Tequila', 'Mezcal', 'Vodka' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		},
		friends: {
			title: 'AMIGOS',
			items: [ 'Alexis', 'Mayra', 'Barani', 'Montse' ],
			index: 0,
			input: {
				add: '',
				remove: ''
			}
		}
	};

	onHandleButton = (object) => {
		const nextState = produce(this.state, (draft) => {
			if (draft[object].items.length > draft[object].index + 1) draft[object].index = draft[object].index + 1;
			else draft[object].index = 0;
		});
		this.setState(nextState);
	};

	onAddButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items = draft[property].items.concat(draft[property].input.add);
			draft[property].input.add = '';
		});
		this.setState(nextState);
	};

	onRemoveItem = (index, property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items.splice(index, 1);
		});
		this.setState(nextState);
	};

	onRemoveButtonClick = (property) => {
		const nextState = produce(this.state, (draft) => {
			draft[property].items.splice(draft[property].input.remove - 1, 1);
		});
		this.setState(nextState);
	};

	onAddInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft[property].input.add = value;
		});
		this.setState(nextState);
	};

	onRemoveInputChange = (event, property) => {
		const value = event.target.value;
		const nextState = produce(this.state, (draft) => {
			draft[property].input.remove = value;
		});
		this.setState(nextState);
	};

	render() {
		const { cities, drinks, friends } = this.state;
		return (
			<div>
				<p className={styles.title}>Tarea Uno</p>

				<div className={styles.container_boards}>
					<Board
						object={cities}
						onAddButtonClick={() => this.onAddButtonClick('cities')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('cities')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'cities')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'cities')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'cities')}
					/>
					<Board
						object={drinks}
						onAddButtonClick={() => this.onAddButtonClick('drinks')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('drinks')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'drinks')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'drinks')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'drinks')}
					/>
					<Board
						object={friends}
						onAddButtonClick={() => this.onAddButtonClick('friends')}
						onRemoveButtonClick={() => this.onRemoveButtonClick('friends')}
						onAddInputChange={(event) => this.onAddInputChange(event, 'friends')}
						onRemoveInputChange={(event) => this.onRemoveInputChange(event, 'friends')}
						onRemoveItem={(index) => this.onRemoveItem(index, 'friends')}
					/>
				</div>
				<div>
				<div className={styles.ade}>
					<ul className={styles.ul_total}>
						<li>Cities: {cities.items.length}</li>
					</ul>
				</div>
				<div className={styles.ade}>
					<ul className={styles.ul_total}>
						<li>Drinks: {drinks.items.length}</li>
					</ul>
				</div>
				<div className={styles.ade}>
					<ul className={styles.ul_total}>
						<li>Friends: {friends.items.length}</li>
					</ul>
				</div>
			</div>
			</div>
		);
	}
}

export default App;
