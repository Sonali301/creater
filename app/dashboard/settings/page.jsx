"use client";

import React, { useState } from 'react'
import {api} from "@/convex/_generated/api";
import { useQuery } from 'convex/react';
import { BarLoader } from 'react-spinners';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const SettingsPage = () => {
    const [username,setUsername] = useState("");


    const { data: currentUser, isLoading } = useConvexQuery(
    api.users.getCurrentUser
  );


  const {mutate:updateUsername, isLoading:isSubmitting} = useConvexMutation(
    api.users.updateUsername
  )

  const handleSubmit = async(e) =>{
    e.preventDefault();

        if(!username.trim()){
            toast.error("Username cannot be empty");
            return;
        }

        await updateUsername({username:username.trim()});
        toast.success("Username updated successfully!");

  };


  if(isLoading){
    return <BarLoader width={"100%"} color="#D8B4FE" />;
  }

  return (
    <div className="space-y-8 p-4 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text-primary">Settings</h1>
        <p className="text-slate-400 mt-2">
          Manage your profile and account preferences
        </p>
      </div>

        {/* Username Settings */}
      <Card className="card-glass max-w-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-5 w-5 mr-2" />
            Username Settings
          </CardTitle>
          <CardDescription>
            Set your unique username for your public profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='space-y-6' onSubmit={handleSubmit} >
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // {...register("username")}
                placeholder="Enter your username"
                className="bg-slate-800 border-slate-600 text-white"
              />

              {/* Current Username */}
              {currentUser?.username && (
                <div className="text-sm text-slate-400">
                  Current username:{" "}
                  <span className="text-white">@{currentUser.username}</span>
                </div>
              )}

              {/* Username Help */}
              <div className="text-xs text-slate-500">
                3-20 characters, letters, numbers, underscores, and hyphens only
              </div>
             </div>

             <div className="flex justify-end">
                <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Username"
                )}
              </Button>

             </div>
        
          </form>
        </CardContent>

        </Card>


      </div>
  );
};

export default SettingsPage