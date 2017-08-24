# NativeScript DoubleReturnPress

This project is created to illustrate a defect in Nativescript.

Problem: The ReturnPressEvent is fired twice for text-fields with returnKeyType 'go', 'search' or 'send' on Android phones.
The issue is easily reproducable by starting up the app and pressing the different return keys. Every press should increase the count with 1 but for the retur keys with type 'go', 'search' or 'send the count is increased with 2. 
