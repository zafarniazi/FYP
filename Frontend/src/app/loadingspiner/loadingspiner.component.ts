import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service';

@Component({
  selector: 'app-loadingspiner',
  templateUrl: './loadingspiner.component.html',
  styleUrls: ['./loadingspiner.component.scss']
})
export class LoadingspinerComponent implements OnInit {

 
  showSpinner = false;

  constructor(private spinner : SpinnerService ,private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.spinner.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }


}
