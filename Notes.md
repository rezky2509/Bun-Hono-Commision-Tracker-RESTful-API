## Back to Basic 

Promise
Promises are the "future value" container
In other way to explain, it is value in the future that is not being acknowledge when the Promise is created
Usually promise is created as proxy (delay) for process of Asynchronous

Promise does not use callback, It written same as Synchronous.

Promise State
Pending -> undefined
Fulfilled -> value
Rejected -> error

Creating Promise 
const promiseExample = new Promise(function(resolve,reject){
    <!-- This Code here is asynchronous -->
    if(success){
        resolve(value)
    }else{
        reject(error)
    }
})
(The function within Promise does not require to be writin async because it is already
asynchronous. This is because, the function within the promise method is Asynchronous)
As mentioned previous, promise is an asynchronous method but it expecting future value

Instead using synchronous where it will fire and forget, YOU PROMISE TO RETURN SOMETHING OR YOU WANT TO DELAY SOMETHING. 
Promise lets you represent and consume async results in a clean way — it doesn't create asynchronicity out of synchronous, CPU-bound code.
Promise is basically YOU ARE UNSURE THE FUTURE VALUE but you are expecting a value to be return


Drizzle ORM Clause 
For matching string use 
eq
For insensitive case string use 
ilike
For case sensitive use 
like


SQLITE
For better auth, it require to use / as the directory for the location of the database
For configuration, since it is localdatabase, the baseURL must be defined the name of the baseurl of the bun runtime 
// 1. Add this line so the Better Auth CLI knows its local address
  baseURL: "http://localhost:3000",


PAGINATION 
It's using offset(totalRow-10) which doesn't account for the page number at all.

For pagination:

Page 1: offset = 0, limit = 10 → rows 0-9
Page 2: offset = 10, limit = 10 → rows 10-19
Page 3: offset = 20, limit = 10 → rows 20-25 (6 results if total is 26)
The offset should be (page - 1) * 