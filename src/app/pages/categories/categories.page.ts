import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '@services/storage/category.service';
import { Router } from '@angular/router';

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
