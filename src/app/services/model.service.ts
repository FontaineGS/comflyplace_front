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


  private Rabbits: Subject<Point[]> = new Subject<Point[]>();
  private Trees: Subject<Point[]> = new Subject<Point[]>();


  constructor(private http: HttpServiceService) {
    interval(100).subscribe(() => {
      this.setTrees();
      this.setRabbits();
    });
  }

  public getRabbits() : Subject<Point[]>
  {
    return this.Rabbits;
  }

  public getTrees() : Subject<Point[]>
  {
    return this.Trees;
  }
  

  private setTrees() {
      this.http.getTrees().subscribe( value => {
      this.trees = value;
      this.ConvertTrees();
      this.Trees.next(this.treesPoints);
    });
  }

  private setRabbits(){
     this.http.getRabbits().subscribe( value => {
      this.rabbits = value;
      this.ConvertRabbit();
      this.Rabbits.next(this.rabbitPoints);
    });
  }

  private ConvertRabbit()
  {
    this.rabbitPoints = this.rabbits.map(r =>  <Point>{x :  r.location.x,y : r.location.y });
  }

  private ConvertTrees()
  {
    this.treesPoints = this.trees.map(r =>  <Point>{x :  r.location.x,y : r.location.y });
  }
}
