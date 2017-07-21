import fetch from 'isomorphic-fetch'

/*
 * @name fetchJSON
 * @description makes request using isomorphic fetch
 * @param {string}           endpoint enpoint url
 * @param {string}           method   enpoint method
 * @param {string || object} body     endpoint body
 */
export default function fetchJSON(endpoint, method, headers, body) {
  if (body) body = JSON.stringify(body)

  return fetch(endpoint, { body, headers, method })
    .then(response => {
      if (response.status === 200 || response.status === 404) return response.json()
    })
}
