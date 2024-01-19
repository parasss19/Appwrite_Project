import config from '../config/config'
import {Client, Account, ID} from 'appwrite'

// A 
//We can also do like this but it is not a good approach
// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID
// const account = new Account(client);


// B 
//Here we make separate class  
export class AuthService {
    client = new Client();
    account;

    //then made one constructor whenever the object for Authservice class is created it create the "client" and "account"
    constructor (){
        this.client
          .setEndpoint(config.appwriteUrl)
          .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    //In docs it use promises but we use async/await 

    //Use create() method to create account/Signup
    async createAccount({email, password, name}) {
      try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      
      //If user Created account successfully then do login
      if(userAccount){
        //call another method
      } 
      //some if not created successfully
      else{
        return userAccount;
       }
      } 
    catch (error) {
        throw error;
      }
    }

    //use createEmailSession() method to "login"
    async login({emial, password}) {
        try {
           return await this.account.createEmailSession(emial, password)
        } 
        catch (error) {
            console.log("Appwrite service login error", error)
        }
     }

    //use .get() to "get" current user(i.e user is login or not)
    async getCurrentUser() {
        try {
           return await this.account.get();
        } 
        catch (error) {
            console.log("Appwrite service error", error)
        }
        return null;    // if we dont get any account in try 
     }

    //use deleteSessions() method to "logout"
     async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service logout error", error)
        }
     }
     
};

//created obj (auth) for AuthService class
const auth = new AuthService()

//export the auth obj
export default auth;
