const baseUrl = 'https://afternoon-falls-25894.herokuapp.com';

export default class Api {
  constructor(token, userId, exp) {
    this.token = token;
    this.userId = userId;
    this.exp = exp;
  }

  async loginUser(userLog) {
    const rawResponse = await fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLog),
    });

    const content = await rawResponse.json();

    const now = new Date();
    content.tokenExpiresIn = now.setHours(now.getHours() + 4);

    // запись в LocalStorage токен
    // и время истечения?
    this.token = content.token;
    this.userId = content.userId;

    return content;
  }

  // Words methods
  async getWords(page = 0, group = 0, wordsPerExampleSentenceLTE, wordsPerPage = 10) {
    let url = `${baseUrl}/words?page=${page}&group=${group}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  async getWordsCount(page = 0, wordsPerExampleSentenceLTE, wordsPerPage = 10) {
    let url = `${baseUrl}/words/count?page=${page}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  async getWordById(wordId) {
    const rawResponse = await fetch(`${baseUrl}/words/${wordId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  // Users methods
  async createUser(user) {
    const rawResponse = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const content = await rawResponse.json();
    return content;
  }

  async getUser() {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  async updateUser(user) {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const content = await rawResponse.json();

    return content;
  }

  async deleteUser(confirm) {
    if (confirm !== true) {
      return false;
    }

    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }

  // Users/Words methods
  async getAllUserWords() {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  async createUserWord(wordId, word) {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content = await rawResponse.json();

    return content;
  }

  async getUserWordById(wordId) {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content;
  }

  async updateUserWord(wordId, word) {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const content = await rawResponse.json();

    return content;
  }

  async deleteUserWord(wordId) {
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }
}
