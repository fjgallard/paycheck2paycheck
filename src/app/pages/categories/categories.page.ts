import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '@services/storage/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Category[];
  constructor(private categoriesService: CategoryService) {
    this.categories = [];
  }

  async ngOnInit() {
    const categories = await this.categoriesService.getCategories();
    const keys = Object.keys(categories);
    keys.forEach(key => {
      this.categories.push(categories[key])
    })
  }

}
