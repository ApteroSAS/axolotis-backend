import express from 'express';

export class WebServer {
    constructor(private app){
        app.use('/room', express.static('public'));
    }
}
