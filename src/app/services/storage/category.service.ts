import { Injectable }      from '@angular/core';

import { Storage }         from '@ionic/storage';

import { CATEGORY_PREFIX } from '@helper/constants';

export interface Category {
  id          : string,
  name        : string,
  value?      : number,
  limit?      : number,
  icon?       : string,
  description?: string,
  type?       : CategoryTypes | number
};

export enum CategoryTypes {
  Expense = 0,
  Income  = 1
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private storage: Storage) { }

  async setCategory(category: Category) {
    let categories = await this.storage.get(CATEGORY_PREFIX);
    if (!categories) {
      categories = {};
    }

    categories[category.id] = category;
    return this.storage.set(CATEGORY_PREFIX, categories);
  }

  async getCategory(id: string) {
    const categories = await this.storage.get(CATEGORY_PREFIX);
    return categories[id];
  }

  getCategories() {
    return this.storage.get(CATEGORY_PREFIX);
  }

  async deleteCategory(id: string) {
    const categories = await this.storage.get(CATEGORY_PREFIX);
    const idNum = Number(id);
    const categoriesLength = Object.keys(categories).length;
    delete categories[id];

    for (let index = idNum + 1; index < categoriesLength; index++) {
      const decrementedId = Number(categories[index].id) - 1;
      categories[index].id = decrementedId.toString();
      categories[index-1] = categories[index];

      if (index === categoriesLength - 1) {
        delete categories[index];
      }
    }

    return this.storage.set(CATEGORY_PREFIX, categories);
  }
}
