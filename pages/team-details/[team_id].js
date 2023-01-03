import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function teamDetails() {
  const router = useRouter();

  useEffect(() => {
    //Wait for router to be ready before accessing query
    if (!router.isReady) return;
    const Id = router.query.team_id;
  }, [router.isReady]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <p className="text-center pt-32 text-3xl font-semibold">
          Page is under construction
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default teamDetails;
