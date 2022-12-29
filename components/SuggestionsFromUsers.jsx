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
        alert("you have successfully submitted your suggestion");
        setMessage("");
      })
      .catch((e) => alert("try again"));
  };
  return (
    <div className=" bg-red-400 text-white py-6 px-4">
      <p className="text-center font-bold lg:text-3xl mb-4 ">
        Message from <span className="underline">Developers</span>
      </p>
      <div className="px-2 text-justify lg:flex lg:items-center lg:justify-center lg:w-4/5 lg:mx-auto lg:gap-4  lg:px-6 lg:text-2xl text-xl">
        <div className="lg:w-2/4">
          <p className="">
            We firmly believe that nothing is built perfect in first attempt and
            often requires iteration after iteration in order to become the
            best.
          </p>
          <p>
            Hence, if you got any suggestions to incorporate in the website,
            don't hesitate to leave your suggestions and reviews!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-3 lg:my-3 shadow-lg px-2 flex flex-col py-2 border lg:w-2/4 lg:mx-auto lg:rounded-lg bg-white"
        >
          <textarea
            placeholder="Write here"
            className="px-2 py-1 h-[150px] text-black"
            required
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <input
            type="submit"
            className="my-2 bg-[#F4A68D] hover:text-[#F4A68D] hover:bg-white border-[#F4A68D] border text-white w-3/5 mx-auto font-semibold text-3xl rounded-lg py-2 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default SuggestionsFromUsers;
