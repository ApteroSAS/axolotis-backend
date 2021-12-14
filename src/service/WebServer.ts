import express from 'express';

export class WebServer {
    constructor(private app){
        app.use('/', express.static('public'));
    }
}
