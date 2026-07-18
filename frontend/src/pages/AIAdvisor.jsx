import { useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function AIAdvisor() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAskAI = async () => {
    const currentQuestion = question.trim();

    if (!currentQuestion) {
      setError("Please enter a financial question.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/ai/chat", {
        question: currentQuestion,
      });

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "user",
          text: currentQuestion,
        },
        {
          role: "assistant",
          text:
            response.data.answer ||
            response.data.reply ||
            "No response received from AI.",
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error("AI request failed:", error);

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to get an AI response. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion("");
    setMessages([]);
    setError("");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          AI Financial Advisor
        </h1>

        <p className="mb-6 text-slate-600">
          Ask questions about your expenses, savings and monthly budget.
        </p>

        <div className="rounded-2xl bg-white p-6 shadow">
          <label
            htmlFor="question"
            className="mb-2 block font-semibold text-slate-700"
          >
            Your financial question
          </label>

          <textarea
            id="question"
            rows="5"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Example: How can I reduce my monthly expenses?"
            className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
            disabled={loading}
          />

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 p-3 text-red-600">
              {error}
            </p>
          )}

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleAskAI}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Ask AI"}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-60"
            >
              Clear Chat
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Conversation
          </h2>

          {messages.length === 0 && !loading ? (
            <p className="text-gray-500">
              Start a conversation with FinWise AI.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 ${
                    message.role === "user"
                      ? "ml-auto max-w-[80%] bg-blue-100 text-right"
                      : "mr-auto max-w-[80%] bg-gray-100"
                  }`}
                >
                  <p className="mb-1 font-semibold">
                    {message.role === "user"
                      ? "👤 You"
                      : "🤖 FinWise AI"}
                  </p>

                  <p className="whitespace-pre-wrap leading-7">
                    {message.text}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="mr-auto max-w-[80%] rounded-xl bg-gray-100 p-4">
                  <p className="mb-1 font-semibold">
                    🤖 FinWise AI
                  </p>

                  <p className="text-blue-600">
                    Analyzing your financial data...
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AIAdvisor;