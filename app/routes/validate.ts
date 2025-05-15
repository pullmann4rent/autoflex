// Mail
export const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export function validateMail({
  name,
  email,
  issue
}: { name: string; email: string; issue: string; }) {
  let newName = name.trim();

  if(!newName) {
    throw {
      message: 'Kein Name vorhanden.'
    }
  }

  if(newName.length > 100 || newName.length < 2) {
    throw {
      message: 'Überprüfe dein Namen.'
    }
  }

  if(!email) {
    throw {
      message: 'Email fehlt.'
    }
  }

  if(!emailRegexp.test(email)) {
    throw {
      message: 'Email ist ungültig.'
    }
  }

  if(!issue) {
    throw {
      message: 'Text fehlt.'
    }
  }

  if(issue.length <= 1 || issue.length > 2000) {
    throw {
      message: 'Dein Anliegen muss ausgefüllt werden.'
    }
  }
}