import 'reflect-metadata';
import Game from './lib/game';

global.debug = require('debug')('nfsw:bootstrap');

Game.getInstance()
    .start()