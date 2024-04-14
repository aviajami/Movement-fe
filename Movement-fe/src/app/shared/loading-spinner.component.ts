import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-loading-spinner',
    template: '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div>' +
               '</div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
    styleUrls: [
                './loading-spinner.component.css'
    ]
})
export class LoadingSpinnerComponent {

}
