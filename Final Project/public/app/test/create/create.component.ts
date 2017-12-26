import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
@Component({
    selector: 'create',
    templateUrl: 'app/test/create/create.template.html'
})
export class CreateComponent {
    test: any = {};
    errorMessage: string;
    constructor(private _router: Router,
        private _testService: TestService) { }
    create() {
        alert('Thank you for submitting a form! We will be getting back to you with more information shortly!');
        
        this._testService
            .create(this.test)
            .subscribe(createdTest => this._router.navigate(['/',
                createdTest._id]),
            error => this.errorMessage = error
        );
    }
}