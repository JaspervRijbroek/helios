import {Request} from "express";
import {Controller, Route} from "../decorators/routing";
import Game from "../../../game";

@Controller()
export default class PersonaController {
    @Route('get', 'DriverPersona/GetExpLevelPointsMap')
    async getLevelMap() {
        return {
            ArrayOfint: {
                int: [
                    100,
                    975,
                    2025,
                    3625,
                    5875,
                    8875,
                    12725,
                    17525,
                    23375,
                    30375,
                    39375,
                    50575,
                    64175,
                    80375,
                    99375,
                    121375,
                    146575,
                    175175,
                    207375,
                    243375,
                    283375,
                    327575,
                    376175,
                    429375,
                    487375,
                    550375,
                    618575,
                    692175,
                    771375,
                    856375,
                    950875,
                    1055275,
                    1169975,
                    1295375,
                    1431875,
                    1579875,
                    1739775,
                    1911975,
                    2096875,
                    2294875,
                    2506375,
                    2731775,
                    2971475,
                    3225875,
                    3495375,
                    3780375,
                    4081275,
                    4398475,
                    4732375,
                    5083375,
                    5481355,
                    5898805,
                    6336165,
                    6793875,
                    7272375,
                    7772105,
                    8293505,
                    8837015,
                    9403075,
                    9992125,
                    10581175,
                    11170225,
                    11759275,
                    12348325,
                    12937375,
                    13526425,
                    14115475,
                    14704525,
                    15293575,
                    15882625,
                    17829625
                ]
            }
        };
    }

    @Route('get', 'personas/:personaId/carslots')
    async getCarSlots(req: Request) {
        let persona = await Game.db.persona.findUnique({
            where: {
                id: parseInt(req.query.personaId as string)
            },
            include: {
                cars: true
            }
        });

        if(!persona) {
            return {};
        }

        return {
            CarSlotInfoTrans: {
                CarsOwnedByPersona: {
                    OwnedCarTrans: persona.cars.map(car => {
                        return {
                            CustomCar: {
                                BaseCar: car.baseCar,
                                CarClassHash: car.carClassHash,
                                Id: car.id,
                                IsPreset: 'true',
                                Level: car.level,
                                Name: car.name,
                                Paints: car.paints,
                                PerformanceParts: car.performanceParts,
                                PhysicsProfileHash: car.physicsProfileHash,
                                Rating: car.rating,
                                ResalePrice: car.resellValue,
                                RideHeightDrop: 0,
                                SkillModParts: car.skillModParts,
                                SkillModSlotCount: car.skillModPartsCount,
                                Version: car.version,
                                Vinyls: car.vinyls,
                                VisualParts: car.visualParts
                            },
                            Durability: car.durability,
                            Heat: car.heat,
                            Id: car.id,
                            OwnershipType: car.ownershipType,
                        }
                    })
                },
                DefaultOwnedCarIndex: 0,
                ObtainableSlots: {
                    ProductTrans: [{
                        BundleItems: {},
                        CategoryId: {},
                        Currency: '_NS',
                        Description: 'New car slot !!',
                        DurationMinute: 0,
                        Hash: -1143680669,
                        Icon: '128_cash',
                        Level: 0,
                        LongDescription: 'New car slot !!',
                        Price: '100.0000',
                        Priority: 0,
                        ProductId: 'SRV-CARSLOT',
                        ProductTitle: 'New car slot !!',
                        ProductType: 'CARSLOT',
                        SecondaryIcon: {},
                        UseCount: 1,
                        VisualStyle: {},
                        WebIcon: {},
                        WebLocation: {}
                    }]
                },
                OwnedCarSlotsCount: 5
            }
        };
    }

    @Route('get', 'DriverPersona/GetPersonaInfo')
    async getPersonaInformation(req: Request) {
        let persona = await Game.db.persona.findUnique({
            where: {
                id: parseInt(req.query.personaId as string)
            }
        });

        if (!persona) {
            return {};
        }

        return {
            ProfileData: {
                Badges: {
                    BadgePacket: [{
                        AchievementRankId: 143,
                        BadgeDefinitionId: 59,
                        IsRare: true,
                        Rarity: 2578,
                        SlotId: 0,
                    }, {
                        AchievementRankId: 209,
                        BadgeDefinitionId: 33,
                        IsRare: true,
                        Rarity: 0.00105738244,
                        SlotId: 1,
                    }, {
                        AchievementRankId: 800,
                        BadgeDefinitionId: 12,
                        IsRare: true,
                        Rarity: 0.02769229,
                        SlotId: 2,
                    }, {
                        AchievementRankId: 142,
                        BadgeDefinitionId: 84,
                        IsRare: true,
                        Rarity: 0.012894501,
                        SlotId: 3,
                    }]
                },
                Cash: persona.cash,
                IconIndex: persona.icon,
                Level: persona.level,
                Motto: persona.motto,
                Name: persona.name,
                PercentToLevel: persona.levelPercentage,
                PersonaId: persona.id,
                Rating: persona.rating,
                Rep: persona.rep,
                RepAtCurrentLevel: persona.repLevel,
                Score: persona.score,
            }
        };
    }

    @Route('get', 'personas/inventory/objects')
    async getInventoryObjects() {
        return {
            InventoryTrans: {
                InventoryItems: {
                    InventoryItemTrans: [{
                        EntitlementTag: 'runflattires',
                        ExpirationDate: {},
                        Hash: -537557654,
                        InventoryId: 1,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0xdff5856a',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'trafficmagnet',
                        ExpirationDate: {},
                        Hash: 125509666,
                        InventoryId: 2,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x77b2022',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'instantcooldown',
                        ExpirationDate: {},
                        Hash: -1692359144,
                        InventoryId: 3,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x9b20a618',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'shield',
                        ExpirationDate: {},
                        Hash: -364944936,
                        InventoryId: 4,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0xea3f61d8',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'slingshot',
                        ExpirationDate: {},
                        Hash: 2236629,
                        InventoryId: 5,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x2220d5',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'ready',
                        ExpirationDate: {},
                        Hash: 957701799,
                        InventoryId: 6,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 49,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x39155ea7',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'juggernaut',
                        ExpirationDate: {},
                        Hash: 1805681994,
                        InventoryId: 7,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x6ba0854a',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'emergencyevade',
                        ExpirationDate: {},
                        Hash: -611661916,
                        InventoryId: 8,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0xdb8ac7a4',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'team_emergencyevade',
                        ExpirationDate: {},
                        Hash: -1564932069,
                        InventoryId: 9,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0xa2b9081b',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'nosshot',
                        ExpirationDate: {},
                        Hash: -1681514783,
                        InventoryId: 10,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 46,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x9bc61ee1',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'onemorelap',
                        ExpirationDate: {},
                        Hash: 1627606782,
                        InventoryId: 11,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x61034efe',
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'team_slingshot',
                        ExpirationDate: {},
                        Hash: 1113720384,
                        InventoryId: 12,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0,
                        Status: 'ACTIVE',
                        StringHash: '0x42620640',
                        VirtualItemType: 'powerup',
                    }]
                },
                PerformancePartsCapacity: 150,
                PerformancePartsUsedSlotCount: 0,
                SkillModPartsCapacity: 200,
                SkillModPartsUsedSlotCount: 0,
                VisualPartsCapacity: 300,
                VisualPartsUsedSlotCount: 0,
            }
        };
    }

    @Route('post', 'DriverPersona/GetPersonaBaseFromList')
    async getBaseFromList(req: Request) {
        let currentPersona = await Game.db.persona.findUnique({
            where: req.user.currentPersonaId
        });

        if (!currentPersona) {
            return {};
        }

        return {
            ArrayOfPersonaBase: {
                PersonaBase: [{
                    Badges: {
                        BadgePacket: [{
                            AchievementRankId: 143,
                            BadgeDefinitionId: 59,
                            IsRare: true,
                            Rarity: 2578,
                            SlotId: 0,
                        }, {
                            AchievementRankId: 209,
                            BadgeDefinitionId: 33,
                            IsRare: true,
                            Rarity: 0.00105738244,
                            SlotId: 1,
                        }, {
                            AchievementRankId: 800,
                            BadgeDefinitionId: 12,
                            IsRare: true,
                            Rarity: 0.02769229,
                            SlotId: 2,
                        }, {
                            AchievementRankId: 142,
                            BadgeDefinitionId: 84,
                            IsRare: true,
                            Rarity: 0.012894501,
                            SlotId: 3,
                        }]
                    },
                    IconIndex: currentPersona.icon,
                    Level: currentPersona.level,
                    Motto: currentPersona.motto,
                    Name: currentPersona.name,
                    PersonaId: currentPersona.id,
                    Presence: 1,
                    Score: currentPersona.score,
                    UserId: req.user.id,
                }]
            }
        };
    }

    @Route('post', 'DriverPersona/ReserveName')
    async reserveName(req: Request): Promise<any> {
        let existingPersonas = await Game.db.persona.findMany({
            where: {
                name: req.query.name as string
            }
        });

        if (existingPersonas.length) {
            return {
                ArrayOfstring: {
                    string: ['NONE']
                }
            };
        }

        return {
            ArrayOfstring: {}
        }
    }

    @Route('post', 'DriverPersona/CreatePersona')
    async createPersona(req: Request): Promise<any> {
        let persona = await Game.db.persona.create({
            data: {
                userId: req.user.id,
                name: req.query.name as string,
                icon: parseInt(req.query.iconIndex as string)
            }
        })

        return {
            ProfileData: {
                Boost: persona.boost,
                Cash: persona.cash,
                IconIndex: persona.icon,
                Level: persona.level,
                Name: persona.name,
                PercentToLevel: persona.levelPercentage,
                PersonaId: persona.id,
                Rating: persona.rating,
                Rep: persona.rep,
                RepAtCurrentLevel: persona.repLevel,
                Score: persona.score
            }
        };
    }
}