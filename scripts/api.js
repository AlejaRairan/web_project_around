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

  createDescription({ name, about }) {
    console.log(name, about);
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => console.error(err));
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
  likeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  createCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });
  }

  updateUserInfo(avatarUrl) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

export const api = new Api(
  "https://around-api.es.tripleten-services.com/v1",
  "c363e6f6-18e6-4e74-8578-cb86a4b17bc1"
);
