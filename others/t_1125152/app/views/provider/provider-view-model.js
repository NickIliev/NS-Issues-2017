var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var utility = require("~/common/utility");
var imageSource = require("image-source");

var ViewModel = require("~/common/view-model-base")
var constants = require("~/common/constants");

var htmlviewCSSopen = "<span style=font-family:FontAwesome,fontawesome-webfont;font-size:18;color:#7c7c7c;overflow:scroll;padding-right:9;>";
var htmlviewCSSClose = "</span>";
function ProviderViewModel() {
    var data = {
        pageTitle: "Provider Details",
        isLoading: true,
        selectedProvider: new Observable({
            FullName: "",
            Image: "",
            Specialties: "",
            Certifications: [],
            Educations: [],
            Locations: [],
            Rating: "",
            Stars: ""
        }),
        zocDocWidget: null,
        selectedScreen: "tap1",
        biotab: "show",
        //awardtab: "show",
        industrytab: "show",
        Certificationstab: "show",
        Educationstab: "show",
        Locationstab: "show",
        Expertisetab: "show",
        Insurancestab: "show"

    };
    var viewModel = new ViewModel(data);

    viewModel.load = function (providerId) {
        var that = this;

        that.set("isLoading", true);
        console.log("load started");
        // clear previous data
        that.set("selectedProvider", {
            FullName: "",
            Image: "",
            Specialties: "",
            Certification: [],
            Educations: [],
            Locations: [],
            Rating: "",
            Stars: ""
        });

        var requestOptions = {
            url: constants.apiUrl + "Provider/Get/" + providerId,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };

        return utility.httpRequest(that, requestOptions,
            function (response) { // success callback
                console.log("got http response");
                var provider = response.content.toJSON().Data;
                //provider.Specialties = that.getSpecialtiesText(provider.Specialties);

                provider.AppointmentPhone = utility.formatPhoneNumber(provider.AppointmentPhone);
                provider.Stars = that.starRating(provider.Rating);
                console.log("Stars " + provider.Stars);
                if (provider.Locations) {
                    provider.Locations.forEach(function (item) {
                        item.Address = item.Address1 + ', ' +
                                    (item.Address2 ? item.Address2 + ', ' : '');

                        item.City = item.City + ', ' +
                                    item.State + ' ' +
                                    item.PostalCode;

                        item.AppointmentPhone = utility.formatPhoneNumber(item.AppointmentPhone);
                    });
                }
                //Provider Bio Hide and Show based on conditions
                if (provider.Bio == "" || provider.Bio == null){
                    
                    if(provider.VideoSnippetHTML != "" && provider.VideoSnippetHTML != null){
                        provider.Bio = htmlviewCSSopen + provider.VideoSnippetHTML+ htmlviewCSSClose;
                        that.set("biotab", "show");
                    } else {
                        provider.Bio = htmlviewCSSopen + "Bio not available" +provider.VideoSnippetHTML+ htmlviewCSSClose;
                        that.set("biotab", "hide");
                    }
                    //that.set("biotab", "hide");
                }
                else {
                    provider.Bio = htmlviewCSSopen + provider.VideoSnippetHTML + provider.Bio + htmlviewCSSClose;
                    that.set("biotab", "show");
                }

                //if (provider.AwardsRecognition == "") {
                //    // provider.AwardsRecognition = htmlviewCSSopen + "Awards not available" + htmlviewCSSClose;
                //    that.set("awardtab", "hide");
                //}
                //else {
                //    provider.AwardsRecognition = htmlviewCSSopen + provider.AwardsRecognition + htmlviewCSSClose;
                //    that.set("awardtab", "show");
                //}
                if (provider.IndustryRelationships == "") {
                    provider.IndustryRelationships = htmlviewCSSopen + "Industry Relationships not available" + htmlviewCSSClose;
                    that.set("industrytab", "hide");
                }
                else {
                    provider.IndustryRelationships = htmlviewCSSopen + provider.IndustryRelationships + htmlviewCSSClose;
                    that.set("industrytab", "show");
                }
                if (provider.Certifications.length > 0)
                    that.set("Certificationstab", "show");
                else
                    that.set("Certificationstab", "show");

                if (provider.Educations.length > 0)
                    that.set("Educationstab", "show");
                else
                    that.set("Educationstab", "show");

                if (provider.Educations.length < 0 && provider.Certifications.length < 0) {
                    that.set("Certificationstab", "hide");
                    that.set("Educationstab", "hide");
                }

                if (provider.Locations != null)
                    that.set("Locationstab", "show");
                else
                    that.set("Locationstab", "show");
                if (provider.SpecialInterests.length > 0)
                    that.set("Expertisetab", "show");
                else
                    that.set("Expertisetab", "hide");
                if (provider.Insurances.length > 0)
                    that.set("Insurancestab", "show");
                 else
                     that.set("Insurancestab", "hide");

                that.set("selectedProvider", provider);

                // if(provider.ZocDocId) {
                //     that.notify({ eventName: "setZocDocWidget", ZocDocId: provider.ZocDocId });
                // }
                that.notify({ eventName: "doneLoadingProviderDetails" });
                that.set("isLoading", false);
                console.log("load completed");
            },
            function () { // error callback
            });
    };

    viewModel.getSpecialtiesText = function (specialties) {
        var specialtiesText = "";

        specialties.forEach(function (specialty) {
            specialtiesText += specialty + ", ";
        });

        if (specialtiesText.length > 0) {
            specialtiesText = specialtiesText.substring(0, specialtiesText.length - 2);
        }

        return specialtiesText;
    };
    viewModel.starRating = function (rating) {
        if (rating != null) {
            rating = rating * 18;
        } else {
            rating = null;
        }
        return rating;
    };


    return viewModel;
}



module.exports = ProviderViewModel;