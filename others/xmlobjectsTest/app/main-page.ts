import { EventData } from 'data/observable';
import { Page } from 'ui/page';

import XmlObjects = require('nativescript-xmlobjects');

export function navigatingTo(args: EventData) {
    var doc = XmlObjects.parse(`<PurchaseOrder PurchaseOrderNumber="99503" OrderDate="1999-10-20">
  <Address Type="Shipping">
    <Name>Ellen Adams</Name>
    <Street>123 Maple Street</Street>
    <City>Mill Valley</City>
    <State>CA</State>
    <Zip>10999</Zip>
    <Country>USA</Country>
  </Address>
  <Address Type="Billing">
    <Name>Tai Yee</Name>
    <Street>8 Oak Avenue</Street>
    <City>Old Town</City>
    <State>PA</State>
    <Zip>95819</Zip>
    <Country>USA</Country>
  </Address>
  <DeliveryNotes>Please leave packages in shed by driveway.</DeliveryNotes>
  <Items>
    <Item PartNumber="872-AA">
      <ProductName>Lawnmower</ProductName>
      <Quantity>1</Quantity>
      <USPrice>148.95</USPrice>
      <Comment>Confirm this is electric</Comment>
    </Item>
    <Item PartNumber="926-AA">
      <ProductName>Baby Monitor</ProductName>
      <Quantity>2</Quantity>
      <USPrice>39.98</USPrice>
      <ShipDate>1999-05-21</ShipDate>
    </Item>
  </Items>
</PurchaseOrder>`);

    // XElement
    var rootElement = doc.root;

    // XElement[]
    var allChildElements = rootElement.elements();

    var addressElements = rootElement.elements('Address');
    for (var i = 0; i < addressElements.length; i++) {
        var ae = addressElements[i];

        // XAttribute
        var typeAttribute = ae.attribute('Type');
        console.log('Type attribute: ' + typeAttribute.value);
    }

    // XNode[]
    var allNodes = rootElement.nodes();
    for (var i = 0; i < allNodes.length; i++) {
        var n = allNodes[i];

        if (n instanceof XmlObjects.XElement) {
            // XAttribute[]
            var allAttributes = n.attributes();  // the attributes

            console.log("I am an element with attributes: " + n.value);
        }
        else if (n instanceof XmlObjects.XComment) {
            console.log("I am a comment: " + n.value);
        }
        else if (n instanceof XmlObjects.XText) {
            console.log("I am a text." + n.value);
        }
        else if (n instanceof XmlObjects.XCData) {
            console.log("I am a CDATA: " + n.value);
        }
    }

    // create XML string
    var xmlStr = rootElement.toString();
}


