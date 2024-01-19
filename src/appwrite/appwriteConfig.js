import config from "../config/config";
import { Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //note slug = it act as document_id (we are updating slug)

  //createPost
  async createPost({title, slug, content, featuredimage, status, userid}) {
    try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug, 
            {
                title,
                content,
                featuredimage,
                status,
                userid
            }
        )
    } catch (error) {
        console.log("Appwrite service createpost error", error)
    }
  }

  //updatePost = here we separately gave 1st parameter slug so that it uniquely identify the document to update and then in 2nd para we pass all the other things
  async updatePost(slug, {title, content, featuredimage, status}) {
    try {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status
            }
        )
    } catch (error) {
        console.log("Appwrite service updatepost error", error)
    }
  }

  //deletePost = to del docs we just need slug(document_id)
  async deletePost(slug) {
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log("Appwrite service deletepost error", error)
        return false;
    }
   }
 
   //getPost
   async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service getpost error", error)
        return false;
    }
   }
 
   //getPosts = to get all posts (with status active post only)
   async getPosts(queries =  Query.equal("status", "active")){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("Appwrite service getposts error", error)
        return false;
    }
   }


   //

}

const service = new Service();
export default service;
