let games_list = [];
let games_console = "pl2";
let games_genre = [];
let games_search = "";
let name_client = "";
let order_num_client = 0;
let tel_num_client = 0;

function show_filter_options(){
    var options = document.getElementById("filter_options");
    var button = document.getElementById("filter_button");
    options.style.display = "flex";
    button.style.backgroundColor = 'rgb(' + 10 + ',' + 131 + ',' + 187 + ')';
    button.style.borderBottomLeftRadius = "0px";
    button.style.borderBottomRightRadius = "0px";
}

function filter_options_leave(){
    var options = document.getElementById("filter_options");
    var button = document.getElementById("filter_button");
    options.style.display = "none";
    button.style.backgroundColor = 'rgb(' + 19 + ',' + 180 + ',' + 255 + ')';
    button.style.borderRadius = "5px";
}

function add_game(id,title,img, genre, console){
    datos_juego = {
        _id: id,
        _title: title,
        _img: img,
        _genre: genre,
        _console: console,
        _show: true,
        _select: false

    };    
    const juego = document.createElement('div');
    juego.className = "game_content";
    juego.id = id
    juego.innerHTML = `   
                <div class="game_select" id = ${id}>
                    <h3>${title}</h3>
                </div>
                <img src=${img} id ="logo_img">`;
    document.getElementById("games_grid").appendChild(juego);
    games_list.push(datos_juego);
}

function update_console(console){
    games_console = console;
}

function update_filter(genre,check){
    if (document.getElementById(check).checked == true){
        games_genre.push(genre);
    }else{
        for (i in games_genre) { 
            if(games_genre[i] === genre ){
                games_genre.splice(i, 1);
            }
        }
    }
}

function update_search(e){
    games_search = document.getElementById("search_input").value;
}

function hidden_all(){
    for(i in games_list){
        games_list[i]._show = false;
    }
}

function show_all(){
    for(i in games_list){
        if(games_list[i]._console == games_console){
            games_list[i]._show = true;
        }
    }
}

function update_games_show(){
    for(i in games_list){
        if(games_list[i]._show){
            document.getElementById(games_list[i]._id).style.display = "flex";
        }else{
            document.getElementById(games_list[i]._id).style.display = "none";
        }
    }
}

function update_games_filter(){
    hidden_all();
    for(i in games_list){
        if(games_list[i]._console == games_console)
        {
            if(games_search != ""){
                if((games_list[i]._title.toLowerCase().startsWith(games_search.toLowerCase()))){
                    if(games_genre.length != 0){
                        for(j in games_genre){
                            if(games_list[i]._genre == games_genre[j]){
                                games_list[i]._show = true;
                            }
                        }
                    }else{
                        games_list[i]._show = true;
                    }
                }
            }else{
                if(games_genre.length != 0){
                    for(j in games_genre){
                        if(games_list[i]._genre == games_genre[j]){
                            games_list[i]._show = true;
                        }
                    }
                }else{
                    games_list[i]._show = true;
                }
            }
        }
    }
    
}

function change_game(id){
    for(i in games_list){
        if(games_list[i]._id == id){
            if(games_list[i]._select){
                games_list[i]._select = false;
                document.getElementById(games_list[i]._id).style.border = "2px solid white";
                document.getElementById(games_list[i]._id).style.backgroundColor = 'rgb(' + 211 + ',' + 228 + ',' + 248 + ')';

                

            }else{
                games_list[i]._select = true;
                document.getElementById(games_list[i]._id).style.border = "4px solid blue";
                document.getElementById(games_list[i]._id).style.backgroundColor = 'rgb(' + 140 + ',' + 190 + ',' + 248 + ')';
            }
        }
    }
}


function add_listener_game(){
    const juegos = document.querySelectorAll('.game_content');
    juegos.forEach(juego => {
        juego.addEventListener('click', function(e){
            if(e.target.parentNode.id == "games_grid"){
                change_game(e.target.id);
            }else{
                change_game(e.target.parentNode.id);
            }
            
        });
    });
    
}

function cargar_tabla_envio(){
    for(i in games_list){
        if(games_list[i]._select){
            const juego = document.createElement('tr');
            juego.innerHTML = `   
                <td>${games_list[i]._title}</td>
                <td>${games_list[i]._console}</td>`;
            document.getElementById("body_table").appendChild(juego);
        }
    }
}

function cargar_formulario(){
    var lista = "";
    lista = lista + "Cliente: " + name_client + "\\";
    lista = lista + "Numero de orden: " + order_num_client + "\\";
    lista = lista + "Telefono: " + tel_num_client + "\\";
    for(i in games_list){
        if(games_list[i]._select){
            lista = lista + "Juego: " + games_list[i]._title + "(" + games_list[i]._console + ")" + "\\";
        }
    }
    document.getElementById("juegos_elegidos").value = lista;
}

function show_carga_inicial(){
    document.getElementById("juegos").style.display = "none";
    document.getElementById("formulario_envio").style.display = "none";
    document.getElementById("datos_iniciales").style.display = "block";
    
}


function show_formulario_envio(){
    const myNode = document.getElementById("body_table");
    myNode.innerHTML = '';
    document.getElementById("juegos").style.display = "none";
    document.getElementById("datos_iniciales").style.display = "none";
    document.getElementById("formulario_envio").style.display = "flex";
    document.getElementById("formulario_envio").style.flexDirection ="column";
    cargar_tabla_envio();
}

function show_juegos(){
    document.getElementById("datos_iniciales").style.display = "none";
    document.getElementById("formulario_envio").style.display = "none";
    document.getElementById("juegos").style.display = "block";
}

function cargar_datos_cliente(){
    name_client = document.getElementById("dato_nombre").value;
    order_num_client = document.getElementById("dato_num_orden").value;
    tel_num_client = document.getElementById("dato_telefono").value;
}

function initial_load(){
    show_carga_inicial();
    add_game("pes2019","Pro Evolution Soccer 2019", "./images/games/pes2019.jpg","dep","pl2");
    add_game("barbie","Barbie", "./images/games/barbie.jpg","ter","pl2");
    add_game("nba","NBA 2K", "./images/games/nba.jpg","dep","pl2");
    add_game("crash","Crash", "./images/games/crash.jpg","ave","pl2");
    add_game("nba_2","Oter NBA 2K", "./images/games/nba.jpg","dep","pl2");
    add_game("nba_3","Otre NBA 2K", "./images/games/nba.jpg","dep","pl3");
    add_game("nba_4","Otra NBA 2K", "./images/games/nba.jpg","dep","pl3");
    add_game("nba_5","Ob NBA 2K", "./images/games/nba.jpg","dep","pl3");
    add_game("nba_6","PES NBA 2K", "./images/games/nba.jpg","dep","pl3");

    add_listener_game();
    update_games_filter();
    update_games_show();

};
