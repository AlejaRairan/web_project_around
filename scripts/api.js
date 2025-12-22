class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => console.error(err));
  }

  createDescription() {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Alejandra",
        about: "Desarrolladora",
      }),
    });
  }

  loadCard() {
    return fetch(`${this.url}/cards/`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => console.error(err));
  }

  createCard(name1, url1) {
    fetch(`${this.url}/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this.token,
      },
      body: JSON.stringify({
        name: name1,
        link: url1,
      }),
    });
  }
}

export const api = new Api(
  "https://around-api.es.tripleten-services.com/v1",
  "c363e6f6-18e6-4e74-8578-cb86a4b17bc1"
);
