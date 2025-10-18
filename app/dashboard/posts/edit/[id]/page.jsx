"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import PostEditor from "@/components/post-editor";
import { BarLoader } from "react-spinners";

const EditPostPage = () => {

   const params = useParams();
  const postId = params.id;

    // Get post data
  const {
    data: post,
    isLoading,
    error,
  } = useConvexQuery(api.posts.getById, { id: postId });


  if(isLoading) {
      return <BarLoader width={"100%"} color="#D8B4FE"/>
  }

   if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Post Not Found</h1>
          <p className="text-slate-400">
            The post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }



  return <PostEditor initialData={post} mode="edit" />;
};


export default EditPostPage