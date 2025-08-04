import { inject } from '@angular/core';
import { CanActivateFn,CanActivateChildFn, Router } from '@angular/router';
import { Global } from 'src/dto/dtos';
import { StorageService } from 'src/services/storage.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   // const router = new Router()
//   // const localStorage = new StorageService();
//   const router = inject(Router);  // Use Angular's DI to inject services
//   const localStorage = inject(StorageService);  // Use Angular's DI to inject services
//   const token = localStorage.getItem(Global.key_token)

//   if(token){
//     return true;
//   }
//   alert("login first")
//   router.navigate([''])
//   return false;
// };

export const authGuard: CanActivateFn & CanActivateChildFn = async (route, state) => {
  const router = inject(Router);
  const localStorage = inject(StorageService);
  const token = await localStorage.getItem(Global.key_token);

  if (token) {
    return true;
  }
  alert("Login first");
  router.navigate(['/login']);
  return false;
};



