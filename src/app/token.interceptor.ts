import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const access_token = localStorage.getItem('ACCESS_TOKEN');

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return next(cloneRequest);
};
