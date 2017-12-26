import { Component } from '@angular/core';
import { TestService } from './test.service';
@Component({
    selector: 'test',
    template: '<router-outlet></router-outlet>',
    providers: [TestService]
})
export class TestComponent { }