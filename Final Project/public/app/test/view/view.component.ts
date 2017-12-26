import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { TestService } from '../test.service';
@Component({
    selector: 'view',
    templateUrl: 'app/test/view/view.template.html',
})
export class ViewComponent {
    user: any;
    test: any;
    paramsObserver: any;
    errorMessage: string;
    allowEdit: boolean = false;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _testService: TestService) { }
    ngOnInit() {
        this.user = this._authenticationService.user
        this.paramsObserver = this._route.params.subscribe(params => {
            let testId = params['testId'];
            this._testService
                .read(testId)
                .subscribe(
                test => {
                    this.test = test;
                    this.allowEdit = (this.user && this.user._id === this.
                        test.creator._id);
                },
                error => this._router.navigate(['/test'])
                );
        });
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    delete() {
        this._testService.delete(this.test._id).
            subscribe(deletedTest => this._router.navigate(['/test']),
            error => this.errorMessage = error);
    }
}