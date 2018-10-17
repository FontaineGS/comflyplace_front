import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PointsService } from '../../services/points.service';
import { Point } from '../../point';
import { HttpServiceService } from 'src/app/services/http-service.service';
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


  @ViewChild('maincanvas') public canvas: ElementRef;
  public ccontext: CanvasRenderingContext2D;


  ngAfterViewInit() {
    const canvascontext: HTMLCanvasElement = this.canvas.nativeElement;
    this.ccontext = canvascontext.getContext('2d');
    if (this.model) {
      console.log("model is loaded");
      this.model.getRabbits().subscribe(value => { this._pointRabbits = value; this.drawAll(); console.log(value); });
      this.model.getTrees().subscribe(value => { this._pointTrees = value; this.drawAll(); console.log(value); });
    }
  }

  clean() {
    this.ccontext.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private drawPoint(x, y, fillstyle) {
    this.ccontext.fillStyle = fillstyle;
    this.ccontext.fillRect(x, y, 5, 5);
  }

  private drawAll() {
    if (!this._pointRabbits || !this._pointTrees) {
      return;
    }
    this.clean();
    this._pointRabbits.forEach((p) => {
      this.drawPoint(p.x, p.y, "#FF0000");
    });
    this._pointTrees.forEach((p) => {
      this.drawPoint(p.x, p.y, "#0000FF");
    });

  }

}
