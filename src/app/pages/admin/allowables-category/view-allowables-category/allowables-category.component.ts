import { Component, OnInit } from '@angular/core';
import { AllowablesLinks } from '../constants/link';

@Component({
  selector: 'app-allowables-category',
  templateUrl: './allowables-category.component.html',
  styleUrls: ['./allowables-category.component.scss']
})
export class AllowablesCategoryComponent implements OnInit {
  AllowablesLinks = AllowablesLinks
  constructor() { }

  ngOnInit(): void {
  }

}
