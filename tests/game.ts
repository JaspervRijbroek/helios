import Game from "../src/game";

describe('Game tests',  () => {
    let game: any;

    beforeAll(() =>{
        game = new Game().startServers();
    });

    afterAll(async () => {
        game.stopServers();
        return Game.db.$disconnect();
    })

    test('If all servers are started correctly', () => {
        expect(game.getServer('soap')).toBeTruthy();
        expect(game.getServer('freeroam')).toBeTruthy();
        expect(game.getServer('chat')).toBeTruthy();
    })
});