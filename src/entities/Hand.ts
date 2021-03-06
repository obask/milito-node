import {Card} from "@entities/Card";
import * as util from "util";
import HandDTO from "../milito-shared/game/HandDTO";

export class IHand {
    cards: Array<Card>

    constructor(props: IHand) {
        this.cards = props.cards
    }
}



export default class Hand extends IHand {

    public static makeEmpty(): Hand {
        const tmp: Array<Card> = []
        return new Hand({cards: tmp})
    }

    public push(card: Card): Hand {
        this.cards.push(card)
        return this
    }

    public take_card_by_id(id: number): Card {
        const element = this.cards.filter((card) => card.id === id)[0]
        if (element === undefined) {
            throw new Error("card not found" + id)
        }
        this.cards = this.cards.filter((card) => card.id !== id)
        return element
    }

    toString() {
        return "(LP " + (this.cards.map(x => x.toString()).join(" ")) + " RP)"
    }

    // [util.inspect.custom](depth: number, opts: Object) {
    //     return "(LP " + (this.cards.map(x => util.inspect(x)).join(" ")) + " RP)"
    // }

    toDTO(): HandDTO {
        return new HandDTO({cards: this.cards.map((c) => c.toDTO())})
    }
}
