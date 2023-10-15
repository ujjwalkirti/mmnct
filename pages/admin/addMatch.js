import Head from "next/head";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { createMatch } from "../../components/matchFunctions.js";
import { database, db } from "../../components/db/Firebase";
import { child, ref, get } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";

const AddMatch = ({ auth_users }) => {
  const { data: session } = useSession();
  const [temp, settemp] = useState(true);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = React.useState({
    id: "Loading",
    timeDate: "",
    Team1Id: "",
    Team2Id: "",
    category: "",
  });

  useEffect(() => {
    fetchData();
  }, [temp]);

  useEffect(() => {
    auth_users.map((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const fetchData = async () => {
    const dbref = ref(database);
    let snapshot = await get(child(dbref, "matchDetail/"));
    //console.log(snapshot.val());
    setFormData({
      ...formData,
      id: snapshot.val() === null ? 1 : Object.keys(snapshot.val()).length + 1,
    });
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { id, timeDate, Team1Id, Team2Id, category } = formData;
    if (id && timeDate && Team1Id && Team2Id && category) {
      await createMatch(id, timeDate, Team1Id, Team2Id, category);
      alert("Data added Successfully");

      setFormData({
        id: "Loading",
        timeDate: "",
        Team1Id: "",
        Team2Id: "",
        category: "",
      });
      settemp(!temp);
    } else {
      alert("Please fill all the fields");
    }
  };
  if (!session) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        <p>You need to sign in to access this page!</p>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            signIn("google");
          }}
        >
          Sign in
        </button>
      </div>
    );
  }

  if (!validated) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        Sorry, you are not authorised to access this page!
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Create Match</title>
      </Head>
      <Navbar />

      <div className="overflow-x-auto">
        <p className="text-center my-10 text-3xl">Add Match details</p>

        <form className="w-full max-w-sm mx-auto px-4" method="POST">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Match ID
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="id"
                type="text"
                value={formData.id}
                disabled
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter Date and Time of match
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="timeDate"
                type="date"
                value={formData.timeDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team1"
              >
                Team1 Name
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team1_name"
                name="Team1Id"
                value={formData.Team1Id}
                onChange={handleChange}
                required
              >
                <option value="">---</option>
                <option value="IMMORTALS">IMMORTALS</option>
                <option value="SHAOLIN MONKS">SHAOLIN MONKS</option>
                <option value="BELONIANS">BELONIANS</option>
                <option value="AVENGERS">AVENGERS</option>
                <option value="VENGEANCE">VENGEANCE</option>
                <option value="HERCULEANS">HERCULEANS</option>
                <option value="VALKAYRIES">VALKAYRIES</option>
                <option value="SCORPIANS">SCORPIANS</option>
                <option value="SPARTANS">SPARTANS</option>
                <option value="KNIGHT TEMPLARS">KNIGHT TEMPLARS</option>
                <option value="ATHENIANS">ATHENIANS</option>
                <option value="ASSYRIANS">ASSYRIANS</option>
                <option value="NINJAS">NINJAS</option>
                <option value="VIKINGS">VIKINGS</option>
                <option value="SAMARTIANS">SAMARTIANS</option>
                <option value="AMORITES">AMORITES</option>
                <option value="PARTHIANS">PARTHIANS</option>
                <option value="SUMERIANS">SUMERIANS</option>
                <option value="AMAZONS">AMAZONS</option>
                <option value="AKKADIANS">AKKADIANS</option>
                <option value="SAMURAI">SAMURAI</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team2"
              >
                Team2 Name
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team2_name"
                name="Team2Id"
                value={formData.Team2Id}
                onChange={handleChange}
                required
              >
                <option value="">---</option>
                <option value="IMMORTALS">IMMORTALS</option>
                <option value="SHAOLIN MONKS">SHAOLIN MONKS</option>
                <option value="BELONIANS">BELONIANS</option>
                <option value="AVENGERS">AVENGERS</option>
                <option value="VENGEANCE">VENGEANCE</option>
                <option value="HERCULEANS">HERCULEANS</option>
                <option value="VALKAYRIES">VALKAYRIES</option>
                <option value="SCORPIANS">SCORPIANS</option>
                <option value="SPARTANS">SPARTANS</option>
                <option value="KNIGHT TEMPLARS">KNIGHT TEMPLARS</option>
                <option value="ATHENIANS">ATHENIANS</option>
                <option value="ASSYRIANS">ASSYRIANS</option>
                <option value="NINJAS">NINJAS</option>
                <option value="VIKINGS">VIKINGS</option>
                <option value="SAMARITANS">SAMARTIANS</option>
                <option value="AMORITES">AMORITES</option>
                <option value="PARTHIANS">PARTHIANS</option>
                <option value="SUMERIANS">SUMERIANS</option>
                <option value="AMAZONS">AMAZONS</option>
                <option value="AKKADIANS">AKKADIANS</option>
                <option value="SAMURAI">SAMURAI</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_gender"
              >
                Gender
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team_gender"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">---</option>
                <option value="male"> Male</option>
                <option value="female"> Female </option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={submitData}
              >
                Create Match
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddMatch;

export async function getServerSideProps(context) {
  const querySnapshot = await getDocs(collection(db, "auth_users"));

  let auth_users = [];

  querySnapshot.forEach((doc) => {
    auth_users.push(doc.data());
  });

  return {
    props: {
      auth_users,
    },
  };
}
