import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PointsService } from '../../services/points.service';
import { Point } from '../../point';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.css']
})
export class CanvasViewComponent implements AfterViewInit {

  constructor(private pointService: PointsService) {


  }


  _points : Point[];
  _points2 : Point[];

  @ViewChild('maincanvas') public canvas: ElementRef;
  public ccontext: CanvasRenderingContext2D;


  ngAfterViewInit() {
    this._points = this.pointService.getPoints();
    this.pointService.getPoints0().subscribe(
      (x) =>
      {
        this._points2 = x;
        this.drawAll();
      }
    )
    const canvascontext: HTMLCanvasElement = this.canvas.nativeElement;
    this.ccontext = canvascontext.getContext('2d');
    this.drawAll();
  }


  shake() {
   // this.pointService.shakePoints();
    //this.drawAll();
  }


  clean() {
    this.ccontext.clearRect(0,0,this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }
  public drawPoint(x, y, fillstyle) {

    this.ccontext.fillStyle = fillstyle;
    this.ccontext.fillRect(x, y, 5, 5);
  }

  public drawAll() {
    if (!this._points || !this._points2) {
      return;
    }
    this.clean();
    this._points.forEach((p) => {
      this.drawPoint(p.x, p.y, "#FF0000");
    });
    this._points2.forEach((p) => {
      this.drawPoint(p.x, p.y, "#0000FF");
    });

  }
}
