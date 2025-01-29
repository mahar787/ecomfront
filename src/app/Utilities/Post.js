export default async function postReqForAddData(endpoint, data) {
  let request = await fetch(`${endpoint}`, {
    method: "POST",
    body: data,
  });
  let statusCode = request.status;
  let response = await request.json();
  return { response, statusCode };
}
