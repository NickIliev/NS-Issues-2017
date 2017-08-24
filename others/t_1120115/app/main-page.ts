import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import { Label } from "ui/label";

import { setResources, getResources } from "application";

let source = new HelloWorldModel();

export function loaded(args: EventData) {
    let page = <Page>args.object;

    var dateConverter = {
        toView: (value, format) => {
            var result = format;
            var day = value.getDate();
            result = result.replace("DD", day < 10 ? "0" + day : day);
            var month = value.getMonth() + 1;
            result = result.replace("MM", month < 10 ? "0" + month : month);
            result = result.replace("YYYY", value.getFullYear());
            return result;
        },
        toModel: (value, format) => {
            var ddIndex = format.indexOf("DD");
            var day = parseInt(value.substr(ddIndex, 2));
            var mmIndex = format.indexOf("MM");
            var month = parseInt(value.substr(mmIndex, 2));
            var yyyyIndex = format.indexOf("YYYY");
            var year = parseInt(value.substr(yyyyIndex, 4));
            var result = new Date(year, month - 1, day);
            return result;
        }
    }

    var labelControl = new Label();

    labelControl.bind({
        sourceProperty: 'testDate',
        targetProperty: 'text',
        twoWay: false,
        expression: "testDate | dateConverter('DD.MM.YYYY')"
    });

    source.set("dateConverter", dateConverter);
    source.set("testDate", new Date());

    var appResurces = getResources();
    appResurces['dateConverter'] = dateConverter;
    appResurces['dateFormat'] = "DD.MM.YYYY";
    console.dir(appResurces);

    page.bindingContext = source;
    page.content = labelControl;
}