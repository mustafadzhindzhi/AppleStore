const handleResponse = async (response) => {
    if (!response.ok) {
      const errorBody = await response.text().then(text => {
        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      });
      throw new Error(`${response.status}: ${response.statusText} - ${errorBody.message || errorBody}`);
    }
    return response.json();
  };
  
  const fetchJson = (url, options) => {
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    }).then(handleResponse);
  };
  
  export const get = (url, options = {}) => {
    return fetchJson(url, {
      method: 'GET',
      ...options,
    });
  };
  
  export const post = (url, body, options = {}) => {
    return fetchJson(url, {
      method: 'POST',
      body,
      ...options,
    });
  };
  
  export const put = (url, body, options = {}) => {
    return fetchJson(url, {
      method: 'PUT',
      body,
      ...options,
    });
  };
  
  export const del = (url, options = {}) => {
    return fetchJson(url, {
      method: 'DELETE',
      ...options,
    });
  };