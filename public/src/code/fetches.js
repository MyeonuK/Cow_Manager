async function fetchUrl(order) {
  //fetch(`http://myeonu.cafe24app.com/${order}`).then((res) => res.json);
  let a = await fetch(order);
  return await a.json();
}
