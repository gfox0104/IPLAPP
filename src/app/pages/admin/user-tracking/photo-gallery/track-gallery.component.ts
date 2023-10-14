import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'track-photo-gallery',
  templateUrl: 'track-gallery.component.html',
  styleUrls: ['track-gallery.component.scss'],
})

export class TrackPhotoGalleryWithEditor implements OnInit {

  @Input() photo;
  @Input() imgCurrentIndex: number;
  @Input() photos: any;
  @Input() isSubmitted: boolean;
  @Output() saveChange = new EventEmitter;

  //--canvas
  canvas: any;
  tempCanvas: any;
  history: Array<any> = []
  //-- mouse pos
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  isDragging: boolean;
  drawText: string;
  //-- rotation
  measuring: boolean = false;
  currentRotation = 0
  //---btn
  NextBtnHide: boolean;
  PrevBtnHide: boolean;
  // -- edit canvas
  editType = 5;
  currentBrightness = 100;
  metadata: any;
  percentage: number = 0;
  length = 0;
  scale = 1;
  prevX = 0;
  prevY = 0;
  moveYAmount = 0;
  moveXAmount = 0;
  isLoading: boolean;
  button: string = 'Save';
  scaleX = 0;
  scaleY = 0;
  draggedLine: boolean;
  inchScale: number = 1;
  calibrated: boolean = false;
  hasCalibratAlert: boolean = false;
  calibrateScale: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.NextBtnHide = this.imgCurrentIndex < this.photos.length - 1 ? false : true;
    this.PrevBtnHide = this.imgCurrentIndex > 0 ? false : true;
    this.canvas = <HTMLCanvasElement>document.getElementById('image-editorr');
    this.tempCanvas = <HTMLCanvasElement>document.createElement("canvas");
    this.tempCanvas.width = "640";
    this.tempCanvas.height = "480";

    this.imageLoad();

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      var rect = this.canvas.getBoundingClientRect();
      this.scaleX = this.canvas.width / rect.width;
      this.scaleY = this.canvas.height / rect.height;
      this.startX = (e.clientX - rect.left) * this.scaleX;
      this.startY = (e.clientY - rect.top) * this.scaleY;
      if (this.editType === 5) {
        this.prevX = 0;
        this.prevY = 0;
      }
      if (this.editType === 6) {
        if (!this.calibrateScale) {
          this.modalService
            .open(this.calibrateModal, { size: "sm", ariaLabelledBy: "modal-basic-title" })
            .result.then(result => { 
              this.hasCalibratAlert = true;
              this.presentScaleContent();
            }, reason => { });
        } else if (!this.calibrated) {
          this.presentScaleContent();
        }
      }
    }, false);

    this.canvas.addEventListener('mouseup', (e) => {
      if (this.isDragging === true) {
        this.isDragging = false;
        if (this.editType === 5) return;
        const ctx = this.tempCanvas.getContext('2d');
        this.endX = e.pageX;
        this.endY = e.pageY;
        if (this.editType === 6) {
          this.draggedLine = true;
        }
        this.drawShape(ctx, e, this.currentRotation);
        this.isDragging = false;

        let image = new Image();
        image.src = this.tempCanvas.toDataURL();
        this.history.push(image);
      }

    }, false);

    this.canvas.addEventListener('mouseleave', () => {
      this.isDragging = false
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.editType === 5 && this.scale < 1) return;
      if (this.isDragging === true) {
        this.drawImage()
        const ctx = this.canvas.getContext('2d');
        if (this.editType === 5) {
          if (this.prevX > 0 || this.prevY > 0) {
            this.moveXAmount += e.pageX - this.prevX;
            this.moveYAmount += e.pageY - this.prevY;
          }
        }
        this.drawShape(ctx, e);
        this.prevX = e.pageX;
        this.prevY = e.pageY;
      }
    }, false);


    this.canvas.addEventListener('wheel', (e) => {
      const ctx = this.canvas.getContext('2d');
      this.isWheel = true;
      e.stopPropagation();
      if (this.editType === 5) {
        this.zoom(e.deltaY < 0 ? true : false);
      }
    }, false);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSubmitted'] && changes['isSubmitted'].currentValue === true) {
      this.isLoading = false;
      this.button = 'Save';
    }
  }

  scaleMultiplier = 0.8;
  currentImage;
  isWheel: boolean;
  horizontalR;
  verticalR;
  imageLoad() {
    this.metadata = this.photos[this.imgCurrentIndex];
    this.photo = this.metadata.User_Track_File_Path;
    const imgDrawn = new Image();
    imgDrawn.crossOrigin = "*";
    imgDrawn.src = this.photo;
    imgDrawn.onload = () => {
      this.currentImage = imgDrawn;
      const ctx = this.tempCanvas.getContext('2d');
      this.scaleToFit(ctx, imgDrawn);
      this.drawImage();
    }
  }

  scaleToFit(ctx, img) {
    let scale;

    if (this.currentRotation % 2 == 0)
      scale = Math.min(this.canvas.width / img.width, this.canvas.height / img.height);
    else
      scale = Math.min(this.canvas.width / img.height, this.canvas.height / img.width);

    var x = (this.canvas.width / 2) - (img.width / 2) * scale;
    var y = (this.canvas.height / 2) - (img.height / 2) * scale;
    if (this.scale == 1) {
      this.moveXAmount = 0;
      this.moveYAmount = 0;
    }
    ctx.drawImage(img, x + this.moveXAmount, y + this.moveYAmount, img.width * scale, img.height * scale);
    if (this.history.length == 0) {
      this.currentImage.src = this.tempCanvas.toDataURL();
      this.history.push(this.currentImage);
    }
  }

  Undo() {
    this.currentRotation = 0;
    this.history = [];
    this.currentBrightness = 100;
    const ctx = this.canvas.getContext('2d');
    ctx.filter = 'brightness(' + this.currentBrightness + '%)';
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    ctx.scale(1 / this.scale, 1 / this.scale);
    ctx.translate(-this.canvas.width / 2, - this.canvas.height / 2);
    this.imageLoad();
    this.scale = 1;
  }

  editImage(type) {
    let ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    switch (type) {
      case 'rotater':
        this.currentRotation++;
        this.currentRotation = this.currentRotation % 4;
        this.drawImage();
        break;
      case 'rotatel':
        this.currentRotation--;
        if (this.currentRotation < 0)
          this.currentRotation = 3;
        this.drawImage();
        break;
      case 'circle':
        this.editType = 1;
        break;
      case 'square':
        this.editType = 2;
        break;
      case 'lighter':
        this.currentBrightness = this.currentBrightness + 5;
        ctx.filter = 'brightness(' + this.currentBrightness + '%)';
        this.drawImage();
        break;
      case 'darker':
        this.currentBrightness = this.currentBrightness - 5;
        ctx.filter = 'brightness(' + this.currentBrightness + '%)';
        this.drawImage();
        break;
      case 'crop':
        this.editType = 0;
        break;
      case 'text':
        this.editType = 3;
        break;
    }
  }

  zoom(zooin: boolean) {
    const ctx = this.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    this.scale = zooin ? this.scale * 1 / this.scaleMultiplier : this.scale * this.scaleMultiplier;
    let scale = zooin ? 1 / this.scaleMultiplier : this.scaleMultiplier;
    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
    this.drawImage();
    this.editType = 5;
  }

  calibrateModal;
  scaleContentModal;
  showMeasure(isMeasuring, askCalibrate?, scaleContent?) {
    this.calibrateModal = askCalibrate;
    this.scaleContentModal = scaleContent;

    this.measuring = isMeasuring;

    if (this.measuring) this.editType = 6;
    else this.editType = 0;

    this.canvas.style.cursor = "crosshair";
  }

  savePixels() {
    
    if (this.calibrateScale !== undefined && this.calibrateScale.match(/^[0-9]+\' ?[0-9]+\"$/)) {
      this.inchScale = parseInt(this.calibrateScale.charAt(0)) * 12 + parseInt(this.calibrateScale.charAt(2));
      
    }
   
  }

  calcSquare() {
    const calc = Math.sqrt(Math.pow(this.startX - this.endX, 2) + Math.pow(this.startY - this.endY, 2)) / this.percentage;
    alert(`Length is ${calc}.`);
  }

  drawImage() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.save()
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
   
    ctx.rotate((Math.PI / 180) * this.currentRotation * 90)
    ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2)

    this.scaleToFit(ctx, this.history[this.history.length - 1]);
    ctx.restore()
  }

  drawShape(ctx, e, rot = null) {
    ctx.save();
    if (rot != null) {
      ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      if (rot % 2 === 1) {
        let scale = this.canvas.width / this.canvas.height;
        ctx.scale(scale, scale)
      }
      ctx.rotate((Math.PI / 180) * (4 - rot) * 90)
      ctx.translate(-this.canvas.width / 2 - this.moveXAmount, -this.canvas.height / 2 - this.moveYAmount)
    }
    if (this.editType === 0) {
      ctx.save();
      ctx.fillStyle = "#000000bb";
      ctx.fillRect(this.startX, this.startY, Math.abs(e.offsetX - this.startX), Math.abs(e.offsetY - this.startY));
      ctx.restore();
    } else if (this.editType === 1) {
      ctx.strokeStyle = "#ff0000";
      ctx.beginPath();
      const w = Math.abs(e.offsetX - this.startX) / 2;
      ctx.arc(this.startX + w, this.startY + w, w, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    } else if (this.editType === 2) {
      ctx.strokeStyle = "#ff0000";
      ctx.strokeRect(this.startX, this.startY, Math.abs(e.offsetX - this.startX), Math.abs(this.startY - e.offsetY));
      ctx.restore();
    } else if (this.editType === 3) {
      ctx.beginPath();
      ctx.fillStyle = "#ff0000";
      ctx.font = `${Math.abs(this.startY - e.offsetY)}px Impact`;
      ctx.fillText(this.drawText, this.startX, e.offsetY);
      ctx.closePath();
      ctx.restore();
    } else if (this.editType === 5) {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      let image = new Image();
      image = this.history[this.history.length - 1];
      ctx.drawImage(image, -this.canvas.width / 2 + this.moveXAmount, -this.canvas.height / 2 + this.moveYAmount, image.width, image.height);
      ctx.restore();
    } else if (this.editType === 6) {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(e.offsetX * this.scaleX, e.offsetY * this.scaleY);
      ctx.strokeStyle = this.draggedLine ? "#FFFF00" : "#ff0000";
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
      if (this.draggedLine) {
        let ctxt = this.canvas.getContext('2d');
        ctxt.strokeStyle = "#FFFF00";
        ctxt.stroke();
        ctxt.closePath();
        ctxt.restore();
        this.drawPolygon(ctx, e);
        this.drawPolygon(ctxt, e);
      }
      this.draggedLine = false;
    }
  }

  drawPolygon(ctx, e) {
    const lastX = e.offsetX * this.scaleX;
    const lastY = e.offsetY * this.scaleY;
    const polygons = [{
      x: this.startX,
      y: this.startY
    }, {
      x: lastX,
      y: lastY
    }];

    polygons.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x + 5 * Math.cos(0), p.y + 5 * Math.sin(0));
      for (var i = 1; i <= 4; i += 1) {
        ctx.lineTo(p.x + 5 * Math.cos(i * 2 * Math.PI / 4), p.y + 5 * Math.sin(i * 2 * Math.PI / 4));
      }
      ctx.strokeStyle = "#FFFF00";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.textBaseline = 'bottom';
    ctx.font = "24px Arial";
    const textY = lastY > this.startY ? this.startY + Math.abs(this.startY - lastY) / 2 : lastY + Math.abs(this.startY - lastY) / 2;

    const distance = Math.sqrt(Math.pow(((lastX - this.startX) / 96), 2) + Math.pow(((lastY - this.startY) / 96), 2));
    let inches:any = (distance * this.inchScale).toFixed(0);
    const feet = Math.floor(inches / 12);
    inches %= 12;
    ctx.fillText(feet + `'` + inches + '"', this.startX + (e.offsetX * this.scaleX - this.startX) / 2, textY);
    ctx.closePath();
    ctx.restore();
  }
  
  nextImag() {
    this.PrevBtnHide = false;
    if (this.imgCurrentIndex < this.photos.length - 1) {
      this.NextBtnHide = false;
      this.imgCurrentIndex++;
      this.Undo();
    } else {
      this.NextBtnHide = true;
    }
  }

  prevImage() {
    this.NextBtnHide = false;
    if (this.imgCurrentIndex > 0) {
      this.PrevBtnHide = false;
      this.imgCurrentIndex--;
      this.Undo();
    } else {
      this.PrevBtnHide = true;
    }
  }

  scaleValid: boolean = true;
  scaleChange() {
    if (this.calibrateScale !== undefined && this.calibrateScale.match(/^[0-9]+\' ?[0-9]+\"$/)) {
      this.inchScale = parseInt(this.calibrateScale.charAt(0)) * 12 + parseInt(this.calibrateScale.charAt(2));
      this.scaleValid = true;
    } else {
      this.scaleValid = false;
      this.calibrateScale = null;
    }
  }

  presentScaleContent() {
    this.modalService
      .open(this.scaleContentModal, { size: "sm", ariaLabelledBy: "modal-basic-title" })
      .result.then(result => { 
        this.calibrated = true;
      }, reason => { 
        //console.log(reason)
      });
  }

  SaveChange() {
    this.isLoading = true;
    this.button = 'Processing...'
    const img = this.canvas.toDataURL();
    this.saveChange.emit(img);
  }
}  
