import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core'

@Component({
  selector: 'download-button',
  template: `
        <a style="color: black;"  href="javascript:void(0)"
          (click)="click()"><i class="fas fa-cloud-download-alt"></i>
          <span>{{button}}</span><i class="fas fa-spinner fa-pulse"></i>
         </a>
      `,
  styles: [`
    .isDisabled {
      pointer-events: none;
    }
  `]
})

export class DownLoadButton extends Component {
  @Input() isDownloaded: boolean
  @Output() onClick = new EventEmitter();
  isDownloading: boolean = false;
  button: string = 'Download'

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDownloaded'] && changes['isDownloaded'].currentValue === true) {
      this.isDownloading = false;
      this.button = 'Download'
    }
  }

  click() {
    this.isDownloading = true
    this.button = 'Downloading'
    this.onClick.emit();
  }
}