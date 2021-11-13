export default function handler(req, res) {
  const message = JSON.parse(req.body);

  if (
    message.lastName != "" &&
    message.firstName != "" &&
    message.patronymic != "" &&
    message.file.length != "" &&
    (message.tel != "" || message.email != "")
  ) {
    res.status(200).json({ status: 1 });
  } else {
    res.status(200).json({ status: 0 });
  }
}
