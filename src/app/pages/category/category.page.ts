import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, CategoryService } from '@services/storage/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  id          : string;
  category    : Category;
  categories  : Category[];
  categoryForm: FormGroup;

  iconList = [
    'airplane', 'pizza', 'card', 'home', 'basket', 'bus', 'bulb', 'call'
  ]

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name       : [ '', [ Validators.required ] ],
      limit      : [ '', [ Validators.required ] ],
      icon       : [ '' ],
      description: [ '' ],
      type       : [ '' ]
    });

  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categories = await this.categoriesService.getCategories();

    if (this.id) {
      this.category = await this.categoriesService.getCategory(this.id);
    } else if (this.categories) {
      this.id = Object.keys(this.categories).length.toString();
    } else if (!this.categories) {
      this.id = '0';
    }

    if (this.category) {
      this.categoryForm.get('name').setValue(this.category.name);
      this.categoryForm.get('limit').setValue(this.category.limit);
      this.categoryForm.get('icon').setValue(this.category.icon);
      this.categoryForm.get('description').setValue(this.category.description);
      this.categoryForm.get('type').setValue(this.category.type);
    }
  }

  async onSubmit() {
    const newCategory = {
      id        : this.id,
      name      : this.categoryForm.get('name').value,
      limit     : this.categoryForm.get('limit').value,
      icon      : this.categoryForm.get('icon').value,
      desciption: this.categoryForm.get('description').value,
      type      : this.categoryForm.get('type').value
    }

    this.categoriesService.setCategory(newCategory);
  }

  setIcon(icon: string) {
    this.categoryForm.get('icon').setValue(icon);
  }

}
