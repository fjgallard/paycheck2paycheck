import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CategoryService, Category } from '@services/storage/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Category[];

  constructor(private router: Router, private categoriesService: CategoryService) {
    this.categories = [];
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.categories = [];
    const categories = await this.categoriesService.getCategories();

    if (!categories) {
      return;
    }

    const keys = Object.keys(categories);
    keys.forEach(key => {
      this.categories.push(categories[key])
    })
  }

  viewCategory(id: string) {
    this.router.navigateByUrl(`/category/${id}`);
  }

  async deleteCategory(id: string) {
    await this.categoriesService.deleteCategory(id);
  }

}
