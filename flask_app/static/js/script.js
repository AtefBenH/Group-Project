async function refresh()
    {
        location.reload();
    }

function login()
    {
        loginForm = document.getElementById('loginForm');
        var formData = new FormData(loginForm);

        fetch("/api/users/login", { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.message == "Error") 
                    {
                        error = document.getElementById('logErrorMessage');
                        error.innerText = "Wrong Informations";
                        loginForm.reset();
                    }
                else 
                    {
                        window.location.replace('/home');
                    }
            });
    }

function register()
    {
        regForm = document.getElementById('registrationForm');
        var formData = new FormData(regForm);
        fetch("/api/users/register", { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => 
            {
            error = document.getElementById('regErrorMessage');
            error.innerHTML = ""
            if (data.errors != 'success'){
                for (key in data.errors) {
                    error.innerHTML += data.errors[key] + '<br>';
                    if (data.errors[key] == "First Name must contain at least 2 characters"){
                        field = document.getElementById('first_name');
                        // field.value = "";
                        field.style.backgroundColor = "lightcoral";
                    }
                    if (data.errors[key] == "Last Name must contain at least 2 characters"){
                        field = document.getElementById('last_name');
                        // field.value = "";
                        field.style.backgroundColor = "lightcoral";
                    }
                    if (data.errors[key] == "Email Already Exists" || data.errors[key] == "Email not valid"){
                        field = document.getElementById('email');
                        // field.value = "";
                        field.style.backgroundColor = "lightcoral";
                    }
                    if (data.errors[key] == "This Email is Blacklisted"){
                        field = document.getElementById('email');
                        regForm.reset();
                        break;
                    }
                    if (data.errors[key] == "Password Must Have More Than 8 Characters" || data.errors[key] == "Password Must Contain At Least A Number And An Uppercase Character"){
                        field = document.getElementById('password');
                        field.value = "";
                        field.style.backgroundColor = "lightcoral";
                        field = document.getElementById('confirm_password');
                        field.value = "";
                    }
                    if (data.errors[key] == "Password and Confirmation Doesn't Match"){
                        field = document.getElementById('confirm_password');
                        field.value = "";
                        field.style.backgroundColor = "lightcoral";
                    }
                }
            }
            else {
                window.location.replace('/home');
            }
        });
    }

function validateRide(){
    loginForm = document.getElementById('createRideForm');

    var formData = new FormData(loginForm);

    fetch("/api/rides/", { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => 
            {
                error = document.getElementById('createRideErrorMessage');
                error.innerHTML = ""
                if (data.errors.length !=0){
                    for (key in data.errors) {
                        error.innerHTML += data.errors[key] + '<br>';
                        if (data.errors[key] == "From Location Must Be At Least 2 Characters"){
                            field = document.getElementById('from');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Destination Must Be At Least 2 Characters"){
                            field = document.getElementById('to');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Ride Must Have A Date and Time"){
                            field = document.getElementById('when');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Ride Must Have A Number Of Seats"){
                            field = document.getElementById('seats');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                    }
                }
                else {
                    window.location.replace('/api/my_created_rides');
                }
            })
}

function findRide(){
    loginForm = document.getElementById('findRideForm');

    var formData = new FormData(loginForm);

    fetch('/api/rides/find', { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => 
            {
                console.log(data);
                error = document.getElementById('findRideErrorMessage');
                error.innerHTML = ""
                if (data.errors.length !=0){
                    for (key in data.errors) {
                        error.innerHTML += data.errors[key] + '<br>';
                        if (data.errors[key] == "From Location Must Be At Least 2 Characters"){
                            field = document.getElementById('from');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Destination Must Be At Least 2 Characters"){
                            field = document.getElementById('to');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Ride Must Have A Date and Time"){
                            field = document.getElementById('when');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                        if (data.errors[key] == "Ride Must Have A Number Of Seats"){
                            field = document.getElementById('seats');
                            // field.value = "";
                            field.style.backgroundColor = "lightcoral";
                        }
                    }
                }
                else {
                    searchResultDiv = document.getElementById('searchResult');
                    searchResultDiv.innerText="";
                    var table = document.createElement("table");
                    table.classList.add("table");
                    table.classList.add("table-striped");
                    table.classList.add("table-bordered");
                    table.classList.add("text-center");
                    searchResultDiv.appendChild(table);
                    var thead = document.createElement("thead");
                    thead.classList.add("bg-dark");
                    thead.classList.add("text-light");
                    table.appendChild(thead);
                    var headerRow = document.createElement("tr");
                    thead.appendChild(headerRow);
                    var headerCell1 = document.createElement("th");
                    headerCell1.textContent = "From";
                    headerRow.appendChild(headerCell1);
                    var headerCell2 = document.createElement("th");
                    headerCell2.textContent = "To";
                    headerRow.appendChild(headerCell2);
                    var headerCell3 = document.createElement("th");
                    headerCell3.textContent = "When";
                    headerRow.appendChild(headerCell3);
                    var headerCell4 = document.createElement("th");
                    headerCell4.textContent = "Seats";
                    headerRow.appendChild(headerCell4);
                    var headerCell5 = document.createElement("th");
                    headerCell5.textContent = "Driver";
                    headerRow.appendChild(headerCell5);
                    var headerCell6 = document.createElement("th");
                    headerCell6.textContent = "Action";
                    headerRow.appendChild(headerCell6);
                    var tbody = document.createElement("tbody");
                    table.appendChild(tbody);
                    var rowData = ["From", "To", "When", "Seats", "Driver", "Action"];
                    
                    for (key in data.rides) {
                        var dataRow = document.createElement("tr");
                        for (var i = 0; i < rowData.length; i++) {
                            var cell = document.createElement("td");
                            cell.classList.add('cell-'+key+i)
                            switch (i) {
                                case 0:
                                    cell.textContent = data.rides[key].from_location;
                                    break;
                                case 1:
                                    cell.textContent = data.rides[key].to_location;
                                    break;
                                case 2:
                                    cell.textContent = data.rides[key].when_time;
                                    break;
                                case 3:
                                    cell.textContent = data.rides[key].seats;
                                    break;
                                case 4:
                                    var profileLink = document.createElement('button');
                                    profileLink.setAttribute("data-value1", data.rides[key].user_id);
                                    profileLink.classList.add("btn");
                                    profileLink.classList.add("btn-sm");
                                    profileLink.classList.add("btn-outline-dark");
                                    profileLink.setAttribute("onclick", "viewProfile(this)");
                                    profileLink.innerText = data.rides[key].driver;
                                    cell.appendChild(profileLink);
                                    break;
                                case 5:
                                    found = false;
                                    if (data.created_rides.length>0){
                                        
                                        for (var j = 0; j < data.created_rides.length; j++){
                                            if (data.rides[key].id == data.created_rides[j].id){
                                                cell.textContent = "Drive Safe";
                                                found = true;
                                                break;
                                            }
                                        }
                                    }
                                    if(data.joined_rides.length>0){
                                        for (var j = 0; j < data.joined_rides.length; j++){
                                            if (data.rides[key].id == data.joined_rides[j]){
                                                var reserveButton = document.createElement('button');
                                                reserveButton.setAttribute("data-value1", data.rides[key].id);
                                                reserveButton.setAttribute("data-value2", key);
                                                reserveButton.classList.add("btn");
                                                reserveButton.classList.add("btn-sm");
                                                reserveButton.classList.add("btn-outline-danger");
                                                reserveButton.setAttribute("onclick", "cancelSeat(this)");
                                                reserveButton.innerText = "Cancel";
                                                cell.appendChild(reserveButton);
                                                found = true;
                                                break;
                                            }
                                        }
                                    }
                                    if(found){
                                        break;
                                    }
                                    else {
                                        var reserveButton = document.createElement('button');
                                        reserveButton.setAttribute("data-value1", data.rides[key].id);
                                        reserveButton.setAttribute("data-value2", key);
                                        reserveButton.classList.add("btn");
                                        reserveButton.classList.add("btn-sm");
                                        reserveButton.classList.add("btn-outline-primary");
                                        reserveButton.setAttribute("onclick", "reserveSeat(this)");
                                        reserveButton.innerText = "Save";
                                        cell.appendChild(reserveButton);
                                        break;
                                    }
                                    
                    
                            }
                            
                            dataRow.appendChild(cell);
                        }
                        tbody.appendChild(dataRow);
                    }
                    loginForm.reset();
                }
            })
}

function reserveSeat(element){
    rideId = element.getAttribute("data-value1");
    key = element.getAttribute("data-value2");
    fetch("/join_rides/"+rideId+"/create")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                seats = document.getElementsByClassName('cell-'+key+'3');
                // newSeats = document.createElement("td");
                seats[0].innerText = parseInt(seats[0].innerText) -1;
                reserve = document.getElementsByClassName('cell-'+key+'5');
                // newReserve = document.createElement("p");
                // reserve.replaceWith(newReserve);
                reserve[0].innerHTML = "Enjoy The Ride";
            });
}

function updateRide(element)
    {
        updateForm = document.getElementById('updateBookForm');

        var formData = new FormData(updateForm);

        let book_id = element.value;
        fetch("/books/"+book_id+"/update", { method: 'POST', body: formData })
        .then(response => response.json())
        .then(data => {
            error = document.getElementById('updateBookError');
            error.innerHTML = ""
            if (data.errors.length !=0){
                for (key in data.errors) {
                    error.innerHTML += data.errors[key] + '<br>';
                    if (data.errors[key] == "Book Must Have a Title"){
                        field = document.getElementById('title');
                        field.style.backgroundColor = "lightcoral";
                    }
                    if (data.errors[key] == "Author must contain at least 2 characters"){
                        field = document.getElementById('author');
                        field.style.backgroundColor = "lightcoral";
                    }
                    if (data.errors[key] == "Description must contain at least 5 characters"){
                        field = document.getElementById('description');
                        field.style.backgroundColor = "lightcoral";
                    }
                }
            }
            else {
                window.location.replace('/dashboard');
            }
        })
    }

function createLike(element) {
    let book_id = element.value;
    fetch("/likes/" + book_id + "/create")
        .then(response => response.json())
        .then(data => {
            // let newElement = document.createElement("span");
            // newElement.innerHTML = "This is one of your favorites";
            // newElement.classList.add("fst-italic");
            // element.replaceWith(newElement);
            count = parseInt(document.getElementById('count').innerText);
            document.getElementById('count').innerText = count + 1;
        })
    setTimeout(() => {
        location.reload();
    }, 500);
}

function deleteLike(element)
    {
        let book_id = element.value;
        fetch("/likes/"+book_id+"/delete")
        .then(response => response.json())
        .then(data => {
            if (data.message){
                parent = element.parentNode;
                parent.remove();
                element.remove();
                count = parseInt(document.getElementById('count').innerText);
                document.getElementById('count').innerText = count-1;
            }
        })
    }

function deleteLikeReload(element) {
    let book_id = element.value;
    fetch("/likes/" + book_id + "/delete")
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // parent = element.parentNode;
                // parent.remove();
                // element.remove();
                count = parseInt(document.getElementById('count').innerText);
                document.getElementById('count').innerText = count - 1;
            }
        })
        setTimeout(() => {
            location.reload();
        }, 500);
}

function addComment()
    {
        commentForm = document.getElementById('formComment');
        var formData = new FormData(commentForm);

        fetch("/comments/create", { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status == "Fail") 
                    {
                        errorField = document.getElementById('commentErrorMessage');
                        errorField.innerText = "Comment must contain at least 5 characters";
                        commentField =document.getElementById('area_comment');
                        commentField.style.backgroundColor = "lightcoral";
                    }
                else 
                    {
                        window.location.replace('/books/'+data.status+'/view');
                    }
            });
    }

function editComment(element)
    {
        idComment = element.value;
        content = element.parentNode.parentNode.innerText;
        newInput = document.createElement("input");
        newInput.setAttribute("type", "text");
        newInput.classList.add("form-control");
        newInput.classList.add("form-control-sm");
        newInput.value = content;
        newButton = document.createElement('button');
        newButton.setAttribute("value", idComment);
        newButton.classList.add("btn");
        newButton.classList.add("btn-outline-success");
        newButton.setAttribute("onclick", "changeComment(this)");
        newButton.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-check' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>";
        grandParent = element.parentNode.parentNode;
        grandParent.replaceWith(newInput);
        newInput.classList.add('mb-2');
        newInput.insertAdjacentElement('afterend', newButton);
    }

function changeComment(element) {
    idComment = element.value;
    content = element.previousSibling.value;
    url = "/comments/" + idComment + "/edit/" + content;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur : ' + response.status);
            }
        })
        .then(data => {
            console.log(data.status);
            if (data.status == 'Fail') {
                element.previousSibling.style.backgroundColor = "lightcoral";
                element.previousSibling.value = content;

            }
            else {
                window.location.replace('/books/' + data.status + '/view')
            }

        }).catch(error => {
            element.previousSibling.style.backgroundColor = "lightcoral";
            element.previousSibling.value = content;
        });
}

    