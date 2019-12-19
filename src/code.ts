import { of, BehaviorSubject } from 'rxjs'; 
import { delay, switchMap } from 'rxjs/operators';

const filters = ['brand=porsche', 'model=911', 'horsepower=389', 'color=red']
const filters2 = ['brand=aaa', 'model=bbb', 'horsepower=Ccc', 'color=ddd']
const activeFilters = new BehaviorSubject('');

const getData = (params:any) => {
  return of(`retrieved new data with params ${params}`).pipe(
    delay(1000)
  )
}

const applyFilters = (filters: string[]) => {
  filters.forEach((filter, index) => {

    let newFilters = activeFilters.value;
    if (index === 0) {
      newFilters = `?${filter}`
    } else {
      newFilters = `${newFilters}&${filter}`
    }

    activeFilters.next(newFilters)
  })
}

activeFilters.pipe(
  switchMap(param => getData(param))
).subscribe(val => addItem(val));

applyFilters(filters);
setTimeout(() => {
  applyFilters(filters2);
}, 500);


function addItem(val: any) {
  var node = document.createElement("li");
  var textNode = document.createTextNode(val);
  node.appendChild(textNode);
  document.getElementById("output").appendChild(node);
}