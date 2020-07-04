import { BASE_URL } from '../constants/constants';

export default class Api {
  constructor(userId, userName, token, refreshToken) {
    this.userId = userId;
    this.userName = userName;
    this.token = token;
    this.refreshToken = refreshToken;
  }

  // Sign in
  async loginUser(userLog) {
    const rawResponse = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLog),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();

    this.userId = content.userId;
    this.userName = content.name;
    this.token = content.token;
    this.refreshToken = content.refreshToken;

    return content;
  }

  // Words methods
  async getWords(page = 0, group = 0, wordsPerExampleSentenceLTE, wordsPerPage = 10) {
    let url = `${BASE_URL}/words?page=${page}&group=${group}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async getWordsCount(page = 0, wordsPerExampleSentenceLTE, wordsPerPage = 10) {
    let url = `${BASE_URL}/words/count?page=${page}`;

    if (wordsPerExampleSentenceLTE !== undefined) {
      url += `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}&wordsPerPage=${wordsPerPage}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async getWordById(wordId, noAssets = true) {
    let url = `${BASE_URL}/words/${wordId}`;

    if (noAssets !== null) {
      url += `?noAssets=${noAssets}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  // Users methods
  async createUser(user) {
    const rawResponse = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async getUser() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async updateUser(user) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async deleteUser(confirm) {
    if (confirm !== true) {
      return false;
    }

    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }

  async getNewTokens() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/tokens`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.refreshToken}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();

    this.token = content.token;
    this.refreshToken = content.refreshToken;

    return content;
  }

  // Users/Words methods
  async getAllUserWords() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async createUserWord(wordId, word) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async getUserWordById(wordId) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async updateUserWord(wordId, word) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async deleteUserWord(wordId) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/words/${wordId}`, {
      method: 'DELETE',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: '*/*',
      },
    });

    return rawResponse.status;
  }

  // Users/AggregatedWords methods

  // filter must be a string:
  // filter = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';
  async getAllUserAggregatedWords(group, wordsPerPage, filter) {
    let url = `${BASE_URL}/users/${this.userId}/aggregatedWords?`;

    if (group) url += `group=${group}`;
    if (wordsPerPage) url += `&wordsPerPage=${wordsPerPage}`;

    if (filter) {
      const encodedFilter = encodeURIComponent(filter);
      url += `&filter=${encodedFilter}`;
    }

    const rawResponse = await fetch(url, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async getUserAggregatedWordById(wordId) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  // Users/Statistic methods
  async getStatistics() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async updateStatistics(stats) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stats),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  // Users/Settings methods
  async getSettings() {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }

  async updateSettings(settings) {
    const rawResponse = await fetch(`${BASE_URL}/users/${this.userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

    const content = await rawResponse.json();
    return content;
  }
}
