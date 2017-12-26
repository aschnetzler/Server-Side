import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { TestService } from '../test.service';
@Component({
    selector: 'list',
    templateUrl: 'app/test/list/list.template.html'
})
export class ListComponent {
    test: any;
    errorMessage: string;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _testService: TestService) { }
    ngOnInit() {
        this._testService.list().subscribe(test => this.test
            = test);
    }
    delete() {
        this._testService.delete(this.test._id).
            subscribe(deletedTest => this._router.navigate(['/test']),
            error => this.errorMessage = error);
    }
}