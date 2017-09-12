export class HomeModel {
    "user": User;
    "Financial": Financial;
    "pcpDoctors": [PcpDoctors];
    "claims": [Claims];
}

export class User {
    "firstName": string;
}
export class Financial {
    "attentionCount": number;
    "reimbursementsCount": number;
    "chart": ChartValues[];
}

export class PcpDoctors {
    "doctor_name": string;
    "specialist": string;
    "hospitalName": string;
}

export class Claims {
    "newClaims": number;
    "type": string;
    "covered": string;
    "status": string;
}

export class Article {
    "title": string;
    "subtitle": string;
    "description": string;
    "category": string;
    "rowNum": number;
    "imageURL": string;
    "titleImageURL": string;
}

export class HealthyLiving {
    "main_article": Article;
    "sub_articles": [Article];
}

export class ChartValues {
    "account": string;
    "year": string;
    "available": number;
    "invested": number;
    "ytd": number;
    "leftOver": number;
    "yrMax": number;
}

export class ChartPlotVlaues {
    "account": string;
    "year": string;
    "available": number;
    "invested": number;
    "ytd": number;
    "leftOver": number;
    "yrMax": number;
    "availablePlot": number;
    "investedPlot": number;
    "ytdPlot": number;
    "leftOverPlot": number;

}