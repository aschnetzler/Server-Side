import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../test.service';
@Component({
    selector: 'edit',
    templateUrl: 'app/test/edit/edit.template.html'
})
export class EditComponent {
    test: any = {};
    errorMessage: string;
    paramsObserver: any;
    constructor(private _router: Router,
        private _route: ActivatedRoute,
        private _testService: TestService) { }
    ngOnInit() {
        this.paramsObserver = this._route.params.subscribe(params => {
            let testId = params['testId'];
            this._testService.read(testId).subscribe(test => {
                this.test = test;
            },
                error => this._router.navigate(['/test']));
        });
    }
    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }
    update() {
        this._testService.update(this.test).subscribe(savedTest => this._router.navigate(['/test', savedTest._id]),
            error => this.errorMessage =
                error);
    }
}