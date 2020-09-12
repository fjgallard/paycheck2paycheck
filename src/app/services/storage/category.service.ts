import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';
import { CATEGORY_PREFIX } from '@helper/constants';

export interface Category {
  id          : string,
  name        : string,
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
    delete categories[id];
    return this.storage.set(CATEGORY_PREFIX, categories);
  }
}
