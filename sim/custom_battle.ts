import { Battle } from "./battle";
import { State } from "./state"

export class CustomBattle{
    
    static simulate(playerActions: string[], battle: Battle): Battle {
		try{
			// Clone the battle object to avoid modifying the original battle
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
		} catch (error) {
			console.error('returning old state, Error simulating battle:', error);
			return battle
		}
	}	
}


// Read input from stdin
process.stdin.setEncoding('utf-8');

let inputData = '';

process.stdin.on('data', (chunk) => {
    inputData += chunk;
});

process.stdin.on('end', () => {
    try {

        const lines = inputData.split('\n').filter(line => line.trim() !== '');

        if (lines.length < 2) {
            throw new Error('Expected at least two lines of input (command and JSON).');
        }
		else if (lines.length > 2) {
            throw new Error('Expected no more than two lines of input (command and JSON).');
        }

		const moves = lines[0]
        // Parse the JSON string into a JavaScript object
        const battleData: Battle = Battle.fromJSON(lines[1]);
        
        // Process the battle data
        const new_state = CustomBattle.simulate(moves.split(","), battleData);
        // Convert the processed data back to a JSON string
        const outputData = JSON.stringify(new_state.toJSON());
        
        // Write the output data to stdout
        process.stdout.write(outputData);
    } catch (error) {
        console.error('Error processing data:', error);
    }
});