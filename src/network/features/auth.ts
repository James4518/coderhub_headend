import myRequest from '..';

export function signup(data) {
  return myRequest.post({
    url: 'auth/signup',
    data
  });
}

export function signin(data) {
  return myRequest.post({
    url: 'auth/signin',
    data
  });
}
