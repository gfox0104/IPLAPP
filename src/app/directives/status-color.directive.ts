import { Directive, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[statusColor]'
})

export class StatusWithColor implements OnInit {
    @Input() statusName: string;
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes) {
            let color;
            switch (this.statusName) {
                case 'Field Complete':
                    color = '#BDC0ED';
                    break;
                case 'Unassigned':
                    color = '#DAEF56';
                    break;
                case 'Assigned':
                    color = '#FAC39A';
                    break;
                case 'Read':
                    color = '#FAC39A';
                    break;
                case 'Office Approved':
                    color = '#E4C2E5';
                    break;
                case 'Cancelled':
                    color = '#8F8F8F';
                    break;
                case 'Sent to Client':
                    color = '#FCF998';
                    break;
                default:
                    color = 'transparent';
                    break;
            }
    
            this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
        }
    }

    ngOnInit() {
        
    }
}
