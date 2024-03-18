import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Item } from '../../../store/models/domain/item';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css',
})
export class UpdateItemComponent implements OnInit{
  ngOnInit(): void {
    this.updateForm = new FormGroup({
      searchItems: new FormControl('')
    })
  }
  @Input() items!: Item[];

  updateForm!: FormGroup;


  onChange(event: any) {
    const target = event.target;
    this.items.filter(i => i.name.includes(target.value));
  }
}
