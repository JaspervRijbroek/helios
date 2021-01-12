import {json, Request, Response} from "express";
import {Controller, Route} from "../decorators/routing";
import BaseController from "../../../lib/controller";
import {Persona} from "../../../entities/persona";

@Controller()
export default class PersonaController extends BaseController {
    @Route('get', 'DriverPersona/GetExpLevelPointsMap')
    getLevelMap(req: Request) {
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
    getCarSlots(req: Request) {
        console.log('Called');

        return {
            CarSlotInfoTrans: {
                '@': {
                    xmlns: "http://schemas.datacontract.org/2004/07/Victory.DataLayer.Serialization",
                    'xmlns:i': "http://www.w3.org/2001/XMLSchema-instance"
                },
                CarsOwnedByPersona: [{
                    OwnedCarTrans: {
                        CustomCar: {
                            BaseCar: -691868420,
                            CarClassHash: -2142411446,
                            Id: 20219847,
                            IsPreset: 'true',
                            Level: 0,
                            Name: 'car1006',
                            Paints: {
                                CustomPaintTrans: [{
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 0,
                                    Var: 254
                                }, {
                                    Group: -81736162,
                                    Hue: 496032592,
                                    Sat: 179,
                                    Slot: 1,
                                    Var: 179
                                }, {
                                    Group: -81736162,
                                    Hue: 496032592,
                                    Sat: 179,
                                    Slot: 2,
                                    Var: 179
                                }, {
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 3,
                                    Var: 254
                                }, {
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 4,
                                    Var: 254
                                }, {
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 5,
                                    Var: 254
                                }, {
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 6,
                                    Var: 254
                                }, {
                                    Group: 42744494,
                                    Hue: 496032328,
                                    Sat: 0,
                                    Slot: 7,
                                    Var: 254
                                }]
                            },
                            PerformanceParts: {
                                PerformancePartTrans: [{
                                    PerformancePartAttribHash: -880514079
                                }, {
                                    PerformancePartAttribHash: -711274200
                                }, {
                                    PerformancePartAttribHash: -1481726974
                                }, {
                                    PerformancePartAttribHash: -1586660062
                                }, {
                                    PerformancePartAttribHash: -595069127
                                }, {
                                    PerformancePartAttribHash: -1432021954
                                }]
                            },
                            PhysicsProfileHash: -1792456729,
                            Rating: 771,
                            ResalePrice: 525000,
                            RideHeightDrop: 0,
                            SkillModParts: {
                                SkillModPartTrans: [{
                                    IsFixed: false,
                                    SkillModPartAttribHash: -297285755,
                                }, {
                                    IsFixed: false,
                                    SkillModPartAttribHash: -297285755,
                                }, {
                                    IsFixed: false,
                                    SkillModPartAttribHash: 201416165,
                                }, {
                                    IsFixed: false,
                                    SkillModPartAttribHash: 201416165,
                                }, {
                                    IsFixed: false,
                                    SkillModPartAttribHash: 208768909,
                                }]
                            },
                            SkillModSlotCount: 5,
                            Version: 0,
                            Vinyls: {
                                CustomVinylTrans: [{
                                    Hash: -596964502,
                                    Hue1: -799662188,
                                    Hue2: -799662189,
                                    Hue3: -799662186,
                                    Hue4: -799662452,
                                    Layer: 0,
                                    Mir: true,
                                    Rot: 0,
                                    Sat1: 216,
                                    Sat2: 216,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1540,
                                    ScaleY: 1146,
                                    Shear: 0,
                                    TranX: -330,
                                    TranY: -91,
                                    Var1: 153,
                                    Var2: 153,
                                    Var3: 0,
                                    Var4: 25
                                }, {
                                    Hash: -883491363,
                                    Hue1: -799662282,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 1,
                                    Mir: false,
                                    Rot: 8,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 327,
                                    ScaleY: 639,
                                    Shear: 0,
                                    TranX: -403,
                                    TranY: -25,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -883491363,
                                    Hue1: -799662348,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 2,
                                    Mir: false,
                                    Rot: 248,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 327,
                                    ScaleY: 638,
                                    Shear: 0,
                                    TranX: 402,
                                    TranY: -25,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: 249467625,
                                    Hue1: -799662353,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 3,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1785,
                                    ScaleY: 1163,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: -207,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: 249467624,
                                    Hue1: -799662255,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 4,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1523,
                                    ScaleY: 1146,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: 107,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: 249467623,
                                    Hue1: -799662252,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 5,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1556,
                                    ScaleY: 1081,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: 317,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: 248129937,
                                    Hue1: -799662318,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 6,
                                    Mir: true,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1638,
                                    ScaleY: 1245,
                                    Shear: 0,
                                    TranX: -405,
                                    TranY: 27,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -596965030,
                                    Hue1: -799662188,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 7,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 179,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 654,
                                    ScaleY: 2785,
                                    Shear: 0,
                                    TranX: -74,
                                    TranY: 47,
                                    Var1: 179,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -596964880,
                                    Hue1: -799662353,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 8,
                                    Mir: false,
                                    Rot: 128,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 491,
                                    ScaleY: 327,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: 340,
                                    Var1: 16,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: 1681102295,
                                    Hue1: -799662353,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 9,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 245,
                                    ScaleY: 163,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: -330,
                                    Var1: 26,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -883491363,
                                    Hue1: -799662382,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 10,
                                    Mir: false,
                                    Rot: 0,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 1196,
                                    ScaleY: 98,
                                    Shear: 0,
                                    TranX: 0,
                                    TranY: -378,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -1696765903,
                                    Hue1: 0,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 11,
                                    Mir: false,
                                    Rot: 198,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 475,
                                    ScaleY: 475,
                                    Shear: 0,
                                    TranX: -354,
                                    TranY: -28,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }, {
                                    Hash: -1696765903,
                                    Hue1: 0,
                                    Hue2: 0,
                                    Hue3: 0,
                                    Hue4: 0,
                                    Layer: 12,
                                    Mir: false,
                                    Rot: 57,
                                    Sat1: 0,
                                    Sat2: 0,
                                    Sat3: 0,
                                    Sat4: 0,
                                    ScaleX: 475,
                                    ScaleY: 475,
                                    Shear: 0,
                                    TranX: 353,
                                    TranY: -37,
                                    Var1: 0,
                                    Var2: 0,
                                    Var3: 0,
                                    Var4: 0,
                                }]
                            },
                            VisualParts: {
                                VisualPartTrans: [{
                                    PartHash: 934109906,
                                    SlotHash: -966088147
                                }, {
                                    PartHash: 157183852,
                                    SlotHash: -1505530948
                                }, {
                                    PartHash: -1095823416,
                                    SlotHash: 2106784967
                                }, {
                                    PartHash: -48607787,
                                    SlotHash: 453545749
                                }, {
                                    PartHash: -273819714,
                                    SlotHash: -2126743923
                                }]
                            }
                        },
                        Durability: 100,
                        ExpirationDate: {},
                        Heat: 1,
                        Id: 1,
                        OwnershipType: 'PresetCar',
                    }
                }],
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
    getPersonaInformation(req: Request) {
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
                Cash: 50000,
                IconIndex: 26,
                Level: 2,
                Motto: 'Offline first, lets make it online!',
                Name: 'jasper199069',
                PercentToLevel: 0,
                PersonaId: 100,
                Rating: 1067.2999999999995,
                Rep: 0,
                RepAtCurrentLevel: 0,
                Score: 5400,
            }
        };
    }

    @Route('post', 'User/SecureLoginPersona')
    secureLoginPersona(req: Request) {
        // @TODO: This is an XMPP function.
        return {};
    }

    @Route('get', 'personas/inventory/objects')
    getInventoryObjects(req: Request) {
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
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0xdff5856a,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'trafficmagnet',
                        ExpirationDate: {},
                        Hash: 125509666,
                        InventoryId: 2,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x77b2022,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'instantcooldown',
                        ExpirationDate: {},
                        Hash: -1692359144,
                        InventoryId: 3,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x9b20a618,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'shield',
                        ExpirationDate: {},
                        Hash: -364944936,
                        InventoryId: 4,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0xea3f61d8,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'slingshot',
                        ExpirationDate: {},
                        Hash: 2236629,
                        InventoryId: 5,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x2220d5,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'ready',
                        ExpirationDate: {},
                        Hash: 957701799,
                        InventoryId: 6,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 49,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x39155ea7,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'juggernaut',
                        ExpirationDate: {},
                        Hash: 1805681994,
                        InventoryId: 7,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x6ba0854a,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'emergencyevade',
                        ExpirationDate: {},
                        Hash: -611661916,
                        InventoryId: 8,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0xdb8ac7a4,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'team_emergencyevade',
                        ExpirationDate: {},
                        Hash: -1564932069,
                        InventoryId: 9,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0xa2b9081b,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'nosshot',
                        ExpirationDate: {},
                        Hash: -1681514783,
                        InventoryId: 10,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 46,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x9bc61ee1,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'onemorelap',
                        ExpirationDate: {},
                        Hash: 1627606782,
                        InventoryId: 11,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x61034efe,
                        VirtualItemType: 'powerup',
                    }, {
                        EntitlementTag: 'team_slingshot',
                        ExpirationDate: {},
                        Hash: 1113720384,
                        InventoryId: 12,
                        ProductId: 'DO NOT USE ME',
                        RemainingUseCount: 50,
                        ResellPrice: 0.00000,
                        Status: 'ACTIVE',
                        StringHash: 0x42620640,
                        VirtualItemType: 'powerup',
                    }]
                }
            },
            PerformancePartsCapacity: 150,
            PerformancePartsUsedSlotCount: 0,
            SkillModPartsCapacity: 200,
            SkillModPartsUsedSlotCount: 0,
            VisualPartsCapacity: 300,
            VisualPartsUsedSlotCount: 0,
        };
    }

    @Route('post', 'DriverPersona/GetPersonaBaseFromList')
    getBaseFromList(req: Request) {
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
                    IconIndex: 26,
                    Level: 2,
                    Motto: 'Offline first, lets make it online!',
                    Name: 'jasper199069',
                    PersonaId: 100,
                    Presence: 1,
                    Score: 5400,
                    UserId: 11111111,
                }]
            }
        };
    }

    @Route('post', 'DriverPersona/ReserveName')
    async reserveName(req: Request): Promise<any> {
        let name = req.query.name as string,
            existingPersonas = await Persona.find({
                name
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
    async createPersona(req: any): Promise<any> {
        let persona = new Persona();
        persona.user = req.user;

        console.log(req.body);
        console.log(req.headers);

        return {};
    }
}