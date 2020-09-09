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

  category    : Category;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoriesService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name       : [ '', [ Validators.required ] ],
      icon       : [ '' ],
      description: [ '' ],
      type       : [ '' ]
    });

    this.route.queryParams.subscribe(async result => {
      if (result.id) {
        this.category = await this.categoriesService.getCategory(result.id);
      }

      if (this.category) {
        this.categoryForm = this.fb.group({
          name       : [ this.category.name, [ Validators.required ] ],
          icon       : [ this.category.icon ],
          description: [ this.category.description ],
          type       : [ this.category.type ]
        });
      }

    });

  }

  ngOnInit() {
  }

  async onSubmit() {
    const categories = await this.categoriesService.getCategories();
    let id = 0;
    if (categories) {
      id = Object.keys(categories).length;
    }

    const newCategory = {
      id: id.toString(),
      name: this.categoryForm.get('name').value,
      icon: this.categoryForm.get('icon').value,
      desciption: this.categoryForm.get('description').value,
      type: this.categoryForm.get('type').value
    }

    this.categoriesService.addCategory(newCategory);
  }

}
