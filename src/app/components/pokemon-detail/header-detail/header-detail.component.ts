import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-detail',
  templateUrl: './header-detail.component.html',
  styleUrls: ['./header-detail.component.scss']
})
export class HeaderDetailComponent implements OnInit {

  @Input()
  id: number

  numero = '#00'

  link = '/home'

  constructor() { }

  ngOnInit(): void {
  }

}
