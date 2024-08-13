import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DotaPlayerModel } from '../model/dota-player.model';
import { DefaultValuesService } from './default-values.service';

interface Medal {
  [menbersey: number]: number;
}

@Injectable({
  providedIn: 'root',
})
export class DotaPlayerService {
  constructor(defaultValuesService: DefaultValuesService) {}
}

export class DotaPlayerDataSource {
  static instance: DotaPlayerDataSource;
  data = new BehaviorSubject<DotaPlayerModel[]>([]);
  group0 = new BehaviorSubject<DotaPlayerModel[]>([]);
  group1 = new BehaviorSubject<DotaPlayerModel[]>([]);
  group2 = new BehaviorSubject<DotaPlayerModel[]>([]);

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
    37: 9000,
    38: 10000,
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

  private findBestGroups(
    arr: number[],
    grup1: number[],
    grup2: number[]
  ): [number[], number[]] {
    // Cantidad de jugadores que necesitamos agregar a cada grupo
    const numPlayersToAddToGroup1 = 5 - grup1.length;

    // Generar todas las combinaciones posibles de jugadores no asignados
    const allCombinations = this.getCombinations(arr, numPlayersToAddToGroup1);

    let bestCombination: [number[], number[]] | null = null;
    let minDifference = Infinity;

    for (let i = 0; i < allCombinations.length; i++) {
      const additionalGroup1 = allCombinations[i];
      const additionalGroup2 = arr.filter(
        (player) => !additionalGroup1.includes(player)
      );

      const newGroup1 = [...grup1, ...additionalGroup1];
      const newGroup2 = [...grup2, ...additionalGroup2];

      const sum1 = newGroup1.reduce((acc, num) => acc + num, 0);
      const sum2 = newGroup2.reduce((acc, num) => acc + num, 0);
      const difference = Math.abs(sum1 - sum2);

      if (difference < minDifference) {
        minDifference = difference;
        bestCombination = [newGroup1, newGroup2];
      }
    }

    return bestCombination!;
  }

  private findSecondBestShuffle(
    arr: number[],
    grupo1: number[],
    grupo2: number[]
  ): [number[], number[]] {
    // Número de jugadores a añadir a grupo1 para completar 5 jugadores
    const numPlayersToAddToGroup1 = 5 - grupo1.length;

    // Generar todas las combinaciones posibles de jugadores no asignados
    const allCombinations = this.getCombinations(arr, numPlayersToAddToGroup1);

    let bestCombination: [number[], number[]] | null = null;
    let minDifference = Infinity;
    let secondBestCombination: [number[], number[]] | null = null;
    let secondMinDifference = Infinity;

    for (let i = 0; i < allCombinations.length; i++) {
      const additionalGroup1 = allCombinations[i];
      const additionalGroup2 = arr.filter(
        (player) => !additionalGroup1.includes(player)
      );

      const newGroup1 = [...grupo1, ...additionalGroup1];
      const newGroup2 = [...grupo2, ...additionalGroup2];

      const sum1 = newGroup1.reduce((acc, num) => acc + num, 0);
      const sum2 = newGroup2.reduce((acc, num) => acc + num, 0);
      const difference = Math.abs(sum1 - sum2);

      if (difference < minDifference) {
        secondMinDifference = minDifference;
        minDifference = difference;
        secondBestCombination = bestCombination;
        bestCombination = [newGroup1, newGroup2];
      } else if (
        difference < secondMinDifference &&
        difference !== minDifference
      ) {
        secondMinDifference = difference;
        secondBestCombination = [newGroup1, newGroup2];
      }
    }

    return secondBestCombination!;
  }

  private findTerceBestShuffle(
    arr: number[],
    grupo1: number[],
    grupo2: number[]
  ): [number[], number[]] {
    // Número de jugadores a añadir a grupo1 para completar 5 jugadores
    const numPlayersToAddToGroup1 = 5 - grupo1.length;

    // Generar todas las combinaciones posibles de jugadores no asignados
    const allCombinations = this.getCombinations(arr, numPlayersToAddToGroup1);

    let bestCombination: [number[], number[]] | null = null;
    let minDifference = Infinity;
    let secondBestCombination: [number[], number[]] | null = null;
    let secondMinDifference = Infinity;
    let terceBestCombination: [number[], number[]] | null = null;
    let terceMinDifference = Infinity;

    for (let i = 0; i < allCombinations.length; i++) {
      const additionalGroup1 = allCombinations[i];
      const additionalGroup2 = arr.filter(
        (player) => !additionalGroup1.includes(player)
      );

      const newGroup1 = [...grupo1, ...additionalGroup1];
      const newGroup2 = [...grupo2, ...additionalGroup2];

      const sum1 = newGroup1.reduce((acc, num) => acc + num, 0);
      const sum2 = newGroup2.reduce((acc, num) => acc + num, 0);
      const difference = Math.abs(sum1 - sum2);

      if (difference < minDifference) {
        terceMinDifference = secondMinDifference;
        secondMinDifference = minDifference;
        minDifference = difference;
        terceBestCombination = secondBestCombination;
        secondBestCombination = bestCombination;
        bestCombination = [newGroup1, newGroup2];
      } else if (
        difference < secondMinDifference &&
        difference !== minDifference
      ) {
        terceMinDifference = secondMinDifference;
        secondMinDifference = difference;
        terceBestCombination = secondBestCombination;
        secondBestCombination = [newGroup1, newGroup2];
      } else if (
        difference < terceMinDifference &&
        difference !== secondMinDifference
      ) {
        terceMinDifference = difference;
        terceBestCombination = [newGroup1, newGroup2];
      }
    }

    return terceBestCombination!;
  }

  public getTotalTopPlayers(topMMR: number): number {
    const players = this.data.value;
    const totalTopPlayers = players.reduce((total, player) => {
      if (player.mmr >= topMMR) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);
    return totalTopPlayers;
  }

  public getTotalMMRPlayers(): number {
    const players = this.data.value;
    const totalMMRPlayers = players.reduce(
      (total, player) => total + player.mmr,
      0
    );
    return totalMMRPlayers;
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

  public getTeam1() {
    return this.group1.value;
  }

  public getTeam2() {
    return this.group2.value;
  }

  public isPlayerIdInTeam(id: number){
    return !this.group0.value.some(player => player.id === id)
  }

  public setPlayers(players: DotaPlayerModel[]) {
    this.data.next(players);
    this.group0.next(players);
  }

  public countPlayersNotInTeam() {
    const countPlayersNotInTeam = this.data.value.filter(
      (player) => player.team === 0
    ).length;
    return countPlayersNotInTeam;
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
      medal: `${this.onMedal(mmr)}.webp`,
    };
    this.data.value.push(player);
    this.group0.value.push(player);
  }

  public editPlayer(id: number, name: string, mmr: number) {
    const players = this.data.value.map((player) => {
      if (player.id === id) {
        player.name = name;
        (player.mmr = Number(mmr)), (player.label = `${name} - ${mmr}`);
        player.medal = `${this.onMedal(mmr)}.webp`;
      }
      return player;
    });
    this.data.next(players);
    this.group0.next(players);
  }

  public movePlayer(id: number, team: number) {
    if (this.countPlayersNotInTeam() > 0) {
      switch (team) {
        case 0:
          // Remove player, for group 1 or group 2
          this.group1.next(
            this.group1.value.filter((player) => player.id !== id)
          );
          this.group2.next(
            this.group2.value.filter((player) => player.id !== id)
          );
          // Add player to group 0, to
          this.group0.value.push(
            this.data.value.find((player) => player.id === id)!
          );
          break;
        case 1:
          // Remove player, for group 0 or group 2
          this.group0.next(
            this.group0.value.filter((player) => player.id !== id)
          );
          this.group2.next(
            this.group2.value.filter((player) => player.id !== id)
          );
          // Add player to group 1
          this.group1.value.push(
            this.data.value.find((player) => player.id === id)!
          );
          break;
        case 2:
          // Remove player, for group 0 or group 1
          this.group0.next(
            this.group0.value.filter((player) => player.id !== id)
          );
          this.group1.next(
            this.group1.value.filter((player) => player.id !== id)
          );
          // Add player to group 2
          this.group2.value.push(
            this.data.value.find((player) => player.id === id)!
          );
          break;
        default:
          break;
      }
    }
    const players = this.data.value.map((player) => {
      if (player.id === id) {
        player.team = team;
      }
      return player;
    });
    // Recalcular el maxSoloMmr de cada equipo
    const team1 = this.getTeam(1);
    const team2 = this.getTeam(2);
    const maxSoloMmrTeam1 = Math.max(...team1.map((player) => player.mmr));
    const maxSoloMmrTeam2 = Math.max(...team2.map((player) => player.mmr));
    players.forEach((player) => {
      player.maxSoloMmr =
        player.mmr === maxSoloMmrTeam1 || player.mmr === maxSoloMmrTeam2;
    });
    this.data.next(players);
  }

  public deletePlayer(id: number) {
    const players = this.data.value.filter((player) => player.id !== id);
    this.data.next(players);
    this.group0.next(players);
  }

  public deleteAll() {
    this.data.next([]);
    this.group0.next([]);
    this.group1.next([]);
    this.group2.next([]);
  }

  public onShuffle() {
    const players = this.data.value;
    const group0 = this.group0.value;
    const group1 = this.group1.value;
    const group2 = this.group2.value;
    if (group0.length + group1.length + group2.length !== 10) {
      throw new Error('Error, Then number of players must be 10!');
    }
    const group0Mmr = group0.map((player) => player.mmr);
    console.log('MMR del grupo 0: ', group0Mmr);
    const group1Mmr = group1.map((player) => player.mmr);
    console.log('MMR del grupo 1: ', group1Mmr);
    const group2Mmr = group2.map((player) => player.mmr);
    console.log('MMR del grupo 2: ', group2Mmr);
    let bestCombinatiosMmr: [number[], number[]] = [[], []];
    if (this.numberShuffle === 0) {
      bestCombinatiosMmr = this.findBestGroups(group0Mmr, group1Mmr, group2Mmr);
      this.numberShuffle++;
    } else if (this.numberShuffle === 1) {
      bestCombinatiosMmr = this.findSecondBestShuffle(
        group0Mmr,
        group1Mmr,
        group2Mmr
      );
      this.numberShuffle++;
    } else {
      bestCombinatiosMmr = this.findTerceBestShuffle(
        group0Mmr,
        group1Mmr,
        group2Mmr
      );
      this.numberShuffle = 0;
    }
    console.log('Mejores combinaciones de MMR: ', bestCombinatiosMmr);
    // console.log('Mejores combinaciones de MMR: ', bestCombinatiosMmr);
    // Asignando el Team 1 y Team 2
    players.forEach((player) => {
      player.team = bestCombinatiosMmr[0].includes(player.mmr) ? 1 : 2;
      // Aignar el MaxSoloMmr al jugador con el mayor mmr de cada equipo
      player.maxSoloMmr =
        player.mmr === Math.max(...bestCombinatiosMmr[0]) ||
        player.mmr === Math.max(...bestCombinatiosMmr[1]);
    });
    this.data.next(players);
  }

  public onReset() {
    const players = this.data.value.map((player) => {
      player.team = 0;
      player.maxSoloMmr = false;
      return player;
    });
    this.data.next(players);
    this.group0.next(players);
    this.group1.next([]);
    this.group2.next([]);
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
