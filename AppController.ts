import {Controller, Body, Get, Post} from "routing-controllers";
import {User} from "./models/user";
import * as Knex from 'knex';
import {Validator} from "class-validator";

@Controller('/users')
export class AppController {

    public knex: Knex;

    constructor() {
        this.knex = Knex({
            debug: true,
            client: 'mssql',
            connection: {
                host : 'helloregistration.c9zzrp18lpz9.us-east-2.rds.amazonaws.com',
                user : 'helloUser',
                password : 'helloWorld!',
                database: 'Registration'
            }
        });
    }

    @Get()
    async getAll() {
        return await this.knex
            .select()
            .from('User');
    }

    @Post()
    async addUser(@Body() user: any) {
        console.log(user);
        const newUser = JSON.parse(user);
        if (this.checkData(newUser)) {
            await this.knex
                .insert({
                    'firstName': newUser.firstName,
                    'lastName': newUser.lastName,
                    'address1': newUser.address1,
                    'address2': newUser.address2,
                    'city': newUser.city,
                    'state': newUser.state,
                    'zip': newUser.zip,
                    'country': newUser.country
                })
                .into('User');
            return {status: 'success'};
        } else {
            return {status: 'error'}
        }
    }

    //Double check incoming newUser
    checkData(user: User) {
        const validator = new Validator();
        //First Name
        if (!validator.isDefined(user.firstName) || !validator.maxLength(user.firstName, 50)) {
            return false;
        }

        //Last Name
        if (!validator.isDefined(user.lastName) || !validator.maxLength(user.lastName, 50)) {
            return false;
        }
        //Address 1
        if (!validator.isDefined(user.address1) || !validator.maxLength(user.address1, 100)) {
            return false;
        }
        //City
        if (!validator.isDefined(user.city) || !validator.maxLength(user.city, 50)) {
            return false;
        }
        //State
        if (!validator.isDefined(user.state) || !validator.maxLength(user.state, 2)) {
            return false;
        }
        //Zip
        if (!validator.isDefined(user.zip) || !validator.length(user.zip, 5, 5)) {
            return false;
        }
        //Country
        if (!validator.isDefined(user.country)) {
            return false;
        }
        return true;
    }

}