import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "signature-pad",
  templateUrl: "./signature.component.html",
  styleUrls: ["./signature.component.css"],
})
export class SignatureComponent implements AfterViewInit, OnChanges {
  @Input() clearTrigger: any;
  @Input() base64Image: any;
  @Output() outputFile = new EventEmitter();
  @ViewChild("canvas", { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  isShow: boolean = false;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")!;
    canvas.addEventListener("mousedown", this.startDraw);
    canvas.addEventListener("mousemove", this.draw);
    canvas.addEventListener("mouseup", this.endDraw);
    canvas.addEventListener("mouseout", this.endDraw);

    canvas.addEventListener("touchstart", this.startDraw, { passive: false });
    canvas.addEventListener("touchmove", this.draw, { passive: false });
    canvas.addEventListener("touchend", this.endDraw);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["base64Image"]) {
      this.showFile();
    }
    if (changes["clearTrigger"]) {
      this.clear();
    }
  }

  showFile() {
    if (!this.base64Image) return;

    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    const ctx = canvasEl.getContext("2d");

    const img = new Image();
    img.onload = () => {
      // Bersihkan canvas dulu
      ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Gambar image baru
      ctx?.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
    };
    img.src = this.base64Image;
  }

  private getPos = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    if (e instanceof MouseEvent) {
      return { x: e.offsetX, y: e.offsetY };
    } else {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
  };

  private startDraw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const pos = this.getPos(e);
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  };

  private draw = (e: MouseEvent | TouchEvent) => {
    if (!this.drawing) return;
    e.preventDefault();
    const pos = this.getPos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
    this.outputFile.emit(this.canvasRef.nativeElement.toDataURL("image/png"));
  };

  private endDraw = () => {
    this.drawing = false;
    this.ctx.closePath();
  };

  clear() {
    this.outputFile.emit("");
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  save() {
    this.outputFile.emit(this.canvasRef.nativeElement.toDataURL("image/png"));
  }

  show() {
    this.isShow = !this.isShow;
    const canvas = this.canvasRef.nativeElement;
    if (this.isShow) {
      canvas.style.display = "block";
    } else {
      canvas.style.display = "none";
    }
  }
}
