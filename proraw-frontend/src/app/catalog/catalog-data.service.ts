import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from './item';
import { catchError, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CatalogDataService {
  constructor(private httpClient: HttpClient) {}

  get categories(): Observable<Category[]> {
    return this.httpClient.get('api/categories').pipe(catchError(err => []));
  }

  getItemsByCategoryId(num: number): Observable<Item[]> {
    return this.httpClient.get(`api/items/${num}`).pipe(catchError(err => []));
    // return this.httpClient.get(`api/items`).pipe(
    //   map((items: any[]) => {
    //     return items.filter(item => {
    //       return item.IDCategory === num;
    //     });
    //   }),
    //   catchError(err => [])
    // );
  }

  getItemByIdAndCategoryId(
    itemId: number,
    categoryId: number
  ): Observable<Item> {
    return this.getItemsByCategoryId(categoryId).pipe(
      map(items => items.find(item => item.IDItem === itemId))
    );
  }

  getSearchedData(str: string): Observable<Item[]> {
    return this.httpClient.get(`api/search/${str}`).pipe(catchError(err => []));
    // return this.httpClient.get('api/items').pipe(
    //   map((items: any[]) => {
    //     return items.filter(item => {
    //       return item.VendorCode.toString().includes(str);
    //     });
    //   }),
    //   catchError(err => [])
    // );
  }
}
