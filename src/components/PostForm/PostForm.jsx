import { useCallback, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { Button, Input, Select, RTE} from '../index'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import service from '../../appwrite/appwriteConfig';

export default function PostForm({post}) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
        
    const {register, handleSubmit, watch, setValue, getValues, control} = 
    useForm( {
        // To use these values we get info from users from "post" prop we pass in PostForm func
        defaultValues : {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })


    const submit = async(data) => {
      
        //Condition if post available
        if (post) {
           //handling file (upload file)
            const file = data.image[0] 
              ? service.uploadFile(data.image[0])
              : null;

            //After uploading delete old image 
            if(file){
                service.deleteFile(post.featuredImage)
            }

            //Updating post
            const dbPost = await service.updatePost(post.$id, { 
                ...data,
                featuredimage : file ? file.$id : undefined
            })

            if(dbPost) navigate(`/post/${dbPost.$id}`)
        }

        //Condition if post not available
        else {
            // Upload image file
            const file  = data.image[0] 
                ? await service.uploadFile(data.image[0])
                : null
            if(file) {
               const fileId = file.$id;
               data.featuredImage = fileId

               // Create new post
               const dbPost = await service.createPost({
                  ...data,
                  userid : userData.$id
               })

               if(dbPost) navigate(`/post/${dbPost.$id}`)
            }
        }
    }


    // Slug(url) transform  
    const slugTranform = useCallback((value) => {
        if(value && typeof value === "string")
            return value
              .trim()
              .toLowerCase
              .replace(/^[a-zA-Z\d\s]+/g, '-')
              .replace(/\s/g, "-")

        return "";
    }, [])

    //
    useEffect(()=> {
        const subscription = watch((value, {name}) => {
           if(name === 'title'){
             setValue('slug', slugTranform (value.title) , {shouldValidate : true} )
           }
        });

        //for memory management
        return () =>{
            subscription.unsubscribe();
        }
        
    },[watch, slugTranform, setValue])

    
    return (
        <form onSubmit={handleSubmit(submit)} className="sm:flex sm:flex-row">
        
        <div className="sm:w-2/3 px-2 ">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 bg-transparent shadow-[0px_0px_1px]"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 bg-transparent shadow-[0px_0px_1px]"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true });
            }}
          />

          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          /> 
        </div>

        <div className="w-full sm:w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            className={`w-full bg-green-500 hover:bg-green-600 active:bg-teal-500`}
          >
            {post ? "Update" : "Submit"}
          </Button>
          
        </div>
        
      </form>
    )
  }
