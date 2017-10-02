import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private rows: Array<any> = [
        { "timestamp": 1506808900000, "series1": 59798, "series2": 58224 }, { "timestamp": 1506809500000, "series1": 59700, "series2": 58286 },
        { "timestamp": 1506810100000, "series1": 59550, "series2": 58266 }, { "timestamp": 1506810700000, "series1": 59551, "series2": 58261 },
        { "timestamp": 1506811300000, "series1": 59550, "series2": 58325 }, { "timestamp": 1506811900000, "series1": 59600, "series2": 58419 },
        { "timestamp": 1506812500000, "series1": 59600, "series2": 58335 }, { "timestamp": 1506813100000, "series1": 59550, "series2": 58355 },
        { "timestamp": 1506813700000, "series1": 59550, "series2": 58353 }, { "timestamp": 1506814300000, "series1": 59550, "series2": 58334 },
        { "timestamp": 1506814900000, "series1": 59505, "series2": 58356 }, { "timestamp": 1506815500000, "series1": 59505, "series2": 58436 },
        { "timestamp": 1506816100000, "series1": 59400, "series2": 58421 }, { "timestamp": 1506816700000, "series1": 59409, "series2": 58536 },
        { "timestamp": 1506817300000, "series1": 59552, "series2": 58597 }, { "timestamp": 1506817900000, "series1": 59552, "series2": 58706 },
        { "timestamp": 1506818500000, "series1": 59550, "series2": 58591 }, { "timestamp": 1506819100000, "series1": 59551, "series2": 58553 },
        { "timestamp": 1506819700000, "series1": 59400, "series2": 58351 }, { "timestamp": 1506820300000, "series1": 59552, "series2": 58260 },
        { "timestamp": 1506820900000, "series1": 59400, "series2": 58087 }, { "timestamp": 1506821501000, "series1": 59350, "series2": 58133 },
        { "timestamp": 1506822100000, "series1": 59350, "series2": 58206 }, { "timestamp": 1506822700000, "series1": 59350, "series2": 58209 },
        { "timestamp": 1506823300000, "series1": 59350, "series2": 58141 }, { "timestamp": 1506823901000, "series1": 59350, "series2": 58097 },
        { "timestamp": 1506824501000, "series1": 59350, "series2": 57855 }, { "timestamp": 1506825101000, "series1": 59350, "series2": 57970 },
        { "timestamp": 1506825700000, "series1": 59302, "series2": 57812 }, { "timestamp": 1506826301000, "series1": 59301, "series2": 57909 },
        { "timestamp": 1506826901000, "series1": 59302, "series2": 57613 }, { "timestamp": 1506827500000, "series1": 59003, "series2": 57888 },
        { "timestamp": 1506828100000, "series1": 59000, "series2": 57903 }, { "timestamp": 1506828701000, "series1": 58801, "series2": 57663 },
        { "timestamp": 1506829301000, "series1": 59050, "series2": 57765 }, { "timestamp": 1506829901000, "series1": 59556, "series2": 57955 },
        { "timestamp": 1506830501000, "series1": 59570, "series2": 57955 }, { "timestamp": 1506831101000, "series1": 59750, "series2": 57967 },
        { "timestamp": 1506831701000, "series1": 59781, "series2": 57762 }, { "timestamp": 1506832301000, "series1": 59796, "series2": 57834 },
        { "timestamp": 1506832901000, "series1": 59798, "series2": 58013 }, { "timestamp": 1506833501000, "series1": 59800, "series2": 57952 },
        { "timestamp": 1506834101000, "series1": 59800, "series2": 57910 }, { "timestamp": 1506834701000, "series1": 59798, "series2": 57666 },
        { "timestamp": 1506835301000, "series1": 59750, "series2": 57788 }, { "timestamp": 1506835901000, "series1": 59749, "series2": 58059 },
        { "timestamp": 1506836501000, "series1": 59750, "series2": 57856 }, { "timestamp": 1506837101000, "series1": 59750, "series2": 57930 },
        { "timestamp": 1506837701000, "series1": 59587, "series2": 57947 }, { "timestamp": 1506838301000, "series1": 59587, "series2": 58144 },
        { "timestamp": 1506838901000, "series1": 59586, "series2": 57995 }, { "timestamp": 1506839501000, "series1": 59587, "series2": 58070 },
        { "timestamp": 1506840101000, "series1": 59600, "series2": 58028 }, { "timestamp": 1506840701000, "series1": 59693, "series2": 58073 },
        { "timestamp": 1506841301000, "series1": 59600, "series2": 57942 }, { "timestamp": 1506841901000, "series1": 59605, "series2": 58039 },
        { "timestamp": 1506842501000, "series1": 59604, "series2": 57992 }, { "timestamp": 1506843101000, "series1": 59604, "series2": 58244 },
        { "timestamp": 1506843701000, "series1": 59700, "series2": 58232 }, { "timestamp": 1506844301000, "series1": 59793, "series2": 58235 },
        { "timestamp": 1506844901000, "series1": 59796, "series2": 58287 }, { "timestamp": 1506845501000, "series1": 59797, "series2": 58099 },
        { "timestamp": 1506846101000, "series1": 59771, "series2": 57861 }, { "timestamp": 1506846701000, "series1": 59700, "series2": 57990 },
        { "timestamp": 1506847301000, "series1": 59602, "series2": 57770 }, { "timestamp": 1506847902000, "series1": 59601, "series2": 57782 },
        { "timestamp": 1506848501000, "series1": 59600, "series2": 57920 }, { "timestamp": 1506849101000, "series1": 59550, "series2": 57938 },
        { "timestamp": 1506849702000, "series1": 59598, "series2": 57896 }, { "timestamp": 1506850302000, "series1": 59600, "series2": 57885 },
        { "timestamp": 1506850901000, "series1": 59601, "series2": 57842 }, { "timestamp": 1506851502000, "series1": 59599, "series2": 57774 },
        { "timestamp": 1506852102000, "series1": 59601, "series2": 57824 }, { "timestamp": 1506852702000, "series1": 59600, "series2": 57903 },
        { "timestamp": 1506853302000, "series1": 59600, "series2": 57899 }, { "timestamp": 1506853902000, "series1": 59650, "series2": 58020 },
        { "timestamp": 1506854502000, "series1": 59697, "series2": 58044 }, { "timestamp": 1506855102000, "series1": 59717, "series2": 57977 },
        { "timestamp": 1506855702000, "series1": 59750, "series2": 57977 }, { "timestamp": 1506856302000, "series1": 59769, "series2": 58004 },
        { "timestamp": 1506856902000, "series1": 59770, "series2": 57977 }, { "timestamp": 1506857502000, "series1": 59770, "series2": 58044 },
        { "timestamp": 1506858102000, "series1": 59768, "series2": 57977 }, { "timestamp": 1506858701000, "series1": 59603, "series2": 57924 },
        { "timestamp": 1506859302000, "series1": 59594, "series2": 57666 }, { "timestamp": 1506859902000, "series1": 59698, "series2": 57403 },
        { "timestamp": 1506860502000, "series1": 59638, "series2": 57380 }, { "timestamp": 1506861102000, "series1": 59613, "series2": 57410 },
        { "timestamp": 1506861702000, "series1": 59506, "series2": 57344 }, { "timestamp": 1506862302000, "series1": 59476, "series2": 57329 },
        { "timestamp": 1506862902000, "series1": 59399, "series2": 57140 }, { "timestamp": 1506863502000, "series1": 59104, "series2": 57179 },
        { "timestamp": 1506864102000, "series1": 59001, "series2": 57243 }, { "timestamp": 1506864702000, "series1": 59001, "series2": 56991 },
        { "timestamp": 1506865302000, "series1": 59000, "series2": 57012 }, { "timestamp": 1506865903000, "series1": 59000, "series2": 57194 },
        { "timestamp": 1506866502000, "series1": 59001, "series2": 57306 }, { "timestamp": 1506867102000, "series1": 59001, "series2": 57369 },
        { "timestamp": 1506867702000, "series1": 59000, "series2": 57380 }, { "timestamp": 1506868302000, "series1": 59001, "series2": 57382 },
        { "timestamp": 1506868903000, "series1": 59001, "series2": 57347 }, { "timestamp": 1506869502000, "series1": 59001, "series2": 57396 },
        { "timestamp": 1506870103000, "series1": 59002, "series2": 57456 }, { "timestamp": 1506870702000, "series1": 59005, "series2": 57396 },
        { "timestamp": 1506871302000, "series1": 59290, "series2": 57600 }, { "timestamp": 1506871902000, "series1": 59492, "series2": 57590 },
        { "timestamp": 1506872502000, "series1": 59066, "series2": 57524 }, { "timestamp": 1506873102000, "series1": 59002, "series2": 57567 },
        { "timestamp": 1506873702000, "series1": 59200, "series2": 57666 }, { "timestamp": 1506874303000, "series1": 59199, "series2": 57666 },
        { "timestamp": 1506874903000, "series1": 59200, "series2": 57734 }, { "timestamp": 1506875502000, "series1": 59300, "series2": 57855 },
        { "timestamp": 1506876103000, "series1": 59491, "series2": 57837 }, { "timestamp": 1506876703000, "series1": 59529, "series2": 57806 },
        { "timestamp": 1506877303000, "series1": 59529, "series2": 57719 }, { "timestamp": 1506877902000, "series1": 59529, "series2": 57785 },
        { "timestamp": 1506878503000, "series1": 59023, "series2": 57770 }, { "timestamp": 1506879103000, "series1": 59062, "series2": 57707 },
        { "timestamp": 1506879703000, "series1": 59109, "series2": 57724 }, { "timestamp": 1506880303000, "series1": 59108, "series2": 57721 },
        { "timestamp": 1506880903000, "series1": 59106, "series2": 57774 }, { "timestamp": 1506881503000, "series1": 59109, "series2": 57762 },
        { "timestamp": 1506882103000, "series1": 59239, "series2": 57768 }, { "timestamp": 1506882703000, "series1": 59152, "series2": 57774 },
        { "timestamp": 1506883303000, "series1": 59110, "series2": 57801 }, { "timestamp": 1506883904000, "series1": 59107, "series2": 57801 },
        { "timestamp": 1506884503000, "series1": 59124, "series2": 57842 }, { "timestamp": 1506885103000, "series1": 59125, "series2": 57936 },
        { "timestamp": 1506885703000, "series1": 59124, "series2": 57854 }, { "timestamp": 1506886303000, "series1": 59125, "series2": 57828 },
        { "timestamp": 1506886903000, "series1": 59125, "series2": 57936 }, { "timestamp": 1506887503000, "series1": 59125, "series2": 57936 },
        { "timestamp": 1506888104000, "series1": 59124, "series2": 57936 }, { "timestamp": 1506888703000, "series1": 59125, "series2": 57955 },
        { "timestamp": 1506889303000, "series1": 59144, "series2": 57983 }, { "timestamp": 1506889903000, "series1": 59400, "series2": 58153 },
        { "timestamp": 1506890503000, "series1": 59399, "series2": 58139 }, { "timestamp": 1506891103000, "series1": 59400, "series2": 58315 },
        { "timestamp": 1506891703000, "series1": 59400, "series2": 58260 }, { "timestamp": 1506892303000, "series1": 59400, "series2": 58321 },
        { "timestamp": 1506892903000, "series1": 59400, "series2": 58258 }, { "timestamp": 1506893503000, "series1": 59400, "series2": 58355 },
        { "timestamp": 1506894103000, "series1": 59400, "series2": 58301 }, { "timestamp": 1506894703000, "series1": 59400, "series2": 58236 },
        { "timestamp": 1506895303000, "series1": 59399, "series2": 58423 }, { "timestamp": 1506895903000, "series1": 59400, "series2": 58536 },
        { "timestamp": 1506896504000, "series1": 59399, "series2": 58528 }, { "timestamp": 1506897104000, "series1": 59399, "series2": 58558 },
        { "timestamp": 1506897703000, "series1": 59439, "series2": 58720 }, { "timestamp": 1506898303000, "series1": 59450, "series2": 58803 },
        { "timestamp": 1506898903000, "series1": 59500, "series2": 58630 }, { "timestamp": 1506899504000, "series1": 59499, "series2": 58602 },
        { "timestamp": 1506900104000, "series1": 59500, "series2": 58828 }, { "timestamp": 1506900703000, "series1": 59499, "series2": 58855 },
        { "timestamp": 1506901304000, "series1": 59500, "series2": 58884 }, { "timestamp": 1506901904000, "series1": 59599, "series2": 59084 },
        { "timestamp": 1506902504000, "series1": 59599, "series2": 59123 }, { "timestamp": 1506903104000, "series1": 59599, "series2": 59188 },
        { "timestamp": 1506903704000, "series1": 59613, "series2": 59047 }, { "timestamp": 1506904304000, "series1": 59613, "series2": 58956 },
        { "timestamp": 1506904904000, "series1": 59637, "series2": 59261 }, { "timestamp": 1506905504000, "series1": 59640, "series2": 59418 },
        { "timestamp": 1506906104000, "series1": 59646, "series2": 59665 }, { "timestamp": 1506906704000, "series1": 59650, "series2": 59570 },
        { "timestamp": 1506907304000, "series1": 59774, "series2": 59337 }, { "timestamp": 1506907904000, "series1": 59774, "series2": 59295 },
        { "timestamp": 1506908504000, "series1": 59775, "series2": 59306 }, { "timestamp": 1506909104000, "series1": 59775, "series2": 59193 },
        { "timestamp": 1506909704000, "series1": 59775, "series2": 59342 }, { "timestamp": 1506910304000, "series1": 59774, "series2": 59156 },
        { "timestamp": 1506910904000, "series1": 59774, "series2": 59220 }, { "timestamp": 1506911504000, "series1": 59777, "series2": 59185 },
        { "timestamp": 1506912104000, "series1": 59777, "series2": 59017 }, { "timestamp": 1506912704000, "series1": 59777, "series2": 59017 },
        { "timestamp": 1506913304000, "series1": 59776, "series2": 59064 }, { "timestamp": 1506913904000, "series1": 59776, "series2": 58977 },
        { "timestamp": 1506914504000, "series1": 59776, "series2": 58976 }, { "timestamp": 1506915104000, "series1": 59900, "series2": 58943 },
        { "timestamp": 1506915704000, "series1": 59900, "series2": 59074 }, { "timestamp": 1506916304000, "series1": 59992, "series2": 59026 },
        { "timestamp": 1506916904000, "series1": 59992, "series2": 59240 }, { "timestamp": 1506917504000, "series1": 59993, "series2": 59219 },
        { "timestamp": 1506918104000, "series1": 59999, "series2": 59233 }, { "timestamp": 1506918704000, "series1": 60000, "series2": 59333 },
        { "timestamp": 1506919304000, "series1": 59999, "series2": 59235 }, { "timestamp": 1506919904000, "series1": 59999, "series2": 59152 },
        { "timestamp": 1506920505000, "series1": 60000, "series2": 59168 }, { "timestamp": 1506921104000, "series1": 60000, "series2": 59192 },
        { "timestamp": 1506921704000, "series1": 59999, "series2": 59305 }, { "timestamp": 1506922304000, "series1": 60149, "series2": 59296 },
        { "timestamp": 1506922904000, "series1": 60499, "series2": 59354 }, { "timestamp": 1506923504000, "series1": 60599, "series2": 59465 },
        { "timestamp": 1506924104000, "series1": 60751, "series2": 59541 }, { "timestamp": 1506924704000, "series1": 60997, "series2": 59498 },
        { "timestamp": 1506925304000, "series1": 61499, "series2": 59530 }, { "timestamp": 1506925905000, "series1": 61498, "series2": 59422 },
        { "timestamp": 1506926504000, "series1": 61000, "series2": 59449 }, { "timestamp": 1506927104000, "series1": 61461, "series2": 59530 },
        { "timestamp": 1506927705000, "series1": 61486, "series2": 59530 }, { "timestamp": 1506928304000, "series1": 61606, "series2": 59652 },
        { "timestamp": 1506928905000, "series1": 61760, "series2": 59679 }, { "timestamp": 1506929505000, "series1": 61784, "series2": 59611 },
        { "timestamp": 1506930105000, "series1": 61782, "series2": 59571 }, { "timestamp": 1506930704000, "series1": 61351, "series2": 59422 },
        { "timestamp": 1506931304000, "series1": 61263, "series2": 59192 }, { "timestamp": 1506931905000, "series1": 61261, "series2": 59506 },
        { "timestamp": 1506932505000, "series1": 61492, "series2": 59360 }, { "timestamp": 1506933105000, "series1": 61349, "series2": 59443 },
        { "timestamp": 1506933313389, "series1": 61348, "series2": 59476 }];

    constructor() {
        super();

    }

    get dataItems(): Array<any> {
        let newRows: Array<any> = [];

        this.rows.forEach(row => {
            var newRow = { timestamp: new Date(row.timestamp), series1: row.series1, series2: row.series2 }
            newRows.push(newRow);
        });

        return newRows;
    }

    set dataItems(value: Array<any>) {
        if (this.rows !== value) {
            this.rows = value;
            this.notifyPropertyChange('rows', value)
        }
    }

}