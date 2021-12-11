import express from 'express';

export class WebServer {
    constructor(private app){
        app.use('/static', express.static('public'));
    }
}
