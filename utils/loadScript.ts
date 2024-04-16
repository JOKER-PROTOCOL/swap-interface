// @ts-ignore

export default function loadScript(d, s, id, jsSrc, cb, onError) {
  const element = d.getElementsByTagName(s)[0]
  const fjs = element
  let js = element
  js = d.createElement(s)
  js.id = id
  js.src = jsSrc
  js.async = true
  js.defer = true

  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs)
  } else {
    d.head.appendChild(js)
  }

  js.onerror = onError
  js.onload = cb
}
