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
    <div className=" bg-white text-black pt-20 px-4">
      <p className="text-center font-semibold lg:text-3xl text-2xl mb-3 ">
        Message from Developers
      </p>
      <div className="border-b-4 border-[#F4A68D] w-full md:w-3/5 lg:w-2/5 mx-auto mb-8"></div>
      <div className="px-2 text-justify lg:flex lg:items-center lg:justify-center lg:w-4/5 lg:mx-auto lg:gap-x-8 lg:px-6 text-sm lg:text-lg ">
        <div className="lg:w-2/4 mb-6">
          <p>
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
          className="lg:my-3 shadow-lg px-2 flex flex-col py-2 border lg:w-2/4 lg:mx-auto rounded-lg bg-white"
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
            className="my-3 py-1 px-6 bg-[#F4A68D] hover:text-[#F4A68D] hover:bg-white border-[#F4A68D] border text-white mx-auto font-semibold text-xl rounded-lg cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default SuggestionsFromUsers;
