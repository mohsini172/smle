import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { SweEncoding } from '../../../model/swe/SweEncoding';

@Component({
    selector: 'swe-encoding',
    template: require('./SweEncodingComponent.html')
})
export class SweEncodingComponent extends TypedModelComponent<SweEncoding> {
    protected createModel(): SweEncoding {
        return undefined;
    }
}
