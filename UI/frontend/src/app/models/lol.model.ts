export class LolModel {
  constructor(public id: number,
              public name: string,
              public wins: number,
              public losses: number,
              public division: string,
              public points: number,
              public mostUsedChamps: string,
              public kills: number,
              public deaths: number,
              public assists: number,
  ) {
  }
}
