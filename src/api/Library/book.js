import request from '../../utils/request'

export function bookLoad() {
  return request({
    url: '/books',
    method: 'get'
  })
}

export function searchBook(keywords) {
  return request({
    url: '/search',
    method: 'post',
    data: {
      keywords
    }
  })
}

export function deleteBook(id) {
  return request({
    url: '/delete',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function updateBook(id, cover, title, author, date, press, abs, category) {
  return request({
    url: '/books',
    method: 'post',
    data: {
      id: id,
      cover: cover,
      title: title,
      author: author,
      date: date,
      press: press,
      abs: abs,
      category: category
    }
  })
}

