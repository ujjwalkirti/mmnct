import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./db/Firebase";

const SuggestionsFromUsers = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "suggestions"), {
      suggestion: message,
    })
      .then((docRef) => {
        console.log(
          "you have successfully submitted your suggestion with id: " +
            docRef.id
        );
        setMessage("");
      })
      .catch((e) => console.log("try again"));
  };
  return (
    <div className="px-2 text-justify">
      <p className="">
        We firmly believe that nothing is built perfect in first attempt and
        often requires iteration after iteration in order to become the best.
      </p>
      <p>
        Hence, if you got any suggestions to incorporate in the website, don't
        hesitate to leave your suggestions and reviews!
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-3 shadow-lg px-2 flex flex-col py-2 border"
      >
        <textarea
          placeholder="Write here"
          className="px-2 py-1 h-[150px]"
          required
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <input
          type="submit"
          className="my-2 bg-[#F4A68D] text-white w-3/5 mx-auto font-semibold text-3xl rounded-lg py-2 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default SuggestionsFromUsers;
