import { Injectable } from '@angular/core';
import { Point } from '../point';
import { Observable, Subject } from 'rxjs'
import { timer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PointsService {

  public points: Point[];
  public points2: Point[];
  private MAXX = 600;
  private MAXY = 600;


  public ObsPoint2: Subject<Point[]> = new Subject<Point[]>();

  constructor() {
    this.generatePoints();

    timer(200, 40).subscribe(
      () => {
        this.shakePoints();
        this.ObsPoint2.next(this.points2);
      }
    );
  }

  private shakePoint(point: Point) {
    let angle = Math.random() * 2 * Math.PI;
    point.x += 1 * Math.cos(angle);
    point.y += 1 * Math.sin(angle);
  }

  public shakePoints() {
    this.points2.map(x => this.shakePoint(x));
  }

  getPoints() {
    return this.points;
  }

  getPoints0() {
    if (this.ObsPoint2)
      return this.ObsPoint2.asObservable();
    return null;
  }

  private generatePoints() {
    this.points = [];
    for (let i = 0; i < 100; i++) {
      let x, y: number;
      x = this.getRandomInt(0, this.MAXX);
      y = this.getRandomInt(0, this.MAXY);

      let point: Point = { x, y };

      this.points.push(point);


    }
    this.points2 = this.points.map(x => Object.assign({}, x));
  }

  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
