import {Client , ID, Account} from 'appwrite';
import conf from '../conf/conf';

export class Authservice{
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userData = await this.account.create(ID.unique(), email,password,name);

            if (userData) {
                return this.login({email,password})
            }else{
                return userData
            }

        } catch (error) {
            console.log();
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            console.log();
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log();
            throw error
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log();
            throw error
        }
    }

}

const authService = new Authservice();
export default authService;