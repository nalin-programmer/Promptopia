"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick && handleTagClick(post)}
        ></PromptCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const filterResult = (search) => {
    setSearchText(search);
    search = search.toLowerCase();
    setFilteredPosts(
      posts.filter((post) => {
        for (const key in post) {
          if (Object.prototype.hasOwnProperty.call(post, key)) {
            if (
              typeof post[key] === "string" &&
              post[key].toLowerCase().includes(search)
            ) {
              return true;
            }
          }
        }
        return false;
      })
    );
  };
  const handleTagClick = (post) => {
    filterResult(post.tag);
  };
  const handleSearchChanges = (e) => {
    e.preventDefault();
    filterResult(e.target.value);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChanges}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
