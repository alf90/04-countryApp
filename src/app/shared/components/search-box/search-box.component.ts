import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string>= new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeHolder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(400)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
      })
    }

    ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
    }

    public emitValue( txtImput: string ): void {
      if (txtImput ==="") return;
      this.onValue.emit(txtImput);
  }

  public onKeyPress (searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
