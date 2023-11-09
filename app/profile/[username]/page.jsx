"use client";
import Profile from "@components/Profile";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const MyProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/username/${params.username}/posts`
      );
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name={params.username}
      desc={`Welcome to ${params.username}'s personalized profile page`}
      data={posts}
    />
  );
};

export default MyProfile;
