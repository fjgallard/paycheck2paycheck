import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';
import { CATEGORY_PREFIX } from '@helper/constants';

export interface Category {
  name        : string,
  icon        : string,
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

  async addCategory(category: Category) {
    let categories = await this.storage.get(CATEGORY_PREFIX);
    if (!categories) {
      categories = [];
    }

    categories.push(category);
    return this.storage.set(CATEGORY_PREFIX, categories);
  }

  getCategories() {
    return this.storage.get(CATEGORY_PREFIX);
  }
}
