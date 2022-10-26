function MessageBox() {
  return (
    <textarea
      className="w-full p-4 resize-none bg-gray-200 rounded-xl mt-5"
      name="chatInput"
      id=""
      cols="30"
      rows="1"
      placeholder="Message"
    ></textarea>
  );
}

export default MessageBox;
