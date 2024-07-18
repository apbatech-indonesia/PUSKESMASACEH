import { Injectable } from '@angular/core';
import { TreeviewItem } from 'ngx-treeview';

export class BookService {
  getBooks(): TreeviewItem[] {
    // const childrenCategory = new TreeviewItem({
    //   text: 'Children', value: 1, collapsed: true, children: [
    //     { text: 'Baby 3-5', value: 11 },
    //     { text: 'Baby 6-8', value: 12 },
    //     { text: 'Baby 9-12', value: 13 }
    //   ]
    // });
    const itCategory = new TreeviewItem({
      text: 'IT', value: 9,collapsed: true,checked: false, children: [
        {
          text: 'Programming', value: 91,collapsed: true,checked: false, children: [{
            text: 'Frontend', value: 911,collapsed: true,checked: false, children: [
              { text: 'Angular 1', value: 9111 ,checked: false},
              { text: 'Angular 2', value: 9112 ,checked: false},
           
            ]
          }]
        }
      ]
    });


    console.log(itCategory)
 

    return [itCategory];
  }
}
