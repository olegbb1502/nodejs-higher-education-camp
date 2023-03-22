/**
 * Write a function that accepts any kind of array and an asynchronous callback,
 * that is invoked on each array element sequentially. 
 * The result of invocation must be an array of callback results. 
 * All types must apply automatically (Template function).
 */

const array: Array<unknown> = ["one", "two", "three"];

type ArrayElement<Type> = Type extends (infer Union)[] ? Union : never;

async function runSequentially<Type extends any[], Union>(
  array: Type,
  callback: (element: ArrayElement<Type>, index: number, array: Type) => Promise<Union>
): Promise<Union[]> {
  const results: Union[] = [];

  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i];
    const currentIndex = i;
    const entireArray = array;
    const result = await callback(currentElement, currentIndex, entireArray);
    results.push(result);
  }

  return results;
}

const results = runSequentially(array, (item, index) =>
  Promise.resolve({
    item,
    index,
  })
).then((result) => console.log(result));


/**
 * Write a function that accepts any kind of array and a predicate for 
 * array elements removing. 
 * Passed array must be mutated. 
 * All removed elements must be returned as array types
 * must apply automatically (Template function).
 */

 function arrayMutateRemove<Type extends any[]>(
    array: Type,
    predicate: (element: ArrayElement<Type>) => boolean
): ArrayElement<Type>[] {
  const removedElements: ArrayElement<Type>[] = [];

  let writeIndex = 0;

  for (let readIndex = 0; readIndex < array.length; readIndex++) {
    const currentElement = array[readIndex];

    if (!predicate(currentElement)) {
      array[writeIndex++] = currentElement;
    } else {
      removedElements.push(currentElement);
    }
  }

  array.length = writeIndex;

  return removedElements;
}

const array1: Array<number> = [1, 2, 3, 6, 7, 9];

const removedElements = arrayMutateRemove(array1, (item) => item % 2 === 0);
console.log(removedElements);
