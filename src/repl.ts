import initialSetup from "@config/initialSetup";
import * as util from "util";
import {draw_cards, initiate_attack, nextState, place_a_unit, withdraw_from_battle} from "@config/gameActions";
import PlaceUnitEvent from "./milito-shared/events/PlaceUnitEvent";
import InitiateAttackEvent from "./milito-shared/events/InitiateAttackEvent";
import DefenderWithdrawsEvent from "./milito-shared/events/DefenderWithdrawsEvent";
import * as yaml from "js-yaml"
import * as fs from "fs";

const config = yaml.load(fs.readFileSync('milito-config/decks/AncientBritish.yaml', 'ascii'))
const indentedJson = JSON.stringify(config, null, 4)
console.log(indentedJson);

throw new DOMException()


let state = initialSetup()

console.log(util.inspect(state, {depth: 7, colors: true, maxArrayLength: 9}))

state = nextState(state)

state = place_a_unit(state, new PlaceUnitEvent({
    discarded_cards: [7, 27],
    selected_card: 10,
    selected_column: 3,
    selected_row: 1,
}))

state = place_a_unit(state, new PlaceUnitEvent({
    discarded_cards: [],
    selected_card: 29,
    selected_column: 4,
    selected_row: 1,
}))

// state = place_a_unit(state, new PlaceUnitEvent({
//     discarded_cards: [],
//     selected_card : 23,
//     selected_column : 4,
//     selected_row : 2,
// }))

state = draw_cards(state)

state = nextState(state)

state = place_a_unit(state, new PlaceUnitEvent({
    discarded_cards: [],
    selected_card: 13,
    selected_column: 4,
    selected_row: 1,
}))

state = place_a_unit(state, new PlaceUnitEvent({
    discarded_cards: [],
    selected_card: 17,
    selected_column: 4,
    selected_row: 2,
}))


state = initiate_attack(state, new InitiateAttackEvent({
    bonus_card_id: undefined,
    selected_column: 4,
    selected_row: 2,
}))


// state = choose_defender(state, new ChooseDefenderEvent({
//     bonus_card_id: 0,
//     is_bonus_card_used: true,
//     selected_row: 0
// }))

state = withdraw_from_battle(state, new DefenderWithdrawsEvent())

state = draw_cards(state)
state = nextState(state)


// console.log(util.inspect(state, {depth: 7, colors: true, maxArrayLength: 9}))

console.log(util.inspect(state.toDTO(), {depth: 7, colors: true, maxArrayLength: 9}))
