import myRequest from '..';

export async function signup(data: any) {
  try {
    return await myRequest.post({
      url: 'auth/signup',
      data
    });
  } catch (err) {
    throw err;
  }
}

export async function signin(data: any) {
  try {
    return await myRequest.post({
      url: 'auth/signin',
      data
    });
  } catch (err) {
    throw err;
  }
}
