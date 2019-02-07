import {LolModel} from "./lol.model";

export class TeamsModel {
  constructor(public team1: LolModel[],
              public team2: LolModel[]
  ) {
  }
}
