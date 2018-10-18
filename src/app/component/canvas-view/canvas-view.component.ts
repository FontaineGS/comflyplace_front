import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PointsService } from '../../services/points.service';
import { Point } from '../../point';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-canvas-view',
  templateUrl: './canvas-view.component.html',
  styleUrls: ['./canvas-view.component.css']
})
export class CanvasViewComponent implements AfterViewInit {

  constructor(private model: ModelService) {
  }

  _pointRabbits: Point[];
  _pointTrees: Point[];
  size = -1;
  X;


  @ViewChild('maincanvas') public canvas: ElementRef;
  public ccontext: CanvasRenderingContext2D;


  ngAfterViewInit() {
    const canvascontext: HTMLCanvasElement = this.canvas.nativeElement;
    this.ccontext = canvascontext.getContext('2d');
    if (this.model) {
      console.log("model is loaded");
      this.model.getRabbits().subscribe(value => {
        this._pointRabbits = value;
        if(this._pointRabbits)
        this._pointRabbits
          .forEach(p => { p.x = p.x * this.X / this.size, p.y = p.y * this.X / this.size })
        this.drawAll();
      });
      this.model.getTrees().subscribe(value => {
        this._pointTrees = value;
        if(this._pointTrees)
        this._pointTrees
          .forEach(p => { p.x = p.x * this.X / this.size, p.y = p.y * this.X / this.size })
        this.drawAll();
      });
      this.model.getTerrain().subscribe(value => {
        this.size = value;
        console.log("drawing");
      });
    }
    this.X = canvascontext.width;

  }

  clean() {
    this.ccontext.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private drawPoint(x, y, fillstyle) {
    this.ccontext.fillStyle = fillstyle;
    this.ccontext.fillRect(x, y, 5, 5);
  }

  private drawAll() {
    if (this.size == -1)
      return;
    if (!this._pointRabbits || !this._pointTrees) {
      return;
    }
    this.clean();


    /* this._pointRabbits
     .forEach(p => {p.x =  p.x*this.X/this.size,  p.y*this.X/this.size})
     this._pointTrees
     .forEach(p => {p.x =  p.x*this.X/this.size,  p.y*this.X/this.size})
 */
    console.log(this.size);
    console.log(this.X);


    this._pointRabbits
      .forEach((po) => {
        this.drawPoint(po.x, po.y, "#FF0000");
      });
    this._pointTrees.forEach((po) => {
      this.drawPoint(po.x, po.y, "#0000FF");
    });

  }

}
