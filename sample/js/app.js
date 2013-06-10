var app = (function() {

    var w = $("#content").width(),
        h = $("#content").height();

    var listFolder = function() {
        var i,
            l,
            html = "",
            file;
        dropbox.listFolder(app.path).done(function (files) {
            l = files.length;
            if (l > 0) {
                $("#noFiles").hide();
            } else {
                $("#noFiles").show();
            }
            for (i=0; i<l; i++) {
                file = files[i];
                html += '<li class="topcoat-list__item"><a href="#' + encodeURIComponent(file.path)+ '"' + (file.isFolder ? '' : ' class="file"') +
                    '><img src="img/' + (file.isFolder ? 'icon-folder' : 'icon-file') + '.png" />' +
                    file.path.substr(file.path.lastIndexOf("/") + 1)  + '</li>';
            }
            $("#fileList").html(html);
        });
    };

    var showWelcomeView = function() {
        $("#fileList").empty();
        $("#filePath").html("&nbsp;");
        $("#image").attr("src", "");
        $("#text").html("");
        $("#appView").hide();
        $("#welcomeView").show();
    };

    var showAppView = function() {
        $("#appView").show();
        $("#welcomeView").hide();
        app.path = "/";
        app.listFolder();
        dropbox.addObserver("/");
    };

    $("#image").css("max-width", w);
    $("#image").css("max-height", h);

    $("#btn-link").on("click", function() {
        dropbox.link().done(showAppView);
        event.preventDefault();
    });

    $("#btn-unlink").on("click", function() {
        dropbox.unlink().done(showWelcomeView);
        event.preventDefault();
    });

    $("#btn-back").on("click", function(event) {
        window.history.back();
        event.preventDefault();
    });

    $("body").on("click", ".file", function(event) {
        var filePath = decodeURIComponent($(event.currentTarget).attr("href").substr(1));
        $("#filePath").html(filePath);
        if( (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filePath) ) {
            dropbox.readData(filePath).done(function(result) {
                var bytes = new Uint8Array(result);
                $('#image').attr('src', "data:image/jpeg;base64," + encode(bytes));
                $("#image").show();
                $("#text").hide();
            });
        } else {
            dropbox.readString(filePath).done(function(result) {
                $("#text").html(result);
                $("#image").hide();
                $("#text").show();
            });
        }
        event.preventDefault();
    });

    $(window).on('hashchange', function() {
        app.path = decodeURIComponent(window.location.hash.substr(1));
        $("#path").html(app.path ? app.path : "/");
        listFolder();
    });

    document.addEventListener("deviceReady", function() {
        dropbox.checkLink().done(showAppView).fail(showWelcomeView);
    });

    return {
        path:       "/",
        listFolder:   listFolder
    }

}());

// Called by observer in DropboxSync plugin when a file is changed
function dropbox_fileChange() {
    app.listFolder();
}