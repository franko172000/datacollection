import express from 'express';
import expressLoader from './express';
import dbConnection from './dbconnection';

export default async (expressApp: express.Application) => {
  //initialize databse
  await dbConnection();
  //load express app
  expressLoader(expressApp);
};
