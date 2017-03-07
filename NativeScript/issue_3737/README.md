the issue is caused by wrapping an Angular content (e.g. page-router -outlet or ng-content) in FlexBoxLayout.
Look at the code snippet in app.component.html for details.

Reproducible with N 2.5.0 under iOS (works on Android)