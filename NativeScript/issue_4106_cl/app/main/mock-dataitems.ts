export class GroupTitle {
    constructor(public title: string) { }
}

var mockedDescription = "Der Pop- und Gospelchor Dossenbach begeisterte am Samstag in den Städten der Region Grenzach-Wyhlen. Bei strahlendem Sonnenschein startete der Pop- und Gospelchor Dossenbach am vergangenen Samstag seine diesjährige „Singing Christmas Truck Tour 2016“.";

var mockedDescriptionType2 = "Soziales | Geschwister kühn mit Stand für die Aktion Mensch bei Hieber.Grenzach-Wyhlen (mv) Die Aktion Mensch ist seit vielen Jahren in der Doppelgemeinde mit dem sozialen Wirken der Geschwister Kühn verbunden.";

var mockedDescriptionType3 = "Whisky-Fans kamen kürzlich im Hieber-Markt in Grenzach voll auf ihre Kosten.";

var mockedDescriptionType4 = "Die VHS Grenzach-Wyhlen und Hieber haben zum wiederholten Mal „Kultur im Supermarkt“ veranstaltet.";

var chatmessage = "Sample Chat Message";

export class Country {
    constructor(public name: string, public imageSrc: string, public continent: string, public desc: string) { }
}


export class GroupFooter {
    constructor(public description: string) { }
}

export var mockedDataArray = [
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber2.png", "", mockedDescriptionType2),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescriptionType3),
    new Country("Hieber", "~/images/hieber/hieber2.png", "", mockedDescriptionType2),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescriptionType4),
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber2.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescriptionType2),
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescriptionType3),
    new Country("Hieber", "~/images/hieber/hieber2.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescriptionType2),
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescriptionType4),
    new Country("Hieber", "~/images/hieber/hieber2.png", "", mockedDescription),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescriptionType2),
    new Country("Hieber", "~/images/hieber/hieber1.png", "", mockedDescriptionType4),
    new Country("Hieber", "~/images/hieber/hieber3.png", "", mockedDescriptionType3),
]



export class Chat {
    constructor(public name: string, public imageSrc: string, public messages: string) { }
}

export var mokedChatArray = [

    new Chat("Parth", "~/images/hieber/hieber1.png", chatmessage),
    new Chat("Tarek", "~/images/hieber/hieber2.png", chatmessage),

    new Chat("Tobias", "~/images/hieber/hieber3.png", chatmessage),
    new Chat("Rene", "~/images/hieber/hieber3.png", chatmessage),

    new Chat("Michel", "~/images/hieber/hieber1.png", chatmessage),
    new Chat("Steave", "~/images/hieber/hieber2.png", chatmessage),

    new Chat("Stefan", "~/images/hieber/hieber1.png", chatmessage),
    new Chat("Julian", "~/images/hieber/hieber3.png", chatmessage),

    new Chat("Robert", "~/images/hieber/hieber2.png", chatmessage),
    new Chat("Clerk", "~/images/hieber/hieber1.png", chatmessage),

    new Chat("Ricky", "~/images/hieber/hieber1.png", chatmessage),
    new Chat("Elester cook", "~/images/hieber/hieber3.png", chatmessage),
]