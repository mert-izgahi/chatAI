import { useState } from "react";
import axios from "axios";
function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "http://localhost:5000/api/prompt",
      { prompt },
      {
        headers: {
          "Content-Type": "Application/JSON",
        },
      }
    );
    const data = await response.data;

    chat.push({ user: prompt, assistant: data });
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="App">
      <div className="container max-w-6xl mx-auto">
        {/* Input Form */}
        <form action="" onSubmit={onSubmit}>
          <div className="flex items-center space-x-2 py-12">
            <input
              type="text"
              name="prompt"
              id="promptField"
              className="w-full border border-black p-2 outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <input
              type="submit"
              value="Submit"
              className="px-4 py-2 bg-slate-900 text-white
             border-sm cursor-pointer"
            />

            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white
             border-sm cursor-pointer"
              onClick={() => setChat([])}
            >
              Clear
            </button>
          </div>
        </form>

        {/* Output Area */}
        <div className="p-6 border border-black h-[80vh] overflow-scroll rounded-sm bg-blue-50">
          {chat.map((item, index) => {
            return (
              <div key={index} className="border border-black rounded-sm my-2">
                <div className="flex items-start space-x-4 bg-white p-2 rounded-sm">
                  <span>🧑🏻‍💼</span>
                  <p>{item.user}</p>
                </div>
                <div className="flex items-start space-x-4 bg-white p-2 rounded-sm">
                  <span>🤖</span>
                  <p>{item.assistant.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
