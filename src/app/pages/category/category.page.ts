import { Component, OnInit }                  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';

import { Category, CategoryService } from '@services/storage/category.service';


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

  iconListKeys = [];

  iconList = {
    airplane: false,
    home: false,
    pizza: false,
    card: false,
    bus: false,
    basket: false,
    bulb: false,
    call: false
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoryService
  ) {
    this.iconListKeys = Object.keys(this.iconList);
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
      this.iconList[this.category.icon] = true;
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

    await this.categoriesService.setCategory(newCategory);
    this.router.navigateByUrl('/budgets');
  }

  onCancel() {
    this.router.navigateByUrl('/budgets');
  }

  onDelete() {
    this.categoriesService.deleteCategory(this.id).then(() => {
      this.router.navigateByUrl('/budgets');
    });
  }

  setIcon(icon: string) {
    this.categoryForm.get('icon').setValue(icon);
    this.deselectIcons();
    this.iconList[icon] = true;
  }

  private deselectIcons() {
    this.iconListKeys.forEach(key => {
      this.iconList[key] = false;
    });
  }

}
