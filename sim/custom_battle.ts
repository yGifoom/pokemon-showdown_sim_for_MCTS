import { Battle } from "./battle";
import * as fs from "fs";

export class CustomBattle{
    
    static simulate(playerActions: string[]): Battle {
		const jsonString = fs.readFileSync('./simulator_buffer/battle.json', 'utf-8');
		// Clone the battle object to avoid modifying the original battle
		const battle = Battle.fromJSON(jsonString);
		if (playerActions.length > 1){
					// Set the actions for each player
					// moves are 1-6 for pokemon and 1-4 for moves
					// everytime order changes, use names

					// when a switch is required format moves like so: ,switch palkia
					// in this case p2 used uturn earlier, and now switches out to palkia
					// p1 just needs to pass an empty string.
					// but when both pokemon faint for esample both have to issue a switch order.
					// 
			battle.makeChoices(playerActions[0], playerActions[1]);
			// if all goes well it also commits the choices and simulate the battle
		}
		else if (playerActions.length === 1) {
			battle.makeChoices(playerActions[0]);
		}
		else{
			console.log("No actions taken, shouldn't happen");
		}
		// Return the resulting battle state
		return battle;
	}

	static write_down(): void {
		const moves = fs.readFileSync('./simulator_buffer/moves.txt','utf8');
		const battle = this.simulate(moves.split(","));
		const towrite = battle.toJSON();

		var util = require('util');
		fs.writeFileSync('./simulator_buffer/new_battle.json', JSON.stringify(towrite, null, 2) , 'utf-8'); //
	} 
	
}
CustomBattle.write_down()
console.log("FINALLY DONE")