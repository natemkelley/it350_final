firebase.auth().onAuthStateChanged(function (user) {
    //console.log(user);
    if (user) {
        $('div').removeClass('hide');
        $('#firebaseui-auth-container').addClass('hide');
    } else {
        $('#firebaseui-auth-container').removeClass('hide');
    }
});


function nosqlStatus_get() {
    firebase.database().ref('/').once('value').then(function (snapshot) {
        //console.log(snapshot.val());
        $('.btn-nosql').addClass('btn-success').fadeIn();
        $('.btn-nosql').html('Firebase NoSQL <br>Connection Success');
        displayNoSQL(snapshot.val())
    });
}

function displayNoSQL(data) {
    console.log(data);
    data2 = data.complaints;
    $.each(data2, function (i, item) {
        //console.log(item);
        var table = "<tr><td>" + item.datdate + "</td>";
        table += "<td>" + item.username + "</td>";
        table += "<td>" + item.complaint + "</td>";
        table += "<td>" + item.email + "</td></tr>";

        $('#fb-usage').append(table).hide().fadeIn('slow');
    });
    data2 = data.log_users;
    $.each(data2, function (i, item) {
        console.log(item);
        var table = "<tr><td>" + item.creationTime + "</td>";
        table += "<td>" + item.lastSignInTime + "</td>";
        table += "<td>" + item.displayName + "</td>";
        table += "<td>" + item.email + "</td></tr>";

        $('#fb-usage-2').append(table).hide().fadeIn('slow');
    });

}

function setFirebaseUI() {
    var uiConfig = {
        signInSuccessUrl: 'dba.html',
        signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

function MySqlStatus() {
    $.ajax({
        type: "GET",
        url: "mysqlStatus",
        cache: false,
        success: function (result) {
            //console.log(result);
            $('.btn-mysql').addClass('btn-success').fadeIn();
            $('.btn-mysql').html('MySQL <br>Connection Success');
        },
        error: function (jqXHR, execption) {
            $('.btn-mysql').addClass('btn-danger').fadeIn();
            $('.btn-mysql').html('MySQL <br>Connection failed');
        }
    });
}

function elasticsearchStatus() {
    $.ajax({
        type: "GET",
        url: "elasticsearchStatus",
        cache: false,
        success: function (result) {
            //console.log(result);
            $('.btn-elasticsearch').addClass('btn-success').fadeIn();
            $('.btn-elasticsearch').html('Elastic Search <br>Connection Success');
        },
        error: function (jqXHR, execption) {
            //alert(jqXHR.responseText);
            $('.btn-elasticsearch').addClass('btn-danger').fadeIn();
            $('.btn-elasticsearch').html('Elastic Search <br>Connection Failed');
        }
    });
}

function getListOfBackups() {
    $.ajax({
        type: "GET",
        url: "getListOfBackups",
        cache: false,
        success: function (result) {
            displayBackups(result);
        },
        error: function (jqXHR, execption) {
            console.log(jqXHR);
        }
    });
}

function displayBackups(data) {
    //console.log(data);
    $.each(data, function (i, item) {
        var string = i + "<tab> Backup performed on " + item[0].month + "/" + item[0].day + "/" + item[0].year;
        $('#backups-list').append("<li>" + string + "</li>").fadeIn();
    });
}

function getOptimizations() {
    $.ajax({
        type: "GET",
        url: "getOptimizations",
        cache: false,
        success: function (result) {
            displayOpt(result);
        },
        error: function (jqXHR, execption) {
            console.log(jqXHR);
        }
    });
}

function getElSearch() {
    $.ajax({
        type: "GET",
        url: "getListOfElastic",
        cache: false,
        success: function (result) {
            displayElSearch(result);
        },
        error: function (jqXHR, execption) {
            console.log(jqXHR);
        }
    });
}

function displayElSearch(data) {
    console.log(data);

    var table = "<table>";


    $.each(data, function (i, item) {
        if(item == "exists"){
            return
        }
        
        if (item !== "") {
            var newVal = item.toString();
            var item = newVal.replace(/query/g, "<strong style='color:red'>query</strong>")
            console.warn(item);
            table += "<tr>";
            table += "<td>" + item + "</td>";
            table += "</tr>";
        }
    });

    table += "</table>";
    $('#table4el').html(table);
}

function displayOpt(data) {
    var length = Object.keys(data).length;
    //console.log(length);

    var table = "<table>";

    for (i = 0; i < length; i++) {
        //console.log(data[i]);
        //console.log(data[i + 1]);
        table += "<tr>"
        table += "<td style='min-width: 200px; padding-right:5px'>" + data[i] + "</td>";
        table += "<td>" + data[i + 1] + "</td>";
        table += "</tr>"
        i++;
    }
    table += "</table>"
    $('#dbuse-opt').html(table).fadeIn();
}

$(document).ready(function () {
    setFirebaseUI();
    nosqlStatus_get();
    MySqlStatus();
    elasticsearchStatus();
    getListOfBackups();
    getOptimizations();
    getElSearch();
});
