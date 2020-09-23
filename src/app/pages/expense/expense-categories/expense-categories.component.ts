import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category, CategoryService } from '@services/storage/category.service';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss'],
})
export class ExpenseCategoriesComponent implements OnInit {

  categories: Category[];
  selectedCategory: Category;

  constructor(private categoryService: CategoryService, private modalController: ModalController) {
    this.categories = [];
  }

  async ngOnInit() {
    const categoriesObj = await this.categoryService.getCategories();
    const keys = Object.keys(categoriesObj);
    keys.forEach(key => {
      this.categories.push(categoriesObj[key])
    });

    console.log(this.categories);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.modalController.dismiss({
      selectedCategory: category
    });
  }

  closeModal() {
    this.modalController.dismiss({
      selectedCategory: this.selectedCategory
    });
  }

}
