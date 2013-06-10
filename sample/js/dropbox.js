var dropbox = (function() {

    var pluginName = "org.coenraets.DropboxPlugin";

    var link = function() {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                setTimeout(function() {
                    deferred.resolve(result);
                }, 1000);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "link", [""]);
        return deferred.promise();
    }

    var checkLink = function() {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "checkLink", [""]);
        return deferred.promise();
    }

    var unlink = function() {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "unlink", [""]);
        return deferred.promise();
    }

    var listFolder = function(path) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                alert("getFiles error");
                console.log("getFiles error");
                deferred.reject(error);
            },
            pluginName, "listFolder", [path]);
        return deferred.promise();
    }

    var addObserver = function(path) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                alert("addObserver result");
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject(error);
            },
            pluginName, "addObserver", [path]);
        return deferred.promise();
    }

    var readData = function (fileName) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "readData", [fileName]);
        return deferred.promise();
    }

    var readString = function (fileName) {
        var deferred = $.Deferred();
        Cordova.exec(
            function(result) {
                deferred.resolve(result);
            },
            function(error) {
                deferred.reject();
            },
            pluginName, "readString", [fileName]);
        return deferred.promise();
    }

    return {
        link: link,
        checkLink: checkLink,
        unlink: unlink,
        listFolder: listFolder,
        addObserver: addObserver,
        readData: readData,
        readString: readString
    }

}());