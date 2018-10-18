import { Injectable } from '@angular/core';
import { Point } from '../point';
import { Subject, Observable, interval } from 'rxjs';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {


  private rabbitPoints: Point[];
  private treesPoints: Point[];

  private rabbits = [];
  private trees = [];
  private terrain;

  private Rabbits: Subject<Point[]> = new Subject<Point[]>();
  private Trees: Subject<Point[]> = new Subject<Point[]>();
  private Terrain: Subject<number> = new Subject<number>();

  constructor(private http: HttpServiceService) {
    interval(300).subscribe(() => {
      this.setTerrain();
      this.setTrees();
      this.setRabbits();
    });
  }

  public getRabbits(): Subject<Point[]> {
    return this.Rabbits;
  }

  public getTrees(): Subject<Point[]> {
    return this.Trees;
  }

  public getTerrain(): Subject<number> {
    return this.Terrain;
  }

  private setTerrain() {
    this.http.getTerrain().subscribe( value => {
      this.terrain = value;
      this.Terrain.next(this.terrain.size);
    });
    
  }

  public getSize() {
    if (this.terrain)
      return this.terrain.size;
    else
      return -1;
  }
  private setTrees() {
    this.http.getTrees().subscribe(value => {
      this.trees = value;
      this.ConvertTrees();
      this.Trees.next(this.treesPoints);
    });
  }

  private setRabbits() {
    this.http.getRabbits().subscribe(value => {
      this.rabbits = value;
      this.ConvertRabbit();
      this.Rabbits.next(this.rabbitPoints);
    });
  }

  private ConvertRabbit() {
    if (this.terrain)
      this.rabbitPoints = this.rabbits.map(r => <Point>{ x: r.location.x, y: r.location.y });

  }

  private ConvertTrees() {
    if (this.terrain)
      this.treesPoints = this.trees.map(r => <Point>{ x: r.location.x, y: r.location.y });
  }
}
