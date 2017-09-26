(function () {
    console.log("index.js loaded");
    var oWebViewInterface = window.nsWebViewInterface;
    var languageDD = document.getElementById('knownLanguage');

    /**
     * Registers handlers for native events.
     */
    function addNativeMsgListener() {
        oWebViewInterface.on('loadLanguages', function (arrLanguages) {
            for (var i = 0; i < arrLanguages.length; i++) {
                addLanguageOption(arrLanguages[i]);
            }
        });
    }
    
    /**
     * Defines global functions which will be called from andorid/ios
     */
    function defineNativeInterfaceFunctions(){
        window.addNewLanguage = function (location) {

            $(document).ready(function () {
                $("#fullName").text('');
                $("#specialty").text('');
                $("#address").text('');
                $('#calendar').fullCalendar('destroy');
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next',
                        center: 'title',
                        right: 'month,listYear'
                    },
                    eventClick: function (event) {
                        var date = {
                            "start": event.AppointmentDate,
                            "AppointmentTypeId": event.AppointmentTypeId,
                            "AppointmentDate": event.AppointmentDate,
                            "AppointmentTime": event.AppointmentTime,
                            "DepartmentID": event.DepartmentID,
                            "ProviderID": event.ProviderID,
                            "AppointmentId": event.AppointmentId,
                            "DateView": event.DateView
                        };
                        sendSelectedValue(date);
                    },
                    weekends: false,
                    aspectRatio: .9,
                    //defaultDate: '2016-12-12',
                    navLinks: true, // can click day/week names to navigate views
                    editable: false,
                    eventLimit: true, // allow "more" link when too many events
                    events: createEvents(location)
                });

            });
        };
        window.destroyWebView = function () {
            $(document).ready(function () {
                $('#calendar').html('');
                console.log("destroy");
            })
        }
    }

    function createEvents(location) {
        //console.log(JSON.stringify(location));
        var events = [];
        var fullName;
        var specialty;
        var address = location.Location.Address1 + ', ' + location.Location.City + ', ' + location.Location.State + ' ' + location.Location.PostalCode;
        events.length = 0;
        location.Appointments.forEach(function (item) {
            fullName = item.FullName;
            specialty = item.Specialty;
            item.AppointmentByDay.forEach(function (item) {
                item.AppointmentDate = item.AppointmentDate.split("T");
                item.AppointmentDate = item.AppointmentDate[0] + "T" + item.StartTime;
                events.push({
                    "start": item.AppointmentDate,
                    "AppointmentTypeId": item.AppointmentTypeId, 
                    "AppointmentDate": item.AppointmentDate, 
                    "AppointmentTime": item.AppointmentTime,
                    "DepartmentID": item.DepartmentID,
                    "ProviderID": item.ProviderID,
                    "AppointmentId": item.AppointmentId,
                    "DateView":item.DateView
                });
            })
        });
        //console.log(JSON.stringify(events));
        $("#fullName").text(fullName);
        $("#specialty").text(specialty);
        $("#address").text(address);
        return events;
    }
    
    function addLanguageOption(language){
        var option = document.createElement('Option');
        option.text = language;
        option.value = language;
        languageDD.appendChild(option);
    }
    
    function sendSelectedValue(event) {
        //console.log(event);
        oWebViewInterface.emit('languageSelection', event);
    }

    function init() {
        addNativeMsgListener();
        defineNativeInterfaceFunctions();
        
        document.body.onload = function () {
            oWebViewInterface.emit('onload');
            console.log("body onload");
        }
    }
    init();
})();