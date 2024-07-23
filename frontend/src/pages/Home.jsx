import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../apiClient.js";
import TutorCard from "../components/TutorCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

const Home = () => {

  const mutation = useMutation(apiClient.auth);


  useEffect(() => {
    const helper = async () => {
      if (isAuthenticated) {
        try {
        
          mutation.mutate({
            auth0Id: user.sub,
            email: user.email,
            name: user.name,
            picture: user.picture,
          });
        } catch (error) {
          console.error("Error is :", error);
        }
      }
    };
    helper();
  }, [isAuthenticated, user]);

  const { user, isAuthenticated } = useAuth0();

  const {data: tutors,isLoading,isError} = useQuery("fetchTutors", async () => await apiClient.fetchTutors());
  

  return (
    <div>
      <Header />
      <div className="p-4 text-white text-4xl mt-6 font-bold  ">
        Online tutors and teachers for private lessons
      </div>
      <SearchBar />
      
      <div className="flex justify-between">
        <div className=" grid grid-cols-1 p-2 gap-20 text-white">
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor, index) => (
              <TutorCard key={index} tutor={tutor} />
            ))
          ) : (
            <div>No tutors are available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
