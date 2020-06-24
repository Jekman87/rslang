import { baseUrl } from '../constants/constants';

export default class Api {
  constructor(userId, token) {
    this.userId = userId;
    this.token = token;
  }

  // Sign in
  async loginUser(userLog) {
    const rawResponse = await fetch(`${baseUrl}/signin`, {
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
    this.token = content.token;

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

    if (rawResponse.status !== 200) {
      throw new Error(rawResponse.status);
    }

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

  // Users/AggregatedWords methods

  // filter must be a string:
  // filter = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}';
  async getAllUserAggregatedWords(group, wordsPerPage, filter) {
    let url = `${baseUrl}/users/${this.userId}/aggregatedWords?`;
    const encodedFilter = encodeURIComponent(filter);
    url += `group=${group}&wordsPerPage=${wordsPerPage}&filter=${encodedFilter}`;

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
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/aggregatedWords/${wordId}`, {
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
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/statistics`, {
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
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/statistics`, {
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
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/settings`, {
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
    const rawResponse = await fetch(`${baseUrl}/users/${this.userId}/settings`, {
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
