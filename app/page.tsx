"use client";
import { useState } from "react";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    status: "",
  });

  const [emailInfo, setEmailInfo] = useState({
    from: "",
    to: "",
    subject: "",
    content: "",
  });

  const sendEmail = async () => {
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailInfo),
    });
    const responseJson = await response.json();
    if (responseJson.result && responseJson.result.success) {
      setErrorMessage({
        message: "Se envió el correo exitosamente",
        status: "success",
      });
      setEmailInfo({ from: "", to: "", subject: "", content: "" });
    } else {
      setErrorMessage({
        message:
          responseJson.message ||
          "Ocurrió un error al enviar el correo, intenta de nuevo",
        status: "error",
      });
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-lg mt-10">
        <h1 className="text-center">Envío de Correos</h1>
        <div>
          <input
            value={emailInfo.from}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, from: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="From"
          />
          <input
            value={emailInfo.to}
            onChange={(e) => setEmailInfo({ ...emailInfo, to: e.target.value })}
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="To"
          />
          <input
            value={emailInfo.subject}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, subject: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            type="text"
            placeholder="Subject"
          />
          <textarea
            value={emailInfo.content}
            onChange={(e) =>
              setEmailInfo({ ...emailInfo, content: e.target.value })
            }
            className="border w-full mt-2 rounded p-2"
            rows={5}
            placeholder="Message"
          ></textarea>
          {errorMessage.message.length > 0 && (
            <div
              className={`${
                errorMessage.status === "error" ? "bg-red-500" : "bg-green-500"
              } rpunded p-2 mt-2 mb-2`}
            >
              <span className="text-white">{errorMessage.message}</span>
            </div>
          )}
          <button
            onClick={sendEmail}
            className="w-full bg-blue-500 rounded mt-2 p-2 text-white cursor-pointer"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
