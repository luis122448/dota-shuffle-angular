import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DotaPlayerModel,
  BasicPlayerModel,
  BestShuffleResult,
  TotalCombination,
} from '../model/dota-player.model';

interface Medal {
  [menbersey: number]: number;
}

@Injectable({
  providedIn: 'root',
})
export class DotaPlayerService {
  constructor() {}
}

export class DotaPlayerDataSource {
  static instance: DotaPlayerDataSource;
  data = new BehaviorSubject<DotaPlayerModel[]>([]);
  medal: { [menbersey: number]: number } = {
    1: 0,
    2: 154,
    3: 308,
    4: 462,
    5: 616,
    6: 770,
    7: 924,
    8: 1078,
    9: 1232,
    10: 1386,
    11: 1540,
    12: 1694,
    13: 1848,
    14: 2002,
    15: 2156,
    16: 2310,
    17: 2464,
    18: 2618,
    19: 2772,
    20: 2926,
    21: 3080,
    22: 3234,
    23: 3388,
    24: 3542,
    25: 3696,
    26: 3850,
    27: 4004,
    28: 4158,
    29: 4312,
    30: 4466,
    31: 4620,
    32: 4820,
    33: 5020,
    34: 5220,
    35: 5420,
    36: 5620,
    37: 5820,
    38: 6020,
    39: 99999,
  };
  numberShuffle = 0;

  private onMedal(mmr: number): number {
    for (let i = 1; i <= 38; i++) {
      if (mmr >= this.medal[i] && mmr < this.medal[i + 1]) {
        return i;
      }
    }
    return 0;
  }

  private getCombinations(arr: number[], k: number): number[][] {
    const combinations: number[][] = [];

    function helper(start: number, path: number[]) {
        if (path.length === k) {
            combinations.push([...path]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            helper(i + 1, path);
            path.pop();
        }
    }

    helper(0, []);
    return combinations;
}

  private findBestGroups(arr: number[]): [number[], number[]] {
    const k = arr.length / 2; // Número de jugadores por grupo (5 en este caso)
    const allCombinations = this.getCombinations(arr, k);
    let bestCombination: [number[], number[]] | null = null;
    let minDifference = Infinity;

    for (let i = 0; i < allCombinations.length; i++) {
        const group1 = allCombinations[i];
        const group2 = arr.filter(player => !group1.includes(player));

        const sum1 = group1.reduce((acc, num) => acc + num, 0);
        const sum2 = group2.reduce((acc, num) => acc + num, 0);
        const difference = Math.abs(sum1 - sum2);

        if (difference < minDifference) {
            minDifference = difference;
            bestCombination = [group1, group2];
        }
    }
    return bestCombination!;
}

  constructor() {}

  public static getInstance(): DotaPlayerDataSource {
    if (!DotaPlayerDataSource.instance) {
      DotaPlayerDataSource.instance = new DotaPlayerDataSource();
    }
    return DotaPlayerDataSource.instance;
  }

  public connect(): Observable<DotaPlayerModel[]> {
    return this.data;
  }

  public disconnect() {}

  public onTest(isTest: boolean) {
    if (isTest) {
      this.addPlayer('Player 1', 400);
      this.addPlayer('Player 2', 2600);
      this.addPlayer('Player 3', 1500);
      this.addPlayer('Player 4', 4500);
      this.addPlayer('Player 5', 3780);
      this.addPlayer('Player 6', 780);
      this.addPlayer('Player 7', 578);
      this.addPlayer('Player 8', 2340);
      this.addPlayer('Player 9', 5760);
      this.addPlayer('Player 10', 6700);
    }
  }

  public getPlayers() {
    return this.data.value;
  }

  public getTeam(team: number) {
    return this.data.value.filter((player) => player.team === team);
  }

  public addPlayer(name: string, mmr: number) {
    if (this.data.value.length >= 10) {
      throw new Error('No se pueden agregar más de 10 jugadores');
    }
    const maxId = this.data.value.reduce(
      (max, player) => (player.id > max ? player.id : max),
      0
    );
    const player: DotaPlayerModel = {
      id: maxId + 1,
      label: `${name} - ${mmr}`,
      name: name,
      mmr: Number(mmr),
      team: 0,
      medal: `${this.onMedal(mmr)}.png`,
    };
    this.data.value.push(player);
  }

  public editPlayer(id: number, name: string, mmr: number) {
    const players = this.data.value.map((player) => {
      if (player.id === id) {
        player.name = name;
        (player.mmr = Number(mmr)), (player.label = `${name} - ${mmr}`);
        player.medal = `${this.onMedal(mmr)}.png`;
      }
      return player;
    });
    this.data.next(players);
  }

  public movePlayer(id: number, team: number) {
    const players = this.data.value.map((player) => {
      if (player.id === id) {
        player.team = team;
      }
      return player;
    });
    this.data.next(players);
  }

  public deletePlayer(id: number) {
    const players = this.data.value.filter((player) => player.id !== id);
    this.data.next(players);
  }

  public deleteAll() {
    this.data.next([]);
  }

  public onShuffle() {
    const players = this.data.value;
    // if(this.numberShuffle === 3) {
    //   throw new Error('No se pueden hacer más de 3 shuffle');
    // } else {
    //   this.numberShuffle++;
    // }
    if (players.length !== 10) {
      throw new Error('Debe haber exactamente 10 jugadores');
    }
    const plarysMmr = players.map((player) => player.mmr);
    const bestCombinatiosMmr = this.findBestGroups(plarysMmr);
    console.log('Mejores combinaciones de MMR: ', bestCombinatiosMmr);
    // Asignando el Team 1 y Team 2
    players.forEach((player) => {
      player.team = bestCombinatiosMmr[0].includes(player.mmr) ? 1 : 2;
    });
    this.data.next(players);
  }

  public onReset() {
    const players = this.data.value.map((player) => {
      player.team = 0;
      return player;
    });
    this.data.next(players);
  }

  public getTotal(team: number): number {
    const total = this.getTeam(team).reduce(
      (total, player) => total + player.mmr,
      0
    );
    console.log('Total del equipo ' + team + ' es: ' + total);
    return total;
  }
}
