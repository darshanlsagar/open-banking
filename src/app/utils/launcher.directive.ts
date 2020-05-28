import { Directive, Inject, ViewContainerRef, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Globals } from './globals.service';

@Directive({
	selector: '[launcher]',
})
export class LauncherDirective implements OnInit, OnDestroy {
	@Input() launcher: string;
	constructor(private vcr: ViewContainerRef, public globals: Globals) { }

	ngOnInit() {
		this.globals.launcher = this.vcr;
	}

	ngOnDestroy() {
	}

}