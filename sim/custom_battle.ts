/**
 * Simulator Battle
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This file is where the battle simulation itself happens.
 *
 * The most important part of the simulation is the event system:
 * see the `runEvent` function definition for details.
 *
 * General battle mechanics are in `battle-actions`; move-specific,
 * item-specific, etc mechanics are in the corresponding file in
 * `data`.
 *
 * @license MIT
 */

import { Battle } from "./battle";

export class CustomBattle extends Battle {
    
    static simulate(battle: Battle, player1Actions: string[], player2Actions: string[]): Battle {
		// Clone the battle object to avoid modifying the original battle
		const clonedBattle = Object.assign(Object.create(Object.getPrototypeOf(battle)), battle);
	
		// Set the actions for each player
		clonedBattle.sides[0].choice.actions = player1Actions;
		clonedBattle.sides[1].choice.actions = player2Actions;
	
		// Commit the choices and simulate the battle
		clonedBattle.commitChoices();
	
		// Return the resulting battle state
		return clonedBattle;
	}
	
}