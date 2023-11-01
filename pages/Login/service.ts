export function login(username: string, password: string) {
  return new Promise((resolve, reject) => {
    api
      .post("/auth/login", {
        username,
        password,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
