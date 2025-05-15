import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = 'jd891z78dz17g7612f6d512f6farfd23djbasduzgsad%xc.asdas123ad12d';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true
  }
});

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));

  const userID = session.get('userID');

  if(!userID) {
    return null;
  };

  if(userID !== 'dgh786t2dg616gfd76ad6f271fg6d5asfdz23j&%5v21dsawtzfew6213') {
    return null;
  }

  return userID;
}

export async function requireUserSession(request) {
  const userID = await getUserFromSession(request);

  if(!userID) {
    return false;
  }

  return userID;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));


  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  });
  
}

export async function login({password}) {
  try {
    if(password !== 'Siemensmercedes4751!!') {
      return 'Passwort falsch';
    }

    const session = await sessionStorage.getSession();
    const ddd = 'dgh786t2dg616gfd76ad6f271fg6d5asfdz23j&%5v21dsawtzfew6213';
    console.log(session);

    if(session) {
      console.log(session.set('userID', ddd));
      console.log(session.set());
    } else {
      console.log('SESSION NOT EXISTS');
    }


    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session)
      }
    });
  } catch(e) {
    console.log(e);
    throw e;
  }
}