import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';import { PriceModel } from '../shared/price-model.model';
;

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.css']
})
export class PriceDisplayComponent implements OnInit {

  @Input() public priceModel : PriceModel;
  constructor() { }

  ngOnInit(): void {
  }

}
